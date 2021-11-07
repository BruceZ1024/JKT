<template>
  <van-nav-bar :border='false'>
    <template #left>
      <svg-icon icon-class='left-arrow'
                style="width: 24px; height: 25px; margin-right: 9px;" @click='handleGoBack'></svg-icon>
      <span style='font-size: 17px; font-weight: 600;'>{{ title }}</span>
    </template>
    <template #right>
      <svg-icon icon-class='small-gold' style="width: 24px; height: 24px"></svg-icon>
      <span style='margin-right: 26px;margin-left: 8px;'>gold</span>
      <svg-icon icon-class='small-wallet' style="width: 24px; height: 24px"></svg-icon>
      <span style='margin-left: 8px;'>345222</span>
    </template>
  </van-nav-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'comHeader',
  props: { title: String },
  setup() {
    const router = useRouter();

    function handleGoBack () {
      router.go(-1);
    }
    return {handleGoBack};
  },
});
</script>

<style lang="scss" scoped>
.van-nav-bar {
  background-color: #202125;
  height: 50px;
  width: 100%;
  line-height: 50px;
  font-size: 12px;
  font-weight: 400;
}
</style>
