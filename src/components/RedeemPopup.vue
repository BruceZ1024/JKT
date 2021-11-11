<template>
  <van-popup v-model:show='state.redeemShow' closeable @close='handleClose' position='bottom' round
             class='farm-pop'
             style='background-color: #202125;'>
    <van-cell title='Redeem' class='van-cell-no-border pop-title'>
    </van-cell>
    <van-row type='flex' justify='space-between' class='redeem-info'>
      <van-col span='4'>
        <svg-icon :icon-class='`${farmData.farmName}`' class='farm-image'></svg-icon>
      </van-col>
      <van-col span='19' class='farm-info'>
        <van-row type='flex' justify='space-between' class='farm-info-title'>
          <van-col>JKT - {{ farmData.farmName }}</van-col>
          <van-col>APY {{ farmData.farmApy }}</van-col>
        </van-row>
        <van-row type='flex' justify='space-between' class='farm-info-subtitle'>
          <van-col>JKT Staking: {{ farmData.jktStaked }}</van-col>
          <van-col>Rewards in JKT</van-col>
        </van-row>
        <van-row type='flex' justify='space-between' class='farm-info-subtitle'>
          <van-col>{{ farmData.farmName }} Staking: {{ farmData.bitStaked }}</van-col>
        </van-row>
        <van-row type='flex' justify='space-between' class='farm-info-subtitle'>
          <van-col>Total Power: {{ farmData.power }}%</van-col>
        </van-row>
      </van-col>
    </van-row>
    <div class='pop-subtitle'>Redemption Ratio</div>
    <div class='pop-tags'>
      <van-tag v-for='(tag, index) in tagsList' :key='tag.name'
               :class='{"pop-tag": true, "pop-tag-active": tag.active}' type='50' :mark='false'
               :plain='false' @click='handleRatioSelect(index)'>{{ tag.name }}%
      </van-tag>
      <van-tag class='pop-tag-custom' type='50' :mark='false' :plain='false'>
        <input type='digit' v-model='state.ratio' placeholder='Custom' @change='inputChange'>
      </van-tag>
    </div>
    <div class='pop-intro'>
      Direct JKT redemption charges {{ farmData.serviceCharge }}% if you pledged within 7 days, and
      it
      will turn to 1% after 7 days.
    </div>
    <div class='pop-btns'>
      <van-button class='button cancel-btn' type='default' :loading='false' @click='onAuthCancel'>
        Cancel
      </van-button>
      <van-button class='button done-btn' type='danger' :loading='false' @click='onAuthDone'>
        Done
      </van-button>
    </div>
  </van-popup>
  <loading-overlay :show='loading'></loading-overlay>
</template>

<script>
  import { reactive, watchEffect, defineComponent, ref } from 'vue';
  import SvgIcon from '@/components/SvgIcon';
  import { Toast } from 'vant';
  import Web3Provider from '@/utils/Web3Provider';
  import LoadingOverlay from '@/components/LoadingOverlay.vue';

  export default defineComponent({
    name: 'redeemPopup',
    components: { SvgIcon, LoadingOverlay },
    props: { redeemShow: Boolean, farmData: Object, redeemCb: Function },
    emits: ['redeemPopClose'],
    setup(props, context) {
      const loading = ref(false);

      const state = reactive({
        redeemShow: false,
        ratio: '',
      });

      const tagsList = ref();
      tagsList.value = [{
        name: 20, ratio: 20, active: false,
      }, {
        name: 50, ratio: 50, active: false,
      }, {
        name: 100, ratio: 100, active: false,
      }];

      function handleClose() {
        context.emit('redeemPopClose');
      }

      function onAuthCancel() {
        context.emit('redeemPopClose');
      }

      async function onAuthDone() {
        console.log('onAuthDone');
        const ratioItem = tagsList.value.find((item) => item.active === true);
        if (!ratioItem && !state.ratio) {
          Toast.fail('Please choose percentage!');
          return;
        } else if (state.ratio > 100) {
          Toast.fail('Invalid percentage!');
          return;
        }
        const ratio = ratioItem ? ratioItem.ratio : state.ratio;
        if (props.farmData?.lpTokenAddress) {
          loading.value = true;

          const res = await Web3Provider.getInstance().redeem(props.farmData.lpTokenAddress, ratio);
          console.log(res);
          if (res) {
            loading.value = false;
            Toast.success('Redeem success!');
            props.redeemCb();
            context.emit('redeemPopClose');
          } else {
            loading.value = false;
            Toast.fail('Redeem failed!');
          }
        }
      }

      function handleRatioSelect(index) {
        tagsList.value = [{
          name: 20, ratio: 20, active: false,
        }, {
          name: 50, ratio: 50, active: false,
        }, {
          name: 100, ratio: 100, active: false,
        }];
        tagsList.value[index].active = true;
        state.ratio = '';
      }

      function inputChange() {
        tagsList.value = [{
          name: 20, ratio: 20, active: false,
        }, {
          name: 50, ratio: 50, active: false,
        }, {
          name: 100, ratio: 100, active: false,
        }];
        state.ratio = Number(state.ratio) > 100 ? 100 : Number(state.ratio).toFixed(0);
      }

      watchEffect(() => {
        state.redeemShow = props.redeemShow || false;
      });
      return { loading, state, tagsList, handleClose, onAuthCancel, onAuthDone, handleRatioSelect, inputChange };
    },
  })
  ;
</script>

<style scoped lang='scss'>
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

  .farm-info {
    padding: 5px 16px;
  }

  .farm-image {
    width: 60px;
    height: 60px;
    margin-top: 10px;
  }

  .farm-info-title {
    font-size: 16px;
    color: #fff;
    font-weight: 400;
  }

  .farm-info-subtitle {
    font-size: 12px;
    line-height: 2;
    font-weight: 400;
    color: #979797;
  }

  .farm-info-power {
    font-size: 12px;
    line-height: 2;
    font-weight: 600;
  }

  .pop-subtitle {
    padding: 0 16px;
    color: #fff;
    font-size: 17px;
    line-height: 2;
  }

  .pop-tags {
    padding: 0 16px;
    display: flex;
    justify-content: space-between;

    .pop-tag {
      padding: 2px 15px;
      font-size: 13px;
      line-height: 16px;
      font-weight: 300;
      background-color: #0E0F11;
    }

    .pop-tag-active {
      color: #fff;
      background: $brand-red;
    }

    .pop-tag-custom {
      color: #575962;
      width: 50px;
      height: 20px;

      input {
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: none;
        color: #fff;
      }
    }
  }

  .pop-intro {
    font-size: 13px;
    line-height: 21px;
    font-weight: 300;
    padding: 16px;
    color: #979797;
    text-align: right;
  }

  .pop-btns {
    display: flex;
    justify-content: space-between;
    padding: 16px;

    .button {
      width: 48%;
      height: 44px;
      line-height: 44px;
      font-size: 15px;
      font-weight: 700;
      color: #fff;
      border-radius: 4px;
    }

    .cancel-btn {
      background-color: #979797;
      border-color: #979797;
    }
  }
</style>
