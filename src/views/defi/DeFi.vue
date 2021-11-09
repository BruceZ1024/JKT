<template>
  <van-cell-group inset>
    <van-cell class='earning'>
      <template #title>
          <span class='cell-icon'>
          <svg-icon style='width:24px; height: 24px' icon-class='clarity_coin-bag-solid'></svg-icon>
        </span>
        <span class='earning-title'>DeFi Earning</span>
        <span class='earning-subtitle'>{{ countData.earningCount }}</span>
      </template>
      <template #value>
        <span class='earning-claimed' @click='toClaimed'>To be claimed</span>
      </template>
    </van-cell>
  </van-cell-group>
  <van-row class='button-row'>
    <button class='gray-button'>
      <span class='text-type-1'>Personal Power</span>
      <br />
      <span class='text-type-2'>{{ countData.eSelfHash }}</span>
    </button>
    <button class='gray-button'>
      <span class='text-type-1'>Extra Power</span>
      <br />
      <span class='text-type-2'>{{ countData.eTeamHash }}</span>
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
              finished-text='No More'
              @load='onLoad'
    >
      <van-row type='flex' justify='space-between' class='farm-li' v-for='(item, index) in list'
               :key='item.farmName'>
        <van-col span='4'>
          <svg-icon :icon-class='`icon-${item.farmName}`' class='farm-image'></svg-icon>
        </van-col>
        <van-col span='19' class='farm-info'>
          <van-row type='flex' justify='space-between' class='farm-info-title'>
            <van-col>JKT - {{ item.farmName }}</van-col>
            <van-col>{{ item.farmApy }}</van-col>
          </van-row>
          <van-row type='flex' justify='space-between' class='farm-info-subtitle'>
            <van-col>JKT Staked: {{ item.jktStaked }}</van-col>
            <van-col>Rewards in JKT</van-col>
          </van-row>
          <van-row type='flex' justify='space-between' class='farm-info-subtitle'>
            <van-col>{{ item.farmName }} Staked: {{ item.bitStaked }}</van-col>
          </van-row>
          <van-row type='flex' justify='space-between' class='farm-info-subtitle'>
            <van-col>Power: {{ item.power }}%</van-col>
          </van-row>
          <van-row type='flex' justify='space-between'>
            <span class='farm-info-power'>GET 300% POWER</span>
            <van-button class='farm-btn-redeem' plain type='primary' :loading='false'
                        @click='handleRedeem(index)'
                        :disabled='item.jktStaked === `0` || item.bitStaked === `0`'>
              Redeem
            </van-button>
            <van-button class='farm-btn-stake' type='danger' :loading='false'
                        @click='handleStake(index)'>
              Stake
            </van-button>
          </van-row>
        </van-col>
      </van-row>
    </van-list>
  </div>
  <authorize-popup :auth-show='state.authPopShow' :icon-data='iconData'
                   @auth-pop-close='handleAuthClose' @auth-done='handleAuthDone'
                   ></authorize-popup>
  <redeem-popup :redeem-show='state.redeemShow' :farm-data='farmLiData'
                @redeem-pop-close='handleRedeemClose'></redeem-popup>
  <stake-popup :stake-pop-show='state.stakePopShow'
               @stake-pop-close='handleStakeClose'></stake-popup>
</template>

<script lang='ts'>

import { defineComponent, onMounted, reactive, ref } from 'vue';
import AuthorizePopup from '@/components/AuthorizePopup.vue';
import RedeemPopup from '@/components/RedeemPopup.vue';
import StakePopup from '@/components/StakePopup.vue';
import Web3Provider from '../../utils/Web3Provider';
import SvgIcon from '@/components/SvgIcon.vue';

export default defineComponent({
  name: 'deFi',
  components: { SvgIcon, AuthorizePopup, RedeemPopup, StakePopup },
  setup() {
    const state = reactive({
      listLoad: false,
      finished: true,
      redeemShow: false,
      authPopShow: false,
      stakePopShow: false,
      bitChecked: false,
      jktChecked: false,
    });

    const countData = reactive({
      earningCount: 0,
      eSelfHash: 0,
      eTeamHash: 0,
    });

    const jktInfo = reactive({
      allowance: '',
      token: '',
    })

    const iconData = ref();
    iconData.value = [];

    const list = ref();
    list.value = [];

    const farmLiData = ref();
    farmLiData.value = {};

    function onLoad() {
      console.log('onload');
    }

    function handleRedeem(index: number) {
      state.redeemShow = true;
      farmLiData.value = list.value[index];
    }

    async function handleStake(index: number) {
      if(jktInfo.allowance === '0' || list.value[index].allowance === '0') {
        state.authPopShow = true;
        iconData.value = [];
        iconData.value.push(list.value[index], { allowance: jktInfo.allowance,
          token: jktInfo.token,
          farmName: 'JKT'});
      }
    }

    function handleAuthClose() {
      state.authPopShow = false;
    }

    function handleRedeemClose() {
      state.redeemShow = false;
    }

    function handleStakeClose() {
      state.stakePopShow = false;
    }

    function handleAuthDone() {
      state.authPopShow = false;
      state.stakePopShow = true;
    }

    async function getEarningCount() {
      countData.earningCount = await Web3Provider.getInstance().getDefiEarning();
    }

    async function toClaimed() {
      const claimedStatus = await Web3Provider.getInstance().withdrawFarmReward();
      if (claimedStatus) {
        await getEarningCount();
      } else {
        console.log('claimed failed');
      }
    }

    async function getUserInfo() {
      const res = await Web3Provider.getInstance().getUserInfo();
      if (res) {
        countData.eTeamHash = res.eTeamHash;
        countData.eSelfHash = res.eSelfHash;
      }
    }

    async function getFarmList() {
      list.value = [];
      const res = await Web3Provider.getInstance().getFarmList();
      res.map(async (item: any) => {
        const contract = await Web3Provider.getInstance().createLpTokenContract(item);
        const contractName = await Web3Provider.getInstance().getSymbol(contract);
        const contractInfo = await Web3Provider.getInstance().getStakePoolInfo(contract);
        const allowance = await Web3Provider.getInstance().checkAllowance(contract);
        list.value.push({
          allowance,
          token: contract,
          farmName: contractName,
          farmApy: '593.35%',
          jktStaked: contractInfo.jktStaked,
          bitStaked: contractInfo.lpTokenStaked,
          power: contractInfo.power,
          serviceCharge: contractInfo.serviceCharge,
        });
      });
    }

    async function getJktAllowance() {
      jktInfo.token = await Web3Provider.getInstance().getJKTContract();
      jktInfo.allowance = await Web3Provider.getInstance().checkAllowance(jktInfo.token);
    }

    onMounted(() => {
      getEarningCount();
      getUserInfo();
      getFarmList();
      getJktAllowance();
    });

    return {
      state,
      countData,
      list,
      iconData,
      farmLiData,
      onLoad,
      handleRedeem,
      handleAuthClose,
      handleStake,
      handleRedeemClose,
      handleStakeClose,
      handleAuthDone,
      toClaimed,
    };
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
