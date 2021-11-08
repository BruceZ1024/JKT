<template>
  <van-popup v-model:show='state.authPopShow' closeable @close='handleClose' position='bottom' round class='farm-pop'
             style='background-color: #202125;'>
    <van-cell title='Authorize' class='van-cell-no-border pop-title'>
    </van-cell>
    <div class='pop-intro'>
      You need to authorize the contracts to access the following assets.
    </div>
    <div class='pop-switch'>
      <van-cell center title='BIT'>
        <template #right-icon>
          <van-switch v-model='state.bitChecked' size='22' active-color='#CD2A16' />
        </template>
      </van-cell>
      <van-cell center title='JKT'>
        <template #right-icon>
          <van-switch v-model='state.jktChecked' size='22' active-color='#CD2A16'/>
        </template>
      </van-cell>
      <van-cell center title=''>
        <template #right-icon>
          <span>GET TOKEN</span>
        </template>
      </van-cell>
    </div>
    <div class='pop-btns'>
      <van-button class='button cancel-btn' type='default' :loading='false' @click='onAuthCancel'>
        Cancel
      </van-button>
      <van-button class='button done-btn' type='danger' :loading='false' @click='onAuthDone'>
        Done
      </van-button>
    </div>
  </van-popup>
</template>

<script lang='ts'>
import { defineComponent, reactive, watchEffect } from 'vue';

export default defineComponent({
  name: 'authorizePopup',
  props: {authShow: Boolean, bitChecked: Boolean, jktChecked: Boolean},
  emits: ['authPopClose', 'authDone'],
  setup(props, context) {
    const state = reactive({
      authPopShow: false,
      bitChecked: false,
      jktChecked: false,
    });

    function handleClose() {
      context.emit('authPopClose');
    }

    function onAuthCancel() {
      context.emit('authPopClose');
    }

    function onAuthDone() {
      context.emit('authDone');
    }

    watchEffect(() => {
      state.authPopShow = props.authShow || false;
      state.bitChecked = props.bitChecked || false;
      state.jktChecked = props.jktChecked || false;
    });

    return {state, handleClose, onAuthCancel, onAuthDone};
  }
});
</script>

<style scoped lang='scss'>
.pop-title {
  font-size: 22px;
  line-height: 2;
  font-weight: 700;
  color: #fff;
  background-color: transparent;
&:after {
   border-bottom: none;
 }
}
.pop-intro {
  font-size: 15px;
  line-height: 21px;
  font-weight: 300;
  padding: 16px;
}
.pop-switch {
  background-color: transparent;
.van-cell {
  background-color: transparent;
  color: $brand-red;
&:after {
   border-bottom: none;
 }
}
}
.pop-btns {
  display: flex;
  justify-content: space-between;
  padding: 16px;
.button {
  width: 48%;
  height: 44px;
  line-height: 44px;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  border-radius: 4px;
}
.cancel-btn {
  background-color: #979797;
  border-color: #979797;
}
}
</style>
