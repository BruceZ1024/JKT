<template>
  <van-cell center is-link @click="showPicker = true" value="English">Language
    <template #icon>
      <svg-icon icon-class='language' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
    </template>
    <template #right-icon>
      <span class="right-icon-account">English</span>
      <van-icon name="arrow-down"/>
    </template>
  </van-cell>
  <van-popup v-model:show="showPicker" round position="bottom" closeable>
    <van-cell title="Select Language" class="van-cell-no-border">
    </van-cell>
    <van-radio-group v-model="checked">
      <van-cell-group>
        <van-cell title="English" clickable @click="checked = 'English'">
          <template #right-icon>
            <van-radio checked-color="#ee0a24" name="English"/>
          </template>
        </van-cell>
        <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider>
        <!-- <van-cell title="Chinese" clickable @click="checked = 'Chinese'">
          <template #right-icon>
            <van-radio checked-color="#ee0a24" name="Chinese"/>
          </template>
        </van-cell>
        <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider>
        <van-cell title="Korean" clickable @click="checked = 'Korean'">
          <template #right-icon>
            <van-radio checked-color="#ee0a24" name="Korean"/>
          </template>
        </van-cell>
        <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider>
        <van-cell title="Japanese" clickable @click="checked = 'Japanese'">
          <template #right-icon>
            <van-radio checked-color="#ee0a24" name="Japanese"/>
          </template>
        </van-cell>
        <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider> -->
        <div class="account-safe-area-bottom"></div>
      </van-cell-group>
    </van-radio-group>

  </van-popup>
</template>

<script>
  import {
    defineComponent,
    renderSlot,
  } from 'vue';
  import {
    ref,
  } from 'vue';

  export default {
    name: ' LanguagePicker',
    setup() {
      const showPicker = ref(false);

      const checked = ref('English');
      return {
        checked,
        showPicker,
      };
    },
  };
</script>

<style scoped>
  .van-radio__icon {
    color: black;
  }

  .van-cell-no-border::after {
    border: 0;

  }

</style>
