<template>
  <van-swipe class="home-swipe" :autoplay="5000">
    <van-swipe-item v-for="(image, index) in images" :key="index">
      <van-image :src="image"/>
    </van-swipe-item>
  </van-swipe>

  <div class="show-content">
    <van-row class="home-notice">

      <van-col span="24">
        <van-notice-bar class="notice-bar" text="Play Mech Master on JokerManor and earn JKT in DEFI">
          <template #left-icon>
            <svg-icon icon-class='notice' class="notice-icon"></svg-icon>
          </template>
        </van-notice-bar>

        <!-- <span class="notice-text">Play Mech Master on JokerManor and earn JKT in DEFI</span> -->
      </van-col>
    </van-row>

    <van-row class="button-row">
      <van-col span="12">
        <button class="red-button">
          <span class="text-type-1">JKT Issuance</span>
          <br/>
          <span class="text-type-2">{{totalJKT}}</span>
        </button>
      </van-col>
      <van-col span="12">
        <button class="red-button">
          <span class="text-type-1">JKT Circulate</span>
          <br/>
          <span class="text-type-2">{{totalJKTSupply}}</span>
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
              <svg-icon icon-class='small-copy' class="copy-icon"
                        @click="copyToClipboard($event, jktTokenAddress)"></svg-icon>
            </van-col>
          </van-row>
          <van-row>
            <div class="van-ellipsis text-type-3">{{jktTokenAddress}}</div>
            <!-- <span class=""></span> -->
          </van-row>
        </button>
      </van-col>
      <van-col span="12">
        <button class="grey-button">
          <span class="text-type-1">Burn</span>
          <br/>
          <span class="text-type-3">{{totalBurn}}</span>
        </button>
      </van-col>
    </van-row>

    <van-row class="button-row">
      <van-col span="24">
        <button class="pancake-button"
                @click="window.open('https://pancakeswap.finance/swap?outputCurrency=0xc864019047b864b6ab609a968ae2725dfaee808a')">
          <span class="text-type-4">Get JKT on Pancake</span>
        </button>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    onMounted,
    ref,
  } from 'vue';
  import image1 from '@/assets/images/home/first-swipe.png';
  import SvgIcon from '@/components/SvgIcon.vue';
  import Web3Provider from '../../utils/Web3Provider';
  import {
    formatCurrency,
  } from '@/utils/baseUtils';
  import {
    JKT_TOKEN_ADDRESS,
  } from '@/const/address/tokenAddress';
  import BigNumber from 'bignumber.js';
  import {
    copyToClipboard,
  } from '@/utils/clipboard';

  export default defineComponent({
    name: 'home',
    components: {
      SvgIcon,
    },
    setup() {
      const images = [
        image1, image1, image1,
      ];
      const jktTokenAddress = ref(JKT_TOKEN_ADDRESS);
      const totalJKT = ref(formatCurrency(1000000000));
      const totalBurn = ref();
      const totalJKTSupply = ref();
      totalBurn.value = 'Loading...';
      totalJKTSupply.value = 'Loading...';
      onMounted(async () => {
        const [total, decimal] = await Promise.all([Web3Provider.getInstance().getJKTTotal(), Web3Provider.getInstance().getJKTDecimals()]);
        totalJKTSupply.value = formatCurrency(new BigNumber(total).div(new BigNumber(10).pow(decimal)));
        const hashInfo = await Web3Provider.getInstance().getHashInformation();
        if (hashInfo) {
          totalBurn.value = formatCurrency(new BigNumber(hashInfo.eLpBurn).plus(new BigNumber(hashInfo.eVipBurn)).div(new BigNumber(10).pow(decimal)));
        }

      });
      return {
        images,
        jktTokenAddress,
        totalJKT,
        totalBurn,
        totalJKTSupply,
        window,
        copyToClipboard,
      };
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

  .notice-bar {
    background-color: #202125;
    color: #FFFFFF
  }

  .home-notice {
    background-color: #202125;
    margin-top: 15px;
    padding: 0 0px;
  }

  .notice-icon {
    width: 14px;
    height: 14px;
    margin-right: 10px;
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
