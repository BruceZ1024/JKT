<template>
    <!-- vue3.0配置 -->
    <router-view v-slot='{ Component, route }'>
      <keep-alive :include='keepLiveRoute' :exclude='exclude'>
        <component :is='Component' :key='route.name' />
      </keep-alive>
    </router-view>
</template>
<script lang='ts'>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  setup() {
    const store = useStore();
    const keepLiveRoute = computed(() => store.state.keepLiveRoute);
    const exclude = computed(() => store.state.exclude);
    return {
      keepLiveRoute,
      exclude: keepLiveRoute.value.length ? '' : exclude,
    };
  },
};
</script>
<style lang='scss'>
html,body,#app{
  width:100%;
  height: 100%;
  font-family: 'Open Sans',sans-serif;
}
</style>
