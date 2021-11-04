<template>
  <van-cell-group inset class="van-cell-group-margin">
    <van-cell center title="$ 34221" label="ID: 342324">
      <template #icon>
        <svg-icon icon-class='big-wallet' style='width:48px; height:48px;' class="right-icon-account"></svg-icon>
      </template>
      <template #right-icon>
        <van-button type="danger" class="btn-small-account-min-width" size="small">Transactions</van-button>
      </template>

    </van-cell>
    <van-cell title="" label="Address: dfasdouewoiruoqiwer798">
    </van-cell>
  </van-cell-group>
  <van-cell-group inset class="van-cell-group-margin">
    <van-cell center title="VIP Status">
      <template #icon>
        <svg-icon icon-class='gold' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
      </template>
      <template #right-icon>
        <van-button type="danger" class="btn-small-account-min-width" size="small">Upgrade</van-button>
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group inset class="van-cell-group-margin">
    <van-cell center title="JKT" label="3825.44">
      <template #icon>
        <svg-icon icon-class='small-jkt' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
      </template>
      <template #right-icon>
        <van-button plain size="small" class="btn-small-account-min-width right-icon-account btn-plain-red-white-dark">
          Withdraw
        </van-button>
        <van-button class="btn-small-account-min-width" type="danger" size="small">Deposit</van-button>
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group inset class="van-cell-group-margin">
    <van-cell center title="Invite Friends">
      <template #icon>
        <svg-icon icon-class='invite-friends' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
      </template>
      <template #right-icon>
        <van-button class="btn-small-account-min-width" type="danger" size="small">Invite</van-button>
      </template>
    </van-cell>
    <van-cell center title="BSC Contract">
      <template #icon>
        <svg-icon icon-class='bsc-contract' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
      </template>
      <template #right-icon>
        <van-button class="btn-small-account-min-width" type="danger" size="small">Copy</van-button>
      </template>
    </van-cell>
    <van-cell title="Contact Us" is-link icon="phone-o">
      <template #icon>
        <svg-icon icon-class='contact-us' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
      </template>
    </van-cell>
    <van-cell title="Settings" is-link icon="setting-o" @click="goTo('/setting')">
      <template #icon>
        <svg-icon icon-class='settings' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
      </template>
    </van-cell>
  </van-cell-group>
</template>
<script>
  import {
    reactive,
    onMounted,
    toRefs,
  } from 'vue';
  import SvgIcon from '@/components/SvgIcon.vue';
  import {
    useRouter,
  } from 'vue-router';

  export default {
    components: {
      SvgIcon,
    },
    setup() {
      const router = useRouter();
      const state = reactive({
        user: {},
        loading: true,
      });
      onMounted(async () => {
        const {
          data,
        } = {};
        state.user = data;
        state.loading = false;
      });
      const goBack = () => {
        router.go(-1);
      };
      const goTo = (r, query) => {
        router.push({
          path: r,
          query: query || {},
        });
      };
      return {
        ...toRefs(state),
        goBack,
        goTo,
      };
    },
  };
</script>

<style lang="less" scoped>


</style>

