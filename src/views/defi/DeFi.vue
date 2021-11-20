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
      <br/>
      <span class='text-type-2'>{{ countData.eSelfHash }}</span>
    </button>
    <button class='gray-button'>
      <span class='text-type-1'>Extra Power</span>
      <br/>
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
    <van-list class='farm-list-wrapper'>
      <van-row type='flex' justify='space-between' class='farm-li' v-for='(item, index) in farmlist'
               :key='item.farmSymbol'>
        <van-col span='4'>
          <svg-icon :icon-class='item.farmIcon' class='farm-image'></svg-icon>
        </van-col>
        <van-col span='19' class='farm-info'>
          <van-row type='flex' justify='space-between' class='farm-info-title'>
            <van-col>{{ item.farmSymbol }}</van-col>
            <van-col>APY {{ item.lpTokenInfo?.farmApy ||'------'}}%</van-col>
          </van-row>
          <van-row v-for='(stakeInfo, index) in item.stakeList' :key='stakeInfo.title' type='flex'
                   justify='space-between' class='farm-info-subtitle'>
            <van-col>{{stakeInfo.title}} {{item.lpTokenInfo ? item.lpTokenInfo.stakedInfo[index] : '------'}}</van-col>
            <van-col>{{stakeInfo.description}}</van-col>
          </van-row>
          <van-row type='flex' justify='space-between'>
            <span class='farm-info-power'>GET {{ item.lpTokenInfo?.getPower || '------' }}% POWER</span>
            <van-button class='farm-btn-redeem' plain type='primary' :loading='false'
                        @click='handleRedeem(index)'
                        :disabled='(item.lpTokenInfo?.stakedInfo[item.lpTokenInfo.stakedInfo.length -2]  || `0.00`) === `0.00`'>
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
  <authorize-popup :auth-show='state.authPopShow' :lp-token-list='lpTokenList'
                   @auth-pop-close='handleAuthClose' @auth-done='handleAuthDone'
                   @gotten-approve='handleApprove'
  ></authorize-popup>
  <redeem-popup :redeem-show='state.redeemShow' :farm-data='farmLiData' :redeem-cb='refreshDeFiData'
                @redeem-pop-close='handleRedeemClose'></redeem-popup>
  <stake-popup :stake-pop-show='state.stakePopShow' :lp-token-list='lpTokenList'
               :stake-cb='refreshDeFiData'
               @stake-pop-close='handleStakeClose'></stake-popup>
  <loading-overlay :show='loading'></loading-overlay>
</template>

<script lang='ts'>

  import { defineComponent, onMounted, reactive, ref } from 'vue';
  import AuthorizePopup from '@/components/AuthorizePopup.vue';
  import RedeemPopup from '@/components/RedeemPopup.vue';
  import StakePopup from '@/components/StakePopup.vue';
  import Web3Provider from '../../utils/Web3Provider';
  import SvgIcon from '@/components/SvgIcon.vue';
  import { formatCurrency } from '@/utils/baseUtils';
  import BigNumber from 'bignumber.js';
  import { JKT_DECIMAL } from '@/const/address/tokenAddress';
  import LoadingOverlay from '@/components/LoadingOverlay.vue';
  import farmConfig from '@/const/config.js';
  import { Toast } from 'vant';

  export default defineComponent({
    name: 'deFi',
    components: { SvgIcon, AuthorizePopup, RedeemPopup, StakePopup, LoadingOverlay },
    setup() {
      const loading = ref(false);

      const farmlist = ref();
      farmlist.value = farmConfig.farmList;

      const state = reactive({
        redeemShow: false,
        authPopShow: false,
        stakePopShow: false,
        bitChecked: false,
        jktChecked: false,
      });

      const countData = reactive({
        earningCount: 'Loading...',
        eSelfHash: 'Loading...',
        eTeamHash: 'Loading...',
      });

      const jktInfo = reactive({
        allowance: '',
        contract: '',
      });

      const lpTokenList = ref();
      lpTokenList.value = [];

      const list = ref();
      list.value = [];

      const farmLiData = ref();
      farmLiData.value = {};

      function handleRedeem(index: number) {
        state.redeemShow = true;
        farmLiData.value = farmlist.value[index];
      }

      async function handleStake(index: number) {
        lpTokenList.value = [];
        if (farmlist.value[index].authTypes.length === 2) {
          lpTokenList.value.push(farmlist.value[index], {
            lpTokenInfo: {
              allowance: jktInfo.allowance,
              contract: jktInfo.contract,
            },
          });
        } else {
          lpTokenList.value.push(farmlist.value[index]);
        }

        if (jktInfo.allowance === '0' || farmlist.value[index].lpTokenInfo.allowance === '0') {
          state.authPopShow = true;
        } else {
          state.stakePopShow = true;
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
        const [defiEarning, decimal] = await Promise.all([Web3Provider.getInstance().getDefiEarning(), Web3Provider.getInstance().getJKTDecimals()]);
        countData.earningCount = formatCurrency(new BigNumber(defiEarning).div(new BigNumber(10).pow(decimal)), '', 10);
      }

      async function toClaimed() {
        loading.value = true;
        const claimedStatus = await Web3Provider.getInstance().withdrawFarmReward();
        if (claimedStatus) {
          loading.value = false;
          await getEarningCount();
          Toast.success('Claimed success!');
        } else {
          loading.value = false;
          Toast.fail('Claimed failed!');
        }
      }

      async function getUserInfo() {
        const [res, decimal] = await Promise.all([Web3Provider.getInstance().getUserInfo(), Web3Provider.getInstance().getJKTDecimals()]);
        if (res) {
          countData.eTeamHash = String(new BigNumber(res.eTeamHash).div(new BigNumber(10).pow(decimal)).toFixed(2));
          countData.eSelfHash = String(new BigNumber(res.eSelfHash).div(new BigNumber(10).pow(decimal)).toFixed(2));
        }
      }

      async function getFarmList() {
        for (let i = 0; i < farmlist.value.length; i += 1) {
          const lpTokenAddress = farmlist.value[i].lpToken;
          const contract = await Web3Provider.getInstance().createLpTokenContract(lpTokenAddress);
          const lpInfo = await Web3Provider.getInstance().getStakePoolInfo(lpTokenAddress);
          const allowance = await Web3Provider.getInstance().checkAllowance(contract);
          const farmApy = new BigNumber(lpInfo.apy).div(new BigNumber(10).pow(JKT_DECIMAL)).times(100).toFixed(2);
          const jktStaked = formatCurrency(new BigNumber(lpInfo.jktStaked).div(new BigNumber(10).pow(JKT_DECIMAL)));
          const lpTokenStaked = formatCurrency(new BigNumber(lpInfo.lpTokenStaked).div(new BigNumber(10).pow(farmlist.value[i].decimal)));
          const power = new BigNumber(lpInfo.power).div(new BigNumber(10).pow(JKT_DECIMAL)).toFixed(2);

          const stakeInfoArray: any = [];
          if (farmlist.value[i].authTypes.length === 2) {
            stakeInfoArray.push(lpTokenStaked, jktStaked, power);
          } else {
            stakeInfoArray.push(lpTokenStaked, power);
          }

          farmlist.value[i].lpTokenInfo = {
            allowance,
            lpTokenAddress,
            contract,
            farmName: farmlist.value[i].farmSymbol,
            farmApy: farmApy,
            stakedInfo: stakeInfoArray,
            getPower: lpInfo.getPower,
            serviceCharge: lpInfo.serviceCharge,
          };
        }
      }

      async function getJktAllowance() {
        jktInfo.contract = await Web3Provider.getInstance().getJKTContract();
        jktInfo.allowance = await Web3Provider.getInstance().checkAllowance(jktInfo.contract);
      }

      function handleApprove(index: number) {
        const targetItem = farmlist.value.find((item) => item.lpTokenInfo.contract === lpTokenList.value[index].lpTokenInfo.contract);
        if (!lpTokenList.value[index].farmSymbol) {
          targetItem.lpTokenInfo.allowance = '1';
          jktInfo.allowance = '1';
        } else {
          targetItem.lpTokenInfo.allowance = '1';
        }
      }

      function refreshDeFiData() {
        getEarningCount();
        getUserInfo();
        getFarmList();
      }

      onMounted(() => {
        getEarningCount();
        getUserInfo();
        getFarmList();
        getJktAllowance();
      });

      return {
        loading,
        state,
        farmlist,
        countData,
        list,
        lpTokenList,
        farmLiData,
        handleRedeem,
        handleAuthClose,
        handleStake,
        handleRedeemClose,
        handleStakeClose,
        handleAuthDone,
        toClaimed,
        handleApprove,
        refreshDeFiData,
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
      display: block;
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
      width: 50px;
      height: 50px;
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
