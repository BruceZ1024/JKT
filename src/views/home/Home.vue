<template>
  <van-swipe class="home-swipe" :autoplay="5000">
    <van-swipe-item v-for="(image, index) in images" :key="index">
      <van-image :src="image"/>
    </van-swipe-item>
  </van-swipe>

  <div class="show-content">
    <van-row class="home-notice">
      <van-col span="24">
        <svg-icon icon-class='notice' class="notice-icon"></svg-icon>
        <span class="notice-text">Play Mech Master on JKT and earn SQD in LP pool</span>
      </van-col>
    </van-row>

    <van-row class="button-row">
      <van-col span="12">
        <button class="red-button">
          <span class="text-type-1">JKT Issuance</span>
          <br/>
          <span class="text-type-2">3852,44</span>
        </button>
      </van-col>
      <van-col span="12">
        <button class="red-button">
          <span class="text-type-1">JKT Circulate</span>
          <br/>
          <span class="text-type-2">3852,44</span>
        </button>
      </van-col>
    </van-row>

    <van-row class="button-row">
      <van-col span="12">
        <button class="grey-button">
          <van-row>
            <van-col span="12">
              <span class="text-type-1">Contract</span>
            </van-col>
            <van-col span="2">
            </van-col>
            <van-col span="2">
            </van-col>
            <van-col span="2">
            </van-col>
            <van-col span="2">
            </van-col>
            <van-col span="2">
            </van-col>
            <van-col span="2">
              <svg-icon icon-class='small-copy' class="copy-icon"></svg-icon>
            </van-col>
          </van-row>
          <van-row>
            <span class="text-type-3">sjncecvjrvcjndv32rnvvd...</span>
          </van-row>
        </button>
      </van-col>
      <van-col span="12">
        <button class="grey-button">
          <span class="text-type-1">Burn</span>
          <br/>
          <span class="text-type-3">3852,44</span>
        </button>
      </van-col>
    </van-row>

    <van-row class="button-row">
      <van-col span="24">
        <button class="pancake-button" @click="handleClick">
          <span class="text-type-4">Get JKT on Pancake</span>
        </button>
      </van-col>
    </van-row>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import image1 from '@/assets/images/home/1.jpg';
import image2 from '@/assets/images/home/2.jpg';
import image3 from '@/assets/images/home/3.jpg';
import SvgIcon from '@/components/SvgIcon.vue';

export default defineComponent({
  name: 'home',
  components: { SvgIcon },
  setup() {
    const images = [
      image1, image2, image3,
    ];
    return { images };
  },
});
</script>

<style lang="scss" scoped>
.home-swipe .van-swipe-item {
  width: 343px;
  height: 343px;
}

.show-content {
  margin-left: 15px;
  margin-right: 15px;
}

.home-notice {
  background-color: #202125;
  width: 100%;
  height: 40px;
  margin-top: 15px;
}

.notice-icon {
  width: 14px;
  height: 14px;
  margin-left: 15px;
}

.notice-text {
  font-size: 12px;
  font-weight: normal;
  line-height: 16px;
  margin-left: 15px;
}

.button-row {
  margin-top: 15px;
}

.red-button {
  display: block;
  width: 98%;
  height: 64px;
  background-color: #CD2A16;
  border-radius: 10px;
  border: none;
  text-align: left;
}

.grey-button {
  display: block;
  width: 98%;
  height: 64px;
  background-color: #202125;
  border-radius: 10px;
  border: none;
  text-align: left;
}

.pancake-button {
  width: 100%;
  height: 44px;
  background-color: #CD2A16;
  border-radius: 10px;
  border: none;
}

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
  color: #FFFFFF;
  vertical-align: middle;
}

.text-type-3 {
  font-size: 13px;
  font-weight: normal;
  line-height: 16px;
  color: #575962;
  vertical-align: middle;
}

.text-type-4 {
  font-size: 15px;
  font-weight: normal;
  line-height: 16px;
  color: #FFFFFF;
  vertical-align: middle;
}

.copy-icon {
  width: 14px;
  height: 14px;
  vertical-align: middle;
}

</style>
