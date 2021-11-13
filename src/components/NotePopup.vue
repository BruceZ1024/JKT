<template>
  <van-popup v-model:show='state.noteShow' round position='bottom' closeable
             @close='handleClose'>
    <van-cell title='Note' class='van-cell-no-border'>
      <template #icon>
        <svg-icon icon-class='info-fill' style='width:30px; height:30px;'
                  class='right-icon-account'></svg-icon>
      </template>
    </van-cell>
    <van-cell-group>
      <div class='account-label-container'>
        <p class='success-label'>
          Note that the game you’re about to play is managed by a third-party and is reegulated by
          their terms of agreement. So, the sole party responsible to you is the third-party.
        </p>
      </div>
      <div type='flex' class='button-wrapper'>
        <van-button class='back-button' type='primary' @click='handleClose'>
          Back
        </van-button>
        <van-button class='ok-button' type='danger' @click='handleConfirm(url)'> Ok
        </van-button>
      </div>
      <div class='account-safe-area-bottom'></div>
    </van-cell-group>
  </van-popup>
</template>

<script lang='ts'>
import { defineComponent, reactive, watchEffect } from 'vue';

export default defineComponent({
  name: 'notePopup',
  props: {
    noteShow: Boolean,
    url: String,
  },
  emits: ['noteClose'],
  setup(props, context) {
    const state = reactive({
      noteShow: false,
    })

    function handleClose() {
      context.emit('noteClose');
    }

    function handleConfirm(url: string) {
      window.location.href = url;
    }

    watchEffect(() => {
      state.noteShow = props.noteShow || false;
    })
    return {
      state, handleClose, handleConfirm
    }
  }
});
</script>

<style scoped>
.success-label {
  margin-left: 16px;
  margin-right: 16px;
  font-size: 10pt;
  color: #575962;
}
.button-wrapper{
  display: flex;
  justify-content: space-around;
}
.back-button,.ok-button {
  width: 48%;
  border-right: 4px;
}
.back-button {
  background-color: #979797;
  border-color: #979797;
}
</style>
