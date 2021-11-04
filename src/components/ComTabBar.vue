<template>
  <van-tabbar v-model='active' active-color='#CD2A16' inactive-color='#575962'>
    <van-tabbar-item v-for='item in tabBarList' :key='item.title' :to='item.path'>
      <span>{{ item.title }}</span>
      <template #icon='props'>
        <img :src='props.active ? item.active : item.inactive' />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang='ts'>
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
  props: { defaultFocus: String },
  setup(props) {
    const active = ref(0);

    const tabBarList = ref();
    tabBarList.value = [
      {
        title: 'Home',
        path: '/home',
        active: homeActive,
        inactive: homeInactive,
      },
      {
        title: 'GameFi',
        path: '/gameFi',
        active: gamefiActive,
        inactive: gamefiInactive,
      },
      {
        title: 'DeFi',
        path: '/deFi',
        active: defiIActive,
        inactive: defiInactive,
      },
      {
        title: 'Account',
        path: '/account',
        active: accountActive,
        inactive: accountInactive,
      },
    ];

    if (props.defaultFocus) {
      active.value = tabBarList.value.findIndex((val: any) =>
        val.title === props.defaultFocus,
      );
    }

    return {
      tabBarList,
      active,
    };
  },
});
</script>

<style lang='scss' scoped>
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
