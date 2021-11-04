<template>
  <com-header :title='state.title'></com-header>
  <router-view/>
  <com-tab-bar></com-tab-bar>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import ComHeader from "./ComHeader.vue";
import ComTabBar from '@/components/ComTabBar';
import {
  onBeforeRouteUpdate,
  RouteLocationNormalized,
  useRoute,
} from 'vue-router';

export default defineComponent({
  name: "layout",
  components: {
    ComHeader,
    ComTabBar,
  },
  setup: function() {
    const route = useRoute();
    const state = reactive({
      title: '',
    });
    const { meta } = route;
    console.log(meta);
    state.title = meta.title;

    onBeforeRouteUpdate(async (to, from) => {
      console.log(to);
      // state.title = to.meta.title;
    })

    return {state};
  },
})
</script>

<style scoped>

</style>
