<template>
  <van-popup v-model:show='state.redeemShow' closeable @close='handleClose' position='bottom' round
             class='farm-pop'
             style='background-color: #202125;'>
    <van-cell title='Redeem' class='van-cell-no-border pop-title'>
    </van-cell>
    <van-row type='flex' justify='space-between' class='redeem-info'>
      <van-col span='4'>
        <van-image :src='farmData.farmPicUrl' class='farm-image'></van-image>
      </van-col>
      <van-col span='19' class='farm-info'>
        <van-row type='flex' justify='space-between' class='farm-info-title'>
          <van-col>{{ farmData.farmName }}</van-col>
          <van-col>APY {{ farmData.farmApy }}</van-col>
        </van-row>
        <van-row type='flex' justify='space-between' class='farm-info-subtitle'>
          <van-col>JKT Staking: {{ farmData.jktStaked }}</van-col>
          <van-col>Rewards in JKT</van-col>
        </van-row>
        <van-row type='flex' justify='space-between' class='farm-info-subtitle'>
          <van-col>BIT Staking: {{ farmData.bitStaked }}</van-col>
        </van-row>
        <van-row type='flex' justify='space-between' class='farm-info-subtitle'>
          <van-col>Total Power: 100%</van-col>
        </van-row>
      </van-col>
    </van-row>
    <div class='pop-subtitle'>Redemption Ratio</div>
    <div class='pop-tags'>
      <van-tag class='pop-tag' type='50' :mark='false' :plain='false'> 20%</van-tag>
      <van-tag class='pop-tag' type='50' :mark='false' :plain='false'> 50%</van-tag>
      <van-tag class='pop-tag' type='50' :mark='false' :plain='false'> Max</van-tag>
      <van-tag class='pop-tag pop-tag-custom' type='50' :mark='false' :plain='false'> Custom %</van-tag>
    </div>
    <div class='pop-intro'>
      Direct JKT redemption charges 5% if you pledged within 7 days, and it will trun to 1% after 7 days.
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
</template>

<script>
import { reactive, watchEffect } from 'vue';

const { defineComponent } = require('vue');
export default defineComponent({
  name: 'redeemPopup',
  props: { redeemShow: Boolean, farmData: Object },
  emits: ['redeemPopClose'],
  setup(props, context) {
    const state = reactive({
      redeemShow: false,
    });

    function handleClose() {
      context.emit('redeemPopClose');
    }

    function onAuthCancel() {
      console.log('onAuthCancel');
    }

    function onAuthDone() {
      console.log('onAuthDone');
    }

    watchEffect(() => {
      state.redeemShow = props.redeemShow || false;
    });
    return { state, handleClose, onAuthCancel, onAuthDone };
  },
});
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
  width: 100%;
  height: auto;
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
  .pop-tag{
    padding: 2px 15px;
    font-size: 13px;
    line-height: 16px;
    font-weight: 300;
    background-color: #0E0F11;
  }
  .pop-tag-custom {
    color: #575962;
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
