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
    <template #right-icon>
      <van-button type="danger" class="btn-small-account-min-width" @click="goTo('/account/transaction')" size="small">
        Transactions
      </van-button>
    </template>

  </van-cell>
  <van-cell title="">
    <template #label>
      <div class="van-ellipsis">Address: {{userAddress}}</div>
    </template>
    <template #right-icon>
        <span @click="copyToClipboard($event, userAddress)">
            <svg-icon icon-class='copy' style='width:13px; height:13px;' class="right-icon-account"></svg-icon>
        </span>
    </template>

  </van-cell>
  <!-- <van-cell-group inset class="van-cell-group-margin">

    </van-cell-group> -->
  <van-cell-group inset class="van-cell-group-margin">
    <van-cell center>
      <template #title>
        <!-- <span>VIP Status:&nbsp;{{vipLevel[userInfo.eUserLevel]['level']}}</span> -->
        <span>VIP Status:&nbsp;{{userInfo.eUserLevel ? vipLevel[userInfo.eUserLevel]['level'] : vipLevel['0']['level']}}</span>
      </template>
      <template #icon>
        <svg-icon :icon-class="userInfo.eUserLevel ? vipLevel[userInfo.eUserLevel]['icon'] : vipLevel['0']['icon']"
                  style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
      </template>
      <template #right-icon>
        <van-button type="danger" class="btn-small-account-min-width" @click="goTo('/account/upgrade')" size="small">
          Upgrade
        </van-button>
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group inset class="van-cell-group-margin">
    <van-cell center title="JKT" label="3825.44">
      <template #icon>
        <svg-icon icon-class='small-jkt' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
      </template>
      <template #right-icon>
        <van-button plain size="small" class="btn-small-account-min-width right-icon-account btn-plain-red-white-dark"
                    @click="showWithdraw = true">Withdraw
        </van-button>
        <van-button class="btn-small-account-min-width" type="danger" size="small" @click="showDeposit = true">Deposit
        </van-button>
      </template>
    </van-cell>
    <!-- Deposit pop up -->
    <van-popup v-model:show="showDeposit" round position="bottom" closeable>
      <van-cell title="Deposit" class="van-cell-no-border">
      </van-cell>
      <van-cell-group class="van-popup-fixed-height">
        <van-cell-group inset class="account-cell-group-dark ">
          <van-field class="account-cell-dark" v-model="amountDeposit" type="number" center clearable label=""
                     placeholder="Enter Amount">
            <template #button>
              <van-button size="mini" color="#191A1E">
                <div>
                  <span style="color: red">MAK&nbsp;</span>
                  <span>JKT &nbsp;&nbsp;</span>
                  <van-icon name="arrow-down"/>
                </div>
              </van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div class="account-label-container">
          <p class="success-label">
            Wallet Balance: 3423,34 JKT</p>

        </div>
        <van-cell>
          <van-button type="danger" block>Deposit</van-button>
        </van-cell>
        <div class="account-safe-area-bottom"></div>
      </van-cell-group>
    </van-popup>
    <!-- Withdraw pop up -->
    <van-popup class="van-popup-fixed-height" v-model:show="showWithdraw" round position="bottom" closeable>
      <van-cell title="Withdraw" class="van-cell-no-border">
      </van-cell>
      <van-cell-group class="van-popup-fixed-height">
        <van-cell-group inset class="account-cell-group-dark ">
          <van-field class="account-cell-dark" v-model="amountDeposit" type="number" center clearable label=""
                     placeholder="Enter Amount">
            <template #button>
              <van-button size="mini" color="#191A1E">
                <div>
                  <span style="color: red">MAK&nbsp;</span>
                  <span>JKT &nbsp;&nbsp;</span>
                  <van-icon name="arrow-down"/>
                </div>
              </van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div class="account-label-container">
          <p class="success-label">
            Wallet Balance: 3423,34 JKT</p>
          <p class="success-label">
            Transaction Fees: 8 % (7% will be transferred to the black hole address for destruction)</p>
        </div>
        <van-cell>
          <van-button type="danger" block>Withdraw</van-button>
        </van-cell>
        <div class="account-safe-area-bottom"></div>
      </van-cell-group>
    </van-popup>

  </van-cell-group>
  <van-cell-group inset class="van-cell-group-margin">
    <van-cell center title="Invite Friends">
      <template #icon>
        <svg-icon icon-class='invite-friends' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
      </template>
      <template #right-icon>
        <van-button class="btn-small-account-min-width" type="danger" size="small" @click="goTo('/account/invite')">
          Invite
        </van-button>
      </template>
    </van-cell>
    <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider>
    <van-cell center title="Community">
      <template #icon>
        <svg-icon icon-class='bsc-contract' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
      </template>
      <template #right-icon>
        <van-button class="btn-small-account-min-width" type="danger" size="small"
                    @click="window.open(communityAddress)">Join Us
        </van-button>
      </template>
    </van-cell>
    <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider>
    <van-cell center title="Contact Us" is-link icon="phone-o">
      <template #icon>
        <svg-icon icon-class='contact-us' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
      </template>
    </van-cell>
    <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider>
    <van-cell center title="Settings" is-link icon="setting-o" @click="goTo('/account/setting')">
      <template #icon>
        <svg-icon icon-class='settings' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
      </template>
    </van-cell>
    <van-divider :style="{ borderColor: '#202125', padding: '0 16px' }"></van-divider>
  </van-cell-group>
  <div class="account-safe-area-bottom"></div>
</template>

<script>
  import {
    defineComponent,
    onMounted,
    ref,
  } from 'vue';
  import SvgIcon from '@/components/SvgIcon.vue';
  import { formatCurrency } from '@/utils/baseUtils';
  import {
    useRouter,
  } from 'vue-router';
  import {
    copyToClipboard,
  } from '@/utils/clipboard';
  import Web3Provider from '../../utils/Web3Provider';
  import { COMMUNITE_ADDRESS } from '@/const/address/linkAddress';
  import { vipLevel } from '@/const/vipLevel';
  import BigNumber from 'bignumber.js';

  export default defineComponent({
    components: {
      SvgIcon,
    },
    setup() {
      const router = useRouter();
      const userInfo = ref();
      userInfo.value = {};
      const userAddress = ref();
      userAddress.value = '';

      const JKTBalance = ref();
      JKTBalance.value = 0.00;
      const USDTBalance = ref();
      USDTBalance.value = 0.00;

      const communityAddress = ref(COMMUNITE_ADDRESS);

      const showDeposit = ref(false);
      const showWithdraw = ref(false);
      const showAmount = ref(true);
      const amountDeposit = ref('');
      const goTo = (r, query) => {
        router.push({
          path: r,
          query: query || {},
        });
      };

      const toggleShow = () => {
        showAmount.value = !showAmount.value;
      };

      onMounted(async () => {
        userInfo.value = await Web3Provider.getInstance().getUserInfo();
        userAddress.value = await Web3Provider.getInstance().getAccountAddress();

        const [total, decimal] = await Promise.all([Web3Provider.getInstance().getJKTBalance(), Web3Provider.getInstance().getJKTDecimals()]);
        JKTBalance.value = formatCurrency(new BigNumber(total).div(new BigNumber(10).pow(decimal)));

        const exchangeOfUsdtToJkt = await Web3Provider.getInstance().getExchangeOfUsdtToJkt();
        USDTBalance.value = formatCurrency(new BigNumber(total).div(new BigNumber(exchangeOfUsdtToJkt)));
      });

      return {
        userInfo,
        userAddress,
        goTo,
        showDeposit,
        showWithdraw,
        amountDeposit,
        showAmount,
        toggleShow,
        copyToClipboard,
        window,
        JKTBalance,
        communityAddress,
        vipLevel,
        USDTBalance,
      };
    },
  });
</script>

<style src='../../assets/css/Account.css'></style>
<style scoped>
  .van-popup-fixed-height {
    min-height: 300px;
  }

  .upgrade-label {
    margin-left: 16px;
    margin-right: 16px;
    font-size: 12pt;
    color: #575962;
  }

  .success-label {
    margin-left: 16px;
    margin-right: 16px;
    font-size: 10pt;
    color: #575962;
  }

  .account-cell-group-dark {
    background-color: #191A1E;
  }

  .account-cell-group-dark .account-cell-dark {
    background-color: #191A1E;
  }
</style>
