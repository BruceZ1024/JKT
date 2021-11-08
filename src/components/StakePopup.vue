<template>
  <van-popup v-model:show='state.stakePopShow' closeable @close='handleClose' position='bottom'
             round
             class='farm-pop'
             style='background-color: #202125;'>
    <van-cell title='Stake JKT-BIT' class='van-cell-no-border pop-title'>
    </van-cell>
    <div class='pop-subtitle'>Input</div>
    <div style='padding:5px 16px'>
      <van-field class='pop-input' v-model='state.inputValue' type='number'>
        <template #button>
          <span style='color: red; margin-right: 10px;'>MAX</span>
          <span>BIT</span>
        </template>
      </van-field>
    </div>
    <div class='pop-sub-header'>
      BIT Balance: 34234,32
    </div>
    <div class='pop-subtitle'>
      Staking Ratio
    </div>
    <div class='pop-tags'>
      <van-tag class='pop-tag' type='50' :mark='false' :plain='false'> 20%</van-tag>
      <van-tag class='pop-tag' type='50' :mark='false' :plain='false'> 50%</van-tag>
      <van-tag class='pop-tag' type='50' :mark='false' :plain='false'> 80%</van-tag>
    </div>
    <div class='pop-subtitle'>
      Estimated JKT Required
    </div>
    <div style='padding: 16px'>
      <van-field class='pop-input' v-model='state.inputValue' :disabled='true' type='number'>
      </van-field>
    </div>
    <div class='pop-sub-header'>
      JKT Balance: 34234,32
    </div>
    <div class='pop-apy'>
      <span>APY:</span>
      <span>234234%</span>
    </div>
    <div class='pop-apy'>
      <span>Computing Power:</span>
      <span>100</span>
    </div>
    <div style='padding: 10px 16px'>
      <van-button class='button done-btn' type='danger' :loading='false' @click='onStake'>
        Stake
      </van-button>
    </div>
  </van-popup>

</template>

<script>
import { reactive, watchEffect, defineComponent } from 'vue';

export default defineComponent({
  name: 'stakePopup',
  props: { stakePopShow: Boolean },
  emits: ['stakePopClose'],
  setup(props, context) {
    const state = reactive({
      stakePopShow: false,
      inputValue: '',
    });

    function handleClose() {
      context.emit('stakePopClose');
    }

    function onStake() {
      console.log('onStake');
    }

    watchEffect(() => {
      state.stakePopShow = props.stakePopShow || false;
    });
    return { state, handleClose, onStake };
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

.pop-subtitle {
  padding: 0 16px;
  color: #fff;
  font-size: 17px;
  line-height: 2;
}

.pop-input {
  background-color: #191A1E;
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
