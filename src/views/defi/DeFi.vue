<template>
  <van-cell-group inset>
    <van-cell value='' label='' @click='' class='earning'>
      <template #title>
          <span class='cell-icon'>
          <svg-icon style='width:24px; height: 24px' icon-class='clarity_coin-bag-solid'></svg-icon>
        </span>
        <span class='earning-title'>DeFi Earning</span>
        <span class='earning-subtitle'>3852,44</span>
      </template>
      <template #value>
        <span class='earning-claimed'>To be claimed</span>
      </template>
    </van-cell>
  </van-cell-group>
  <van-row class='button-row'>
    <button class='gray-button'>
      <span class='text-type-1'>Personal Power</span>
      <br />
      <span class='text-type-2'>1222.33</span>
    </button>
    <button class='gray-button'>
      <span class='text-type-1'>Extra Power</span>
      <br />
      <span class='text-type-2'>1222.33</span>
    </button>
  </van-row>
  <van-notice-bar
    class='notice-bar'
    left-icon='volume-o'
    text='Highest APY is shown. Your APY will depend on the asset ratio staked'
  />
  <div class='farm-list'>
    <div class='farm-title'>Farm</div>
    <van-list class='farm-list-wrapper'
              v-model='state.listLoad'
              :finished='state.finished'
              finished-text='没有更多了'
              @load='onLoad'
    >
      <van-row type='flex' justify='space-between' class='farm-li' v-for='(item, index) in list' :key='item.farmName'>
        <van-col span='4'>
          <van-image :src='item.farmPicUrl' class='farm-image'></van-image>
        </van-col>
        <van-col span='19' class='farm-info'>
          <van-row type='flex' justify='space-between' class='farm-info-title'>
            <van-col>{{item.farmName}}</van-col>
            <van-col>{{item.farmApy}}</van-col>
          </van-row>
          <van-row type='flex' justify='space-between' class='farm-info-subtitle'>
            <van-col>JKT Staked: {{item.jktStaked}}</van-col>
            <van-col>Rewards in JKT</van-col>
          </van-row>
          <van-row type='flex' justify='space-between' class='farm-info-subtitle'>
            <van-col>BIT Staked: {{item.bitStaked}}</van-col>
          </van-row>
          <van-row type='flex' justify='space-between' class='farm-info-subtitle'>
            <van-col>Power: 100%</van-col>
          </van-row>
          <van-row type='flex' justify='space-between' >
            <span class='farm-info-power'>GET 300% POWER</span>
            <van-button class='farm-btn-redeem' plain type='primary' :loading='false' @click=''>
              Redeem
            </van-button>
            <van-button class='farm-btn-stake' type='danger' :loading='false' @click=''>
              Stake
            </van-button>
          </van-row>
        </van-col>
      </van-row>
    </van-list>
  </div>
</template>

<script lang='ts'>

import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'deFi',
  setup() {
    const state = reactive({
      listLoad: false,
      finished: true,
    });

    const list = ref([
      {
        farmPicUrl: '',
        farmName: 'JKT-BNB',
        farmApy: '593.35%',
        jktStaked: '100',
        bitStaked: '100',

      }
    ])

    function onLoad() {
      console.log('onload');
    }

    return { state, list, onLoad };
  },
});
</script>
<style scoped lang='scss'>
.earning {
  color: #fff;
  background-color: $brand-red;

  .van-cell__title {
    flex: 1.5;
  }

  .earning-title {
    display: inline-block;
    margin-left: 13px;
    font-size: 16px;
    font-weight: 400;
  }

  .earning-subtitle {
    margin-left: 37px;
    font-size: 13px;
    font-weight: 600;
  }

  .earning-claimed {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    margin-top: 30px;
  }
}

.button-row {
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;

  .gray-button {
    height: 64px;
    background-color: #202125;
    border-radius: 10px;
    border: none;
    text-align: left;
    padding: 5px;
    width: 49%;

    .text-type-1 {
      font-size: 16px;
      font-weight: normal;
      line-height: 16px;
      color: #FFFFFF;
      vertical-align: middle;
    }

    .text-type-2 {
      font-size: 13px;
      font-weight: normal;
      line-height: 16px;
      color: #575962;
      vertical-align: middle;
    }
  }
}

.notice-bar {
  color: #fff;
  background-color: $brand-red;
}

.farm-list {
  padding: 16px;

  .farm-title {
    color: #fff;
    font-size: 17px;
    line-height: 2;
  }
  .farm-info {
    padding: 5px 0;
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
  .farm-btn-redeem {
    font-size: 12px;
    line-height: 2;
    height: 24px;
    border-radius: 4px;
    color: $brand-red;
    border-color: $brand-red;
    background-color: transparent;
  }
  .farm-btn-stake {
    font-size: 12px;
    line-height: 2;
    height: 24px;
    border-radius: 4px;
  }
}

</style>
