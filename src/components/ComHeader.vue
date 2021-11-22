<template>
  <van-nav-bar :border='false' fixed>
    <template #left>
      <svg-icon icon-class='left-arrow'
                style="width: 24px; height: 25px; margin-right: 9px;" @click='handleGoBack'></svg-icon>
      <span style='font-size: 17px; font-weight: 600;'>{{ title }}</span>
    </template>
    <template #right>
      <svg-icon :icon-class="vip_level ? vip_level.icon : vipLevel['0'].icon"
                style="width: 24px; height: 24px"></svg-icon>
      <span style='margin-right: 26px;margin-left: 8px;'>{{vip_level ? vip_level.level : vipLevel['0'].level}}</span>
      <svg-icon icon-class='small-wallet' style="width: 24px; height: 24px"></svg-icon>
      <span style='margin-left: 8px;'>{{adress}}</span>
    </template>
  </van-nav-bar>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import { vipLevel } from '@/const/vipLevel';

  export default defineComponent({
    name: 'comHeader',
    props: {
      title: String,
      'vip_level': Object,
      adress: String,
    },
    setup() {
      const router = useRouter();

      function handleGoBack() {
        router.go(-1);
      }

      return { handleGoBack, vipLevel };
    },
  });
</script>

<style lang="scss" scoped>

  @media screen and (min-width: 426px) {
    .van-nav-bar {
      background-color: #202125;
      height: 50px;
      max-width: 426px !important;
      margin: 0px calc((100% - 426px) / 2);
      line-height: 50px;
      font-size: 12px;
      font-weight: 400;
    }
  }

  @media screen and (max-width: 426px) {
    .van-nav-bar {
      background-color: #202125;
      height: 50px;
      width: 100%
    }
  }
</style>
