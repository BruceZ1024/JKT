<template>
  <van-tabbar v-model="active" active-color="#CD2A16" inactive-color="#575962" @change="onChange">
    <van-tabbar-item to="">
      <span>Home</span>
      <template #icon="props">
        <img :src="props.active ? home_icon.active : home_icon.inactive"/>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="">
      <span>GameFi</span>
      <template #icon="props">
        <img :src="props.active ? gamefi_icon.active : gamefi_icon.inactive"/>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="">
      <span>DeFi</span>
      <template #icon="props">
        <img :src="props.active ? defi_icon.active : defi_icon.inactive"/>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="">
      <span>Account</span>
      <template #icon="props">
        <img :src="props.active ? account_icon.active : account_icon.inactive"/>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
  import { Toast } from 'vant';
  import { ref, defineComponent } from 'vue';
  import homeActive from '../assets/images/tabbar/home-active.png';
  import homeInactive from '../assets/images/tabbar/home-inactive.png';
  import gamefiActive from '../assets/images/tabbar/gamefi-active.png';
  import gamefiInactive from '../assets/images/tabbar/gamefi-inactive.png';
  import defiIActive from '../assets/images/tabbar/defi-active.png';
  import defiInactive from '../assets/images/tabbar/defi-inactive.png';
  import accountActive from '../assets/images/tabbar/account-active.png';
  import accountInactive from '../assets/images/tabbar/account-inactive.png';

  export default defineComponent({
      name: 'ComTabBar',
      setup() {
        const active = ref(0);
        const onChange = (index) => Toast(`${index}`);
        const home_icon = {
          active: homeActive,
          inactive: homeInactive,
        };
        const gamefi_icon = {
          active: gamefiActive,
          inactive: gamefiInactive,
        };
        const defi_icon = {
          active: defiIActive,
          inactive: defiInactive,
        };
        const account_icon = {
          active: accountActive,
          inactive: accountInactive,
        };
        return {
          home_icon,
          gamefi_icon,
          defi_icon,
          account_icon,
          active,
          onChange
        };
      },
    },
  );
</script>

<style lang="scss" scoped>
  .van-tabbar {
    height: 80px;
    background-color: #202125;
  }
  .van-tabbar-item--active {
    background-color: #202125;
  }
  .van-tabbar-item__icon img {
    width: 28px;
    height: 28px;
  }
</style>
