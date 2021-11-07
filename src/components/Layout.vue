<template>
  <com-header :title='state.title'></com-header>
  <router-view/>
  <com-tab-bar :default-path='state.fullPath'></com-tab-bar>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import {
  onBeforeRouteLeave,
  useRoute,
  onBeforeRouteUpdate
} from 'vue-router';
import ComHeader from './ComHeader.vue';
import ComTabBar from '@/components/ComTabBar.vue';

export default defineComponent({
  name: 'layout',
  components: {
    ComHeader,
    ComTabBar,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      title: '',
      fullPath: '',
    });
    const { meta } = route;
    state.title = meta.title;
    state.fullPath = route.fullPath;

    onBeforeRouteLeave(async (to, from) => {
      state.title = to.meta.title;
      state.fullPath = to.fullPath;
    });

    onBeforeRouteUpdate(async (to, from) => {
      state.title = to.meta.title;
      state.fullPath = to.fullPath;
    })

    return { state };
  },
});
</script>

<style scoped>

</style>
