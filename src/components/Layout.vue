<template>
  <com-header :title='state.title'></com-header>
  <router-view/>
  <com-tab-bar :defaultFocus='state.title'></com-tab-bar>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import {
  onBeforeRouteLeave,
  useRoute,
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
    });
    const { meta } = route;
    console.log(meta);
    state.title = meta.title;

    onBeforeRouteLeave(async (to, from) => {
      state.title = to.meta.title;
    });

    return { state };
  },
});
</script>

<style scoped>

</style>
