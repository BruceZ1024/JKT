<template>
 <van-cell :label="'$ '+(showAmount ? USDTBalance : '*******')">
    <template #title>
      {{showAmount ? JKTBalance : '********'}}
      <svg-icon :icon-class="showAmount ? 'show' : 'hidden'" @click="toggleShow()" style='width:16px; height:16px;'
                class="right-icon-account"></svg-icon>
    </template>
    <template #icon>
      <svg-icon icon-class='big-wallet' style='width:48px; height:48px;' class="right-icon-account"></svg-icon>
    </template>

  </van-cell>
  <van-cell title="" :label="'Address: '+ userAddress">
    <template #right-icon>
      <i>
        <svg-icon icon-class='copy' style='width:13px; height:13px;' class="right-icon-account"
                  @click="copyToClipboard($event, userAddress)"></svg-icon>
      </i>
    </template>
  </van-cell>
  <van-tabs v-model:active="activeName">
    <van-tab title="Withdraw" name="Withdraw">
      <van-list v-model:loading="withdrawLoading" :finished="withdrawFinished" finished-text="No more"
                @load="withdrawOnLoad">
        <van-cell-group v-for="item in withdrawLogs" :key="item.ID" inset class="van-cell-group-margin">
          <van-cell class="padding-bottom-0" center :title="'+ '+item.amount" :label="item.tx_id">
            <template #icon>
              <svg-icon icon-class='logo-up' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
            </template>
            <template #right-icon>
              <div><span>JKT</span>
                <br/>
                <i>
                  <svg-icon icon-class='small-copy' style='width:13px; height:13px;' class="right-icon-account"
                            @click="copyToClipboard($event, item.account)"></svg-icon>
                </i>
              </div>
            </template>

          </van-cell>
          <p class="transaction-date-label">{{item.UpdatedAt}}</p>
        </van-cell-group>
        <div class="account-safe-area-bottom"></div>
      </van-list>
    </van-tab>
    <van-tab title="Deposit" name="Deposit">
      <van-list v-model:loading="depositLoading" :finished="depositFinished" finished-text="No more"
                @load="depositOnLoad">
        <van-cell-group v-for="item in depositLogs" :key="item.ID" inset class="van-cell-group-margin">
          <van-cell class="padding-bottom-0" center :title="'+ '+item.amount" :label="item.tx_hash">
            <template #icon>
              <svg-icon icon-class='logo-down' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
            </template>
            <template #right-icon>
              <div><span>JKT</span>
                <br/>
                <i>
                  <svg-icon icon-class='small-copy' style='width:13px; height:13px;' class="right-icon-account"
                            @click="copyToClipboard($event, item.account)"></svg-icon>
                </i>
              </div>
            </template>

          </van-cell>
          <p class="transaction-date-label">{{item.UpdatedAt}}</p>
        </van-cell-group>
        <div class="account-safe-area-bottom"></div>
      </van-list>
    </van-tab>
  </van-tabs>
</template>

<script>
  import {
    reactive,
    ref,
    onMounted,
  } from 'vue';
  import SvgIcon from '@/components/SvgIcon.vue';
  import {
    useRouter,
  } from 'vue-router';
  import {
    formatCurrency,
  } from '@/utils/baseUtils';
  import {
    copyToClipboard,
  } from '@/utils/clipboard';
  import request from '@/utils/request';
  import Web3Provider from '../../utils/Web3Provider';
   import BigNumber from 'bignumber.js';
  import {
    JKT_DECIMAL,
  } from '@/const/address/tokenAddress';
  export default {
    components: {
      SvgIcon,
    },
    setup() {
      const router = useRouter();
      const activeName = ref('Withdraw');
      const goTo = (r, query) => {
        router.push({
          path: r,
          query: query || {},
        });
      };

      //Withs list
      const depositLogs = ref([]);
      const withdrawLogs = ref([]);
      const withdrawLoading = ref(false);
      const withdrawFinished = ref(false);
      const depositLoading = ref(false);
      const depositFinished = ref(false);
      const userAddress = ref('');

      const JKTBalance = ref();
      JKTBalance.value = 'Loading...';
      const USDTBalance = ref();
      USDTBalance.value = 'Loading...';
      const JKTBalanceNum = ref(0);
      const showAmount = ref(localStorage.getItem('showAmount') !== null ? JSON.parse(localStorage.getItem('showAmount')) : true);

      onMounted(async () => {
        userAddress.value = await Web3Provider.getInstance().getAccountAddress();
        const total = await Web3Provider.getInstance().getJKTBalance();
        JKTBalanceNum.value = new BigNumber(total).div(new BigNumber(10).pow(JKT_DECIMAL)).toNumber();
        JKTBalance.value = formatCurrency(JKTBalanceNum.value);

        const exchangeOfUsdtToJkt = await Web3Provider.getInstance().getExchangeOfUsdtToJkt();
        USDTBalance.value = formatCurrency(new BigNumber(total).div(new BigNumber(exchangeOfUsdtToJkt)));
      });

      const toggleShow = () => {
        showAmount.value = !showAmount.value;
        localStorage.setItem('showAmount', showAmount.value);
      };

      const depositOnLoad = async () => {
        request.get('/rechargelog', {
          params: {
            userid: userAddress.value,
          },
        }).then((res) => {
          depositLoading.value = false;
          depositLogs.value = res.code === 0 ? res.result : [];
          depositFinished.value = true;
        });
      };
      const withdrawOnLoad = async () => {
        request.get('/withdrawlog', {
          params: {
            userid: userAddress.value,
          },
        }).then((res) => {
          withdrawLoading.value = false;
          withdrawLogs.value = res.code === 0 ? res.result : [];
          withdrawFinished.value = true;
        });
      };
      return {
        goTo,
        userAddress,
        activeName,
        depositLogs,
        withdrawLogs,
        withdrawOnLoad,
        withdrawLoading,
        withdrawFinished,
        depositLoading,
        depositFinished,
        USDTBalance,
        toggleShow,
        showAmount,
        JKTBalance,
        depositOnLoad,
        copyToClipboard,
      };
    },
  };
</script>

<style scoped>
  .transaction-date-label {
    margin-left: 55px;
    font-size: 10pt;
    color: #96979B;
  }

  .padding-bottom-0 {
    padding-bottom: 0px;
  }
</style>
