<template>
  <van-swipe class="my-swipe" :autoplay="5000" lazy-render>
    <van-swipe-item v-for="image in images" :key="image">
      <img :src="image"/>
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'home',
    setup() {
      const images = [
        '1.jpg',
        '2.jpg',
        '3.jpg',
      ];
      return { images };
    },
  });
</script>

<style scoped>

</style>
