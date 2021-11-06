<template>
  <van-cell center is-link @click="showPicker = true">Currency
    <template #icon>
      <svg-icon icon-class='currency' style='width:34px; height:34px;'
                class="right-icon-account"></svg-icon>
    </template>
    <template #right-icon>
      <span class="right-icon-account">USD</span>
      <van-icon name="arrow-down"/>
    </template>
  </van-cell>
  <van-popup :show="showPicker" round position="bottom" closeable>
    <van-cell title="Select Currency" class="van-cell-no-border">
    </van-cell>
    <van-radio-group v-model="checked">
      <van-cell-group>
        <van-cell title="USD" clickable @click="checked = 'USD'">
          <template #right-icon>
            <van-radio checked-color="#ee0a24" name="USD"/>
          </template>
        </van-cell>
        <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider>
        <van-cell title="CNY" clickable @click="checked = 'CNY'">
          <template #right-icon>
            <van-radio checked-color="#ee0a24" name="CNY"/>
          </template>
        </van-cell>
        <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider>
        <van-cell title="KRW" clickable @click="checked = 'KRW'">
          <template #right-icon>
            <van-radio checked-color="#ee0a24" name="KRW"/>
          </template>
        </van-cell>
        <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider>
        <van-cell title="JPY" clickable @click="checked = 'JPY'">
          <template #right-icon>
            <van-radio checked-color="#ee0a24" name="JPY"/>
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>

  </van-popup>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: ' CurrencyPicker',
  setup() {
    const showPicker = ref(false);

    const checked = ref('USD');
    console.log(checked);
    return {
      checked,
      showPicker,
    };
  },
});
</script>

<style scoped>
.van-radio__icon {
  color: black;
}

.van-cell-no-border::after {
  border: 0;

}

</style>
