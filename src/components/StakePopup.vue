<template>
  <van-popup v-model:show='state.stakePopShow' closeable @close='handleClose' position='bottom'
             round
             class='farm-pop'
             style='background-color: #202125;'>
    <van-cell :title='`Stake ${lpTokenList[0].farmSymbol}`'
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
            <span>{{ lpTokenList[0].authTypes[0] }}</span>
          </van-button>
        </template>
      </van-field>
    </div>
    <div class='pop-sub-header'>
      {{ lpTokenList[0].authTypes[0] }} Balance: {{ state.balance }}
    </div>
    <div class='pop-subtitle' v-if='lpTokenList.length === 2'>
      Staking Ratio
    </div>
    <div class='pop-tags' v-if='lpTokenList.length === 2'>
      <van-tag :class='{"pop-tag": true, "pop-tag-active": tag.active}' type='50' :mark='false'
               :plain='false' v-for='(tag, index) in tags' :key='tag.num'
               @click='handleTagSelect(index)'> {{ tag.num }}%
      </van-tag>
    </div>
    <div class='pop-subtitle' v-if='lpTokenList.length === 2'>
      Estimated JKT Required
    </div>
    <div style='padding: 16px' v-if='lpTokenList.length === 2'>
      <van-field class='pop-input' v-model='state.inputBValue' :disabled='true' type='number'>
      </van-field>
    </div>
    <div class='pop-sub-header' v-if='lpTokenList.length === 2'>
      {{lpTokenList[0].authTypes[1] }} Balance: {{ state.jktBalance }}
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
                  :disabled='!state.inputValue || !Number(state.inputValue)' @click='onStake'>
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
  import { defineComponent, reactive, ref, watchEffect } from 'vue';
  import Web3Provider from '../utils/Web3Provider.ts';
  import { formatCurrency } from '@/utils/baseUtils';
  import { Toast } from 'vant';
  import BigNumber from 'bignumber.js';
  import ResultPopup from '../components/ResultPopup.vue';
  import LoadingOverlay from '@/components/LoadingOverlay.vue';
  import { JKT_DECIMAL } from '@/const/address/tokenAddress';


  export default defineComponent({
    name: 'stakePopup',
    props: { stakePopShow: Boolean, lpTokenList: Array, stakeCb: Function },
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
        jktBalanceNum: 0,
        ratio: tags.value[0].num,
        inputBValue: undefined,
        decimal: 0,
        apy: '',
        power: '',
      });

      const resultState = reactive({
        show: false,
        title: 'Congratulation',
        iconClass: 'dropdown-green',
        intro: 'Your tokens have been added to the pool. You will now earn rewards proportional to your share in the pool. To stop staking, click on “Redeem”.',
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
        if (loading.value) {
          return;
        }

        loading.value = true;

        const inputNum = new BigNumber(state.inputValue).times(new BigNumber(10).pow(state.decimal));
        if (props.lpTokenList) {
          let res;
          if (props.lpTokenList.length === 2) {
            // double coins stake
            if (props.lpTokenList[0].farmSymbol === 'JKT-BNB') {
              // JTK-BNB
              res = await Web3Provider.getInstance().stake(props.lpTokenList[0].lpTokenInfo.lpTokenAddress, inputNum, state.ratio, inputNum);
            } else {
              // JTK-XXX
              res = await Web3Provider.getInstance().stake(props.lpTokenList[0].lpTokenInfo.lpTokenAddress, inputNum, state.ratio);
            }
          } else {
            // single coin stake
            res = await Web3Provider.getInstance().stake(props.lpTokenList[0].lpTokenInfo.lpTokenAddress, inputNum, 100);
          }

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
            resultState.intro = 'Your tokens have been added to the pool. You will now earn rewards proportional to your share in the pool. To stop staking, click on “Redeem”.';
            resultState.show = true;
            props.stakeCb();
          }
        }
      }

      async function getBalance() {
        if (props.lpTokenList) {
          const [jktB, lpTokenB] = await Promise.all(
            [
              Web3Provider.getInstance().getJKTBalance(),
              Web3Provider.getInstance().getBalance(props.lpTokenList[0].lpTokenInfo.contract),
            ],
          );

          state.decimal = props.lpTokenList[0].decimal;

          if (props.lpTokenList[0].farmSymbol === 'JKT-BNB') {
            state.balance = await Web3Provider.getInstance().getWalletBalance();
            state.balanceNum = Number(state.balance);
          } else {
            state.balanceNum = new BigNumber(lpTokenB).div(new BigNumber(10).pow(state.decimal));
            state.balance = formatCurrency(state.balanceNum, '', 4);
          }
          state.jktBalanceNum = new BigNumber(jktB).div(new BigNumber(10).pow(JKT_DECIMAL));
          state.jktBalance = formatCurrency(state.jktBalanceNum, '', 4);
        }
      }

      function handleMaxInput() {
        state.inputValue = state.balanceNum;
        // double coins stake need to transfer to JKT
        if (props.lpTokenList[0].authTypes.length === 2) {
          transferLpTokenToJKT();
        }
        getComputingPower();
      }

      async function transferLpTokenToJKT() {
        const inputNum = new BigNumber(state.inputValue || 0).times(new BigNumber(10).pow(state.decimal));
        if (props.lpTokenList) {
          const valueB = await Web3Provider.getInstance().transferLpTokenToJKT(props.lpTokenList[0].lpTokenInfo.lpTokenAddress, inputNum, state.ratio);
          state.inputBValue = (new BigNumber(valueB).div(new BigNumber(10).pow(state.decimal))).toFixed(4);
          if (Number(state.inputBValue) > Number(state.jktBalanceNum)) {
            Toast.fail('You do not have enough JKT balance!');
            state.inputValue = undefined;
            state.inputBValue = undefined;
            state.power = undefined;
          }
        }
      }

      async function getAPY() {
        const lpScale = await Web3Provider.getInstance().getHashRate(props.lpTokenList[0].lpTokenInfo.lpTokenAddress, state.ratio);
        const apy = await Web3Provider.getInstance().getApyForStake(lpScale);
        state.apy = new BigNumber(apy).div(new BigNumber(10).pow(state.decimal)).times(100).toFixed(0);
      }

      async function getComputingPower() {
        const inputNum = new BigNumber(state.inputValue || 0).times(new BigNumber(10).pow(state.decimal));
        if (props.lpTokenList) {
          const powerNum = await Web3Provider.getInstance().getComputingPower(props.lpTokenList[0].lpTokenInfo.lpTokenAddress, inputNum, state.ratio);
          state.power = (new BigNumber(powerNum).div(new BigNumber(10).pow(state.decimal))).toFixed(4);
        }
      }

      function handleInputChange() {
        if (Number(state.inputValue) > Number(state.balanceNum)) {
          Toast.fail('Input amount should less than balance!');
          state.inputValue = undefined;
          state.inputBValue = undefined;
          state.power = undefined;
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
          state.inputBValue = undefined;
          state.power = undefined;
          await getBalance();
          await getAPY();
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

  .van-field__control {
    color: #FFF !important;
  }

</style>
