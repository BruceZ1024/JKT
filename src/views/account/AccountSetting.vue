<template>
  <van-cell-group inset class="van-cell-group-margin">
    <language-picker></language-picker>
    <currency-picker></currency-picker>
    <van-cell center title="Version">
      <template #icon>
        <svg-icon icon-class='version' style='width:34px; height:34px;'
                  class="right-icon-account"></svg-icon>
      </template>
      <template #right-icon>
        <van-button
          plain size="small"
          class="btn-small-account-min-width right-icon-account btn-plain-dark-white-dark">
          V1.0831
        </van-button>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script>
import {
  reactive,
  onMounted,
  toRefs, defineComponent,
} from 'vue';
import { useRouter } from 'vue-router';
import SvgIcon from '@/components/SvgIcon.vue';
import LanguagePicker from '@/components/LanguagePicker.vue';
import CurrencyPicker from '@/components/CurrencyPicker.vue';

export default defineComponent({
  components: {
    LanguagePicker,
    CurrencyPicker,
    SvgIcon,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      user: {},
      loading: true,
    });
    onMounted(async () => {
      const {
        data,
      } = {};
      state.user = data;
      state.loading = false;
    });
    const goBack = () => {
      router.go(-1);
    };
    const goTo = (r, query) => {
      router.push({
        path: r,
        query: query || {},
      });
    };
    return {
      ...toRefs(state),
      goBack,
      goTo,
    };
  },
});
</script>

<style lang="less" scoped>

</style>
