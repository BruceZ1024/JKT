<template>
  <van-popup v-model:show='state.authPopShow' closeable @close='handleClose' position='bottom' round
             class='farm-pop'
             style='background-color: #202125;'>
    <van-cell title='Authorize' class='van-cell-no-border pop-title'>
    </van-cell>
    <div class='pop-intro'>
      You need to authorize the contracts to access the following assets.
    </div>
    <div class='pop-switch'>
      <van-cell center :title='item.farmName' v-for='(item, index) in authList' :key='item.farmName'>
        <template #right-icon>
          <van-switch v-model='authList[index].allowance' :disabled='authList[index].allowance !== "0"'
                      size='22' active-color='#CD2A16' @change='getApprove(index, authList[index].token)'/>
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
import { defineComponent, reactive, ref, watchEffect } from 'vue';
import Web3Provider from '@/utils/Web3Provider';

export default defineComponent({
  name: 'authorizePopup',
  props: { authShow: Boolean, iconData: Array },
  emits: ['authPopClose', 'authDone'],
  setup(props, context) {
    const state = reactive({
      authPopShow: false,
    });

    const authList = ref();
    authList.value = [];

    function handleClose() {
      context.emit('authPopClose');
    }

    function onAuthCancel() {
      context.emit('authPopClose');
    }

    function onAuthDone() {
      context.emit('authDone');
    }

    async function getApprove(index: number, token: string) {
      const res = await Web3Provider.getInstance().getApprove(token);
      if (!res) {
        authList.value[index].allowance = '0';
      }
    }



    watchEffect(() => {
      state.authPopShow = props.authShow || false;
      authList.value = props.iconData || [];
    });

    return { state, authList, handleClose, onAuthCancel, onAuthDone, getApprove};
  },
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
