<template>
  <div class="background-wrapper">
    <van-image :src="state.logoUrl" class="logo-icon"></van-image>
    <div class="landing-text">
      The Best of GameFi + DeFi
    </div>
    <div class="land-content">
      Squid is a GameFi Aggregator with DeFi features. Here you can earn by playing your favorite
      games in the metaverse.
    </div>
    <div class="view-more">
        <span>
          View more
        </span>
      <van-image class="view-icon" :src="state.iconUrl"></van-image>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import logoUrl from '../assets/images/home/logo.png';
import iconUrl from '../assets/images/home/logo.png';

export default defineComponent({
  name: "landing",
  setup() {
    const state = reactive({
      logoUrl,
      iconUrl,
    });
    return {state}
  }
})
</script>

<style lang="scss" scoped>
.background-wrapper {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/home/background.jpg");
  background-size: cover;
  background-position: center center;
}

.logo-icon {
  width: 92px;
  height: 92px;
  top: 415.9px;
  left: 142px;
  position: absolute;
}

.landing-text {
  width: 313px;
  height: 90px;
  top: 528px;
  left: 31px;
  position: absolute;
  font-weight: 700;
  color: #fff;
  font-size: 32px;
  line-height: 45px;
  text-align: center;
}

.land-content {
  width: 302px;
  height: 54px;
  left: 37px;
  top: 638px;
  position: absolute;
  //color: $gray-1;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
}

.view-more {
  width: 100px;
  height: 16px;
  font-size: 16px;
  line-height: 16px;
  color: #fff;
  position: absolute;
  right: 16px;
  top: 734px;
  .view-icon {
    width: 13px;
    height: 13px;
  }
}
</style>
