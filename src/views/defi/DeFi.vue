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
    <van-list class='farm-list-wrapper'
              v-model='state.listLoad'
              :finished='state.finished'
              finished-text='No More'
              @load='onLoad'
    >
      <van-row type='flex' justify='space-between' class='farm-li' v-for='(item, index) in list'
               :key='item.randomNum'>
        <van-col span='4'>
          <svg-icon :icon-class='item.farmName' class='farm-image'></svg-icon>
        </van-col>
        <van-col span='19' class='farm-info'>
          <van-row type='flex' justify='space-between' class='farm-info-title'>
            <van-col>JKT - {{ item.farmName }}</van-col>
            <van-col>APY {{ item.farmApy }}%</van-col>
          </van-row>
          <van-row type='flex' justify='space-between' class='farm-info-subtitle'>
            <van-col>JKT Staked: {{ item.jktStaked }}</van-col>
            <van-col>Rewards in JKT</van-col>
          </van-row>
          <van-row type='flex' justify='space-between' class='farm-info-subtitle'>
            <van-col>{{ item.farmName }} Staked: {{ item.bitStaked }}</van-col>
          </van-row>
          <van-row type='flex' justify='space-between' class='farm-info-subtitle'>
            <van-col>Power: {{ item.power }}</van-col>
          </van-row>
          <van-row type='flex' justify='space-between'>
            <span class='farm-info-power'>GET {{ item.getPower }}% POWER</span>
            <van-button class='farm-btn-redeem' plain type='primary' :loading='false'
                        @click='handleRedeem(index)'
                        :disabled='item.jktStaked === `0.00` || item.bitStaked === `0.00`'>
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
                   @auth-pop-close='handleAuthClose' @auth-done='handleAuthDone' @gotten-approve='handleApprove'
  ></authorize-popup>
  <redeem-popup :redeem-show='state.redeemShow' :farm-data='farmLiData' :redeem-cb='refreshDiFiData'
                @redeem-pop-close='handleRedeemClose'></redeem-popup>
  <stake-popup :stake-pop-show='state.stakePopShow' :icon-data='iconData' :stake-cb='refreshDiFiData'
               @stake-pop-close='handleStakeClose'></stake-popup>
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
        earningCount: 0.00,
        eSelfHash: 0.00,
        eTeamHash: 0.00,
      });

      const jktInfo = reactive({
        allowance: '',
        token: '',
      });

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
        iconData.value = [];
        iconData.value.push(list.value[index], {
          allowance: jktInfo.allowance,
          token: jktInfo.token,
          farmName: 'JKT',
        });
        if (jktInfo.allowance === '0' || list.value[index].allowance === '0') {
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
        countData.earningCount = formatCurrency(new BigNumber(defiEarning).div(new BigNumber(10).pow(decimal)));
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
        const [res, decimal] = await Promise.all([Web3Provider.getInstance().getUserInfo(), Web3Provider.getInstance().getJKTDecimals()]);
        if (res) {
          countData.eTeamHash = Number(new BigNumber(res.eTeamHash).div(new BigNumber(10).pow(decimal)).toFixed(2));
          countData.eSelfHash = Number(new BigNumber(res.eSelfHash).div(new BigNumber(10).pow(decimal)).toFixed(2));
        }
      }

      async function getFarmList() {
        list.value = [];
        const res = await Web3Provider.getInstance().getFarmList();
        res.map(async (lpTokenAddress: any) => {
          const contract = await Web3Provider.getInstance().createLpTokenContract(lpTokenAddress);
          const [contractName, contractInfo, allowance, jktDecimal, lpTokenDecimal] = await Promise.all([Web3Provider.getInstance().getSymbol(contract), Web3Provider.getInstance().getStakePoolInfo(lpTokenAddress), Web3Provider.getInstance().checkAllowance(contract), Web3Provider.getInstance().getJKTDecimals(), Web3Provider.getInstance().getDecimals(contract)]);
          const randomNum = Math.floor(Math.random() * 1000);
          const farmApy = new BigNumber(contractInfo.apy).div(new BigNumber(10).pow(jktDecimal)).times(100).toFixed(2);
          const jktStaked = formatCurrency(new BigNumber(contractInfo.jktStaked).div(new BigNumber(10).pow(jktDecimal)));
          const bitStaked = formatCurrency(new BigNumber(contractInfo.lpTokenStaked).div(new BigNumber(10).pow(lpTokenDecimal)));
          const power = new BigNumber(contractInfo.power).div(new BigNumber(10).pow(jktDecimal)).toFixed(2);
          list.value.push({
            randomNum,
            allowance,
            lpTokenAddress,
            token: contract,
            farmName: contractName,
            farmApy: farmApy,
            jktStaked: jktStaked,
            bitStaked: bitStaked,
            power: power,
            getPower: contractInfo.getPower,
            serviceCharge: contractInfo.serviceCharge,
          });
        });
      }

      async function getJktAllowance() {
        jktInfo.token = await Web3Provider.getInstance().getJKTContract();
        jktInfo.allowance = await Web3Provider.getInstance().checkAllowance(jktInfo.token);
      }

      function handleApprove(index: number) {
        iconData.value[index].allowance = '1';
      }

      function refreshDiFiData() {
        getEarningCount();
        getUserInfo();
        getFarmList();
        getJktAllowance();
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
        handleApprove,
        refreshDiFiData,
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
