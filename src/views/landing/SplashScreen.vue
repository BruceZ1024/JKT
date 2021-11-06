<template>
  <div class="background-wrapper">
    <svg-icon icon-class='black-logo' class="logo-icon"></svg-icon>
    <div class="landing-text">
      The Best of GameFi + DeFi
    </div>
    <div class="land-content">
      JokerManor is a GameFi Aggregator with DeFi features. Here you can earn by playing your
      favorite games in the
      metaverse.
    </div>
    <div class="view-more" @click="checkMetaMask">
        <span>
          View more
        </span>
        <svg-icon icon-class='enter' class="view-icon"></svg-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';
import checkMetaMask from '@/utils/checkMetaMask';

export default defineComponent(
  {
    name: 'splashScreen',
    components: { SvgIcon },
    setup() {
      const urls = ref([]);
      return { urls, checkMetaMask };
    },
  },
);
</script>

<style lang="scss" scoped>
.background-wrapper {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/home/background.png");
  background-size: cover;
  background-position: center center;
}

.logo-icon {
  width: 94px;
  height: 94px;
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
  width: 120px;
  height: 24px;
  font-size: 16px;
  line-height: 16px;
  color: #fff;
  position: absolute;
  right: 30px;
  top: 734px;

  .view-icon {
    width: 24px;
    height: 24px;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
