<template>
  <van-popup class="result-popup" v-model:show='state.showSuccess' round position='bottom' closeable
             @close='handleClose'>
    <van-cell :title='title' class='van-cell-no-border'>
      <template #icon>
        <svg-icon :icon-class='iconClass' style='width:30px; height:30px;'
                  class='right-icon-account'></svg-icon>
      </template>
    </van-cell>
    <van-cell-group>
      <div class='account-label-container'>
        <p class='success-label'>
          {{ intro }}
        </p>
      </div>
      <van-cell v-if='buttonVisible'>
        <van-button type='danger' block @click='btnClick'>Go to {{ targetName }}
        </van-button>
      </van-cell>
      <div class='account-safe-area-bottom'></div>
    </van-cell-group>

  </van-popup>
</template>

<script>
import { defineComponent, reactive, watchEffect } from 'vue';
 import {
    useRouter,
  } from 'vue-router';
export default defineComponent({
  name: 'successPopup',
  props: {
    show: Boolean,
    title: String,
    iconClass: String,
    intro: String,
    targetUrl: String,
    targetName: String,
    buttonVisible: Boolean,
    btnCb: Function,
  },
  emits: ['closeSuccessPopup'],
  setup(props, context) {
    const router = useRouter();
    const state = reactive({
      showSuccess: false,
    });

    const goTo = (r, query) => {
        router.push({
          path: r,
          query: query || {},
        });
      };

    function handleClose() {
      context.emit('closeSuccessPopup');
    }

    function btnClick() {
      if(props.btnCb) {
        props.btnCb();
      } else {
        goTo(`/${props.targetUrl}`);
      }
    }

    watchEffect(() => {
      state.showSuccess = props.show || false;
    });
    return { state, handleClose, btnClick };
  },
});
</script>
<style>
.success-label {
  margin-left: 16px;
  margin-right: 16px;
  font-size: 10pt;
  color: #575962;
}
.account-label-container {
    min-height: 120px;
}
.result-popup{
  background-color: #202125 !important;
}
</style>
