<template>
  <van-popup v-model:show='state.stakePopShow' closeable @close='handleClose' position='bottom'
             round
             class='farm-pop'
             style='background-color: #202125;'>
    <van-cell :title='`Stake JKT -${iconData[0].farmName}`'
              class='van-cell-no-border pop-title'>
    </van-cell>
    <div class='pop-subtitle'>Input</div>
    <div style='padding:5px 16px'>
      <van-field class='pop-input' v-model='state.inputValue' type='number'
                 @change='handleInputChange' placeholder='Enter amount'>
        <template #button>
          <van-button plain @click='handleMaxInput'
                      style='background-color: transparent; border: none;'>
            <span style='color: red; margin-right: 10px;'>MAX</span>
            <span>{{ iconData[0].farmName }}</span>
          </van-button>
        </template>
      </van-field>
    </div>
    <div class='pop-sub-header'>
      {{ iconData[0].farmName }} Balance: {{ state.balance }}
    </div>
    <div class='pop-subtitle' v-if='iconData.length === 2'>
      Staking Ratio
    </div>
    <div class='pop-tags' v-if='iconData.length === 2'>
      <van-tag :class='{"pop-tag": true, "pop-tag-active": tag.active}' type='50' :mark='false'
               :plain='false' v-for='(tag, index) in tags' :key='tag.num'
               @click='handleTagSelect(index)'> {{ tag.num }}%
      </van-tag>
    </div>
    <div class='pop-subtitle' v-if='iconData.length === 2'>
      Estimated JKT Required
    </div>
    <div style='padding: 16px' v-if='iconData.length === 2'>
      <van-field class='pop-input' v-model='state.inputBValue' :disabled='true' type='number'>
      </van-field>
    </div>
    <div class='pop-sub-header' v-if='iconData.length === 2'>
      JKT Balance: {{ state.jktBalance }}
    </div>
    <div class='pop-apy'>
      <span>APY:</span>
      <span>{{ state.apy }}%</span>
    </div>
    <div class='pop-apy'>
      <span>Computing Power:</span>
      <span>{{ state.power }}</span>
    </div>
    <div style='padding: 10px 16px'>
      <van-button class='button done-btn' type='danger' :loading='false'
                  :disabled='state.inputValue === "undefined"' @click='onStake'>
        Stake
      </van-button>
    </div>
  </van-popup>
  <result-popup :show='resultState.show'
                :title='resultState.title'
                :iconClass='resultState.iconClass'
                :intro='resultState.intro'
                :targetUrl='resultState.targetUrl'
                :targetName='resultState.targetName'
                :btn-cb='resultState.buttonCb'
                :buttonVisible='resultState.buttonVisible' @closeSuccessPopup='closeResultPopup'></result-popup>
  <loading-overlay :show='loading'></loading-overlay>
</template>

<script>
  import { reactive, watchEffect, defineComponent, ref } from 'vue';
  import Web3Provider from '../utils/Web3Provider.ts';
  import { formatCurrency } from '@/utils/baseUtils';
  import { Toast } from 'vant';
  import BigNumber from 'bignumber.js';
  import ResultPopup from '../components/ResultPopup.vue';
  import LoadingOverlay from '@/components/LoadingOverlay.vue';


  export default defineComponent({
    name: 'stakePopup',
    props: { stakePopShow: Boolean, iconData: Array, stakeCb: Function },
    emits: ['stakePopClose'],
    components: { ResultPopup, LoadingOverlay },
    setup(props, context) {
      const loading = ref(false);

      const tags = ref([
        {
          num: 50,
          active: true,
        },
        {
          num: 70,
          active: false,
        },
        {
          num: 80,
          active: false,
        },
      ]);

      const state = reactive({
        stakePopShow: false,
        inputValue: undefined,
        balance: 'Loading',
        jktBalance: 'Loading',
        balanceNum: 0,
        ratio: tags.value[0].num,
        inputBValue: 0,
        decimal: 0,
        apy: '',
        power: '',
      });

      const resultState = reactive({
        show: false,
        title: 'Congratulation',
        iconClass: 'dropdown-green',
        intro: 'Your tokens have been added to the pool. You will now earn rewards proportional to your share in the pool. To stop staking, click on “Unstake”.',
        targetUrl: 'deFi?',
        targetName: 'Farm',
        buttonCb: () => {
          resultState.show = false;
          props.stakeCb();
          context.emit('stakePopClose');
        },
        buttonVisible: true,
      });

      function handleClose() {
        context.emit('stakePopClose');
      }

      async function onStake() {
        console.log('onStake');
        if (loading.value) {
          return;
        }

        loading.value = true;

        const inputNum = new BigNumber(state.inputValue).times(new BigNumber(10).pow(state.decimal));
        if (props.iconData) {
          let res;
          if (props.iconData.length === 2) {
            if (props.iconData[0].farmName === 'BNB') {
              // JTK-BNB
              res = await Web3Provider.getInstance().stake(props.iconData[0].lpTokenAddress, inputNum, state.ratio, inputNum);
            } else {
              // JTK-XXX
              res = await Web3Provider.getInstance().stake(props.iconData[0].lpTokenAddress, inputNum, state.ratio);
            }
          } else {
            // JKT-JKT
            res = await Web3Provider.getInstance().stake(props.iconData[0].lpTokenAddress, inputNum, 100);
          }
          console.log(res);

          if (!res) {
            loading.value = false;
            resultState.buttonVisible = false;
            resultState.iconClass = 'dropdown';
            resultState.title = 'Error';
            resultState.intro = 'We were unable to add the tokens from your wallet to the pool. Please try again.';
            resultState.show = true;
          } else {
            state.stakePopShow = false;
            loading.value = false;
            resultState.buttonVisible = true;
            resultState.iconClass = 'dropdown-green';
            resultState.title = 'Congratulation';
            resultState.intro = 'Your tokens have been added to the pool. You will now earn rewards proportional to your share in the pool. To stop staking, click on “Unstake”.';
            resultState.show = true;
          }
        }
      }

      async function getBalance() {
        if (props.iconData) {
          const [jktB, jktD, jktU] = await Promise.all(
            [
              Web3Provider.getInstance().getJKTBalance(),
              Web3Provider.getInstance().getJKTDecimals(),
              Web3Provider.getInstance().getBalance(props.iconData[0].contract),
            ],
          );

          if (props.iconData.length === 2 && props.iconData[0].farmName === 'BNB') {
            state.decimal = 18;
            state.balance = await Web3Provider.getInstance().getWalletBalance();
            state.balanceNum = state.balance;
          } else {
            state.decimal = await Web3Provider.getInstance().getDecimals(props.iconData[0].contract);
            state.balanceNum = new BigNumber(jktU).div(new BigNumber(10).pow(state.decimal)).toFixed(2);
            state.balance = formatCurrency(state.balanceNum);
          }
          state.jktBalance = formatCurrency(new BigNumber(jktB).div(new BigNumber(10).pow(jktD)));
        }
      }

      function handleMaxInput() {
        state.inputValue = state.balance;
      }

      async function transferLpTokenToJKT() {
        const inputNum = new BigNumber(state.inputValue).times(new BigNumber(10).pow(state.decimal));
        if (props.iconData) {
          const valueB = await Web3Provider.getInstance().transferLpTokenToJKT(props.iconData[0].lpTokenAddress, inputNum, state.ratio);
          state.inputBValue = (new BigNumber(valueB).div(new BigNumber(10).pow(state.decimal))).toFixed(4);
        }
      }

      async function getAPY() {
        const apy = await Web3Provider.getInstance().getApyForStake(state.ratio);
        state.apy = new BigNumber(apy).div(new BigNumber(10).pow(state.decimal)).times(100).toFixed(0);
      }

      async function getComputingPower() {
        const inputNum = new BigNumber(state.inputValue).times(new BigNumber(10).pow(state.decimal));
        if (props.iconData) {
          const lpScale = await Web3Provider.getInstance().getHashRate(props.iconData[0].lpTokenAddress, state.ratio);
          const powerNum = await Web3Provider.getInstance().getComputingPower(props.iconData[0].lpTokenAddress, inputNum, lpScale);
          state.power = (new BigNumber(powerNum).div(new BigNumber(10).pow(state.decimal))).toFixed(4);
        }
      }

      function handleInputChange() {
        state.inputValue = Number(state.inputValue).toFixed(4);
        if (state.inputValue > state.balanceNum) {
          Toast('Input number should less than balance!');
          state.inputValue = undefined;
        } else {
          transferLpTokenToJKT();
          getComputingPower();
        }
      }

      function handleTagSelect(index) {
        tags.value = [{
          num: 50,
          active: false,
        },
          {
            num: 70,
            active: false,
          },
          {
            num: 80,
            active: false,
          }];
        tags.value[index].active = true;
        state.ratio = tags.value[index].num;
        transferLpTokenToJKT();
        getAPY();
        getComputingPower();
      }

      function closeResultPopup() {
        resultState.show = false;
      }

      watchEffect(async () => {
        state.stakePopShow = props.stakePopShow || false;
        if (state.stakePopShow) {
          state.inputValue = undefined;
          await getBalance();
          getAPY();
          getComputingPower();
        }
      });
      return {
        loading,
        resultState,
        state,
        tags,
        handleClose,
        onStake,
        handleMaxInput,
        handleInputChange,
        handleTagSelect,
        closeResultPopup,
      };
    },
  });
</script>

<style lang='scss'>
  .pop-title {
    font-size: 22px;
    line-height: 2;
    font-weight: 700;
    color: #fff;
    background-color: transparent;

    &:after {
      border-bottom: none;
    }
  }

  .pop-subtitle {
    padding: 0 16px;
    color: #fff;
    font-size: 17px;
    line-height: 2;
  }

  .pop-input {
    background-color: #191A1E;
    color: #fff;
  }

  .pop-sub-header {
    font-size: 13px;
    line-height: 2;
    color: #979797;
    padding: 5px 16px;
  }

  .pop-tags {
    padding: 10px 16px;
    display: flex;
    justify-content: flex-start;

    .pop-tag {
      padding: 2px 15px;
      margin-right: 20px;
      font-size: 13px;
      line-height: 16px;
      font-weight: 300;
      background-color: #0E0F11;
    }

    .pop-tag-active {
      color: #fff;
      background: $brand-red;
    }
  }

  .pop-apy {
    display: flex;
    justify-content: space-between;
    font-size: 17px;
    line-height: 2;
    color: #fff;
    font-weight: 400;
    padding: 0 16px;
  }

  .done-btn {
    background-color: $brand-red;
    width: 100%;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
  }

</style>
