<template>
  <van-cell center
            :title="'VIP Level: ' + (userInfo.eUserLevel ? vipLevel[userInfo.eUserLevel]['level'] : vipLevel['0']['level'])">
    <template #icon>
      <!-- <svg-icon icon-class='big-wallet' style='width:48px; height:48px;'
              class="right-icon-account"></svg-icon> -->
      <svg-icon
        :icon-class="userInfo.eUserLevel ? vipLevel[userInfo.eUserLevel]['icon'] : vipLevel['0']['icon']"
        style='width:34px; height:34px;' class='right-icon-account'></svg-icon>
    </template>
    <!-- <template #right-icon>
      <van-button type="danger" class="btn-small-account-min-width" size="small">Receive
      </van-button>
    </template> -->

  </van-cell>
  <van-cell title='' label=''>
  </van-cell>
  <van-cell-group inset class='van-cell-group-margin'>
    <van-cell center is-link @click='showPicker = true'>Sellect Level
      <template #right-icon>
        <van-icon name='arrow-down'/>
      </template>
    </van-cell>
    <van-popup v-model:show='showPicker' round position='bottom' closeable>
      <van-cell title='Sellect VIP Status' class='van-cell-no-border'>
      </van-cell>
      <van-radio-group v-model='checked'>
        <van-cell-group>
          <van-cell title='Sliver - 15% extra power'
                    label='JKT~ $100) | + 5% from 2nd level invitees)' clickable
                    @click="onVIPLevelClick('1')">
            <template #icon>
              <svg-icon icon-class='sliver' style='width:34px; height:34px;'
                        class='right-icon-account'></svg-icon>
            </template>
            <template #right-icon>
              <van-radio :disabled="userInfo.eUserLevel >= '1'" checked-color='#ee0a24' name='1'/>
            </template>
          </van-cell>
          <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider>
          <van-cell title='Gold - 20% extra power'
                    label='JKT~ $500) | + 10% from 2nd level invitees)' clickable
                    @click="onVIPLevelClick('2')">
            <template #icon>
              <svg-icon icon-class='gold' style='width:34px; height:34px;'
                        class='right-icon-account'></svg-icon>
            </template>
            <template #right-icon>
              <van-radio :disabled="userInfo.eUserLevel >= '2'" checked-color='#ee0a24' name='2'/>
            </template>
          </van-cell>
          <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider>
          <van-cell title='Platinum - 30% extra power'
                    label='JKT~ $500) | + 15% from 2nd level invitees)' clickable
                    @click="onVIPLevelClick('3')">
            <template #icon>
              <svg-icon icon-class='platinum' style='width:34px; height:34px;'
                        class='right-icon-account'></svg-icon>
            </template>
            <template #right-icon>
              <van-radio :disabled="userInfo.eUserLevel >= '3'" checked-color='#ee0a24' name='3'/>
            </template>
          </van-cell>
          <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider>
          <van-cell>
            <van-button type='danger' block @click='onVIPSelect'>Select</van-button>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <div class='account-safe-area-bottom'></div>
    </van-popup>
    <van-cell center title='Price in JKT'>
      <template #right-icon>
        <van-button plain size='small'
                    class='btn-small-account-min-width right-icon-account btn-plain-dark-white-dark'>
          {{ vipPrice }}
          <template #icon>
            <svg-icon icon-class='app-icon' style='width:26px; height:26px;'
                      class='right-icon-account'></svg-icon>
          </template>
        </van-button>
      </template>
    </van-cell>
  </van-cell-group>
  <span class='upgrade-label'> Wallet Balance: {{ JKTBalance }} JKT</span>
  <div class='pay-button'>
    <van-button type='danger' :loading="loading" block @click='onPay'>Pay</van-button>
  </div>
  <result-popup :show='showSuccess' title='Congratulations'
                icon-class='dropdown-green'
                intro='You have successfully upgraded your account. Now you can power up your earnings.'
                target-url='account' target-name='My Account'
                :button-visible='true' @closeSuccessPopup='showSuccess = false'></result-popup>
<loading-overlay :show='loading'></loading-overlay>
</template>

<script>
  import {
    defineComponent,
    ref,
    onMounted,
  } from 'vue';
  import {
    useRouter,
  } from 'vue-router';
  import SvgIcon from '@/components/SvgIcon.vue';
  import Web3Provider from '../../utils/Web3Provider';
  import { formatCurrency } from '@/utils/baseUtils';
  import { vipLevel } from '@/const/vipLevel';
  import ResultPopup from '@/components/ResultPopup.vue';
  import LoadingOverlay from '@/components/LoadingOverlay.vue'
  import { Toast } from 'vant';

  export default defineComponent({
    name: 'accountUpgrade',
    components: {
      SvgIcon, ResultPopup, LoadingOverlay,
    },
    emits: ['postRefreshUserInfo'],
    setup(props, ctx) {
      const showPicker = ref(false);
      const showSuccess = ref(false);
      const loading = ref(false);
      const userInfo = ref();
      userInfo.value = {};
      const checked = ref('0');
      const router = useRouter();
      const JKTBalance = ref();
      JKTBalance.value = 0;
      const vipPrice = ref();
      vipPrice.value = '0.0000';
      const goTo = (r, query) => {
        router.push({
          path: r,
          query: query || {},
        });
      };
      const refreshUserInfo = async () => {
        userInfo.value = await Web3Provider.getInstance().getUserInfo();
        //userInfo.value.eUserLevel = '2';
        //JKTBalance.value = formatCurrency(await Web3Provider.getInstance().getJKTBalance(), '');
        const [a1, b1] = await Promise.all([Web3Provider.getInstance().getJKTBalance(), Web3Provider.getInstance().getJKTDecimals()]);
        JKTBalance.value = formatCurrency(a1 / Math.pow(10, b1));
      };

      onMounted(() => {
        refreshUserInfo();
      });

      const onVIPLevelClick = async (level) => {
        if (level > userInfo.value.eUserLevel) {
          checked.value = level;
        }

      };

      const onVIPSelect = async () => {
        if (checked.value > '0' && checked.value > userInfo.value.eUserLevel) {
          let selectedVipLevel = parseInt(checked.value);
          const [a, b] = await Promise.all([Web3Provider.getInstance().calculateVipPrice(selectedVipLevel), Web3Provider.getInstance().getJKTDecimals()]);
          vipPrice.value = formatCurrency(a / Math.pow(10, b));
        } else {
          vipPrice.value = '0.00';
        }
        showPicker.value = false;

      };

      const onPay = async () => {
        if(loading.value){return};
        let selectedVipLevel = parseInt(checked.value);
        if (selectedVipLevel > 0 && checked.value > userInfo.value.eUserLevel && selectedVipLevel <= 3) {
          loading.value = true;
          const result = await Web3Provider.getInstance().upgradeVip(selectedVipLevel);
          if (result) {
            vipPrice.value = '0.00';
            showSuccess.value = true;
          } else {
            Toast.fail('Update VIP failed, please try again');
          }
          refreshUserInfo();
          loading.value = false;
          ctx.emit('postRefreshUserInfo');
        } else {
          Toast.fail('Please select a valid VIP Level');
        }

      };

      return {
        goTo,
        checked,
        showPicker,
        showSuccess,
        userInfo,
        vipPrice,
        vipLevel,
        JKTBalance,
        onVIPSelect,
        onPay,
        onVIPLevelClick,
        loading,

      };
    },
  });
</script>

<style scoped>
  .upgrade-label {
    margin-left: 16px;
    margin-right: 16px;
    font-size: 12pt;
    color: #575962;
  }

  .pay-button {
    margin-left: 16px;
    margin-right: 16px;
  }
</style>
