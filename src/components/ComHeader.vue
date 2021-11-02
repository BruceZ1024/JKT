<template>
  <van-row class="header-row">
    <van-col span="12">
      <van-row class="title-row">
        <van-col span="12">
          <a href="#" class="title">
            <svg-icon icon-class='left-arrow' style="width: 24px; height: 25px"></svg-icon>
            Home</a>
        </van-col>
      </van-row>
    </van-col>
    <van-col span="12">
      <van-row class="title-row">
        <van-col span="6">
          <div class="title-text">
            <svg-icon icon-class='small-gold' style="width: 24px; height: 24px"></svg-icon>
            gold
          </div>
        </van-col>
        <van-col span="6">
          <div class="title-text">
            <svg-icon icon-class='small-wallet' style="width: 24px; height: 24px"></svg-icon>
            345222
          </div>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>

<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'comHeader',
    setup() {
      return {};
    },
  });
</script>

<style lang="scss" scoped>
  .header-row {
    width: 375px;
    height: 104px;
    background-color: #202125;
  }

  .title-row {
    margin-top: 44px;
  }

  .title {
    font-size: 17px;
    font-weight: bolder;
    line-height: 16px;
    color: #FFFFFF;
  }

  .title-text {
    font-size: 12px;
    font-weight: normal;
    line-height: 16px;
    color: #FFFFFF;
  }
</style>
