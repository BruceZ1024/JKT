<template>
  <van-cell-group inset class="van-cell-group-margin">
    <div class="account-label-container">
      <p class="invitation-label">
        Invitation Link</p>
      <div class="success-label van-multi-ellipsis--l2">
        {{invitationLink}}
      </div>
      <van-button type="danger" class="btn-small-account-min-width btn-account-invite-copy" size="small"
                  @click="copyToClipboard($event, invitationLink)">Copy
      </van-button>
    </div>
  </van-cell-group>
  <!-- Active Your Invite pop up -->
  <van-popup class="van-popup-fixed-height" v-model:show="showInvite" round position="bottom" closeable>
    <van-cell title="Active Your Invite" class="van-cell-no-border">
    </van-cell>
    <van-cell-group class="van-popup-fixed-height">
      <div class="account-label-container">
        <p class="success-label van-multi-ellipsis--l2">
          sacdve1244545dxsxagrgr345345skdvnsjrng4tnw
          ifjnefsnfgf
        </p>
      </div>
      <van-cell>
        <van-button type="danger" block>Activate</van-button>
      </van-cell>
      <div class="account-safe-area-bottom"></div>
    </van-cell-group>
  </van-popup>

  <van-cell-group inset class="van-cell-group-margin">
    <div class="account-label-container">
      <p class="invitation-label">
        Activation Address</p>
      <p class="success-label">
        {{userAddress}}</p>
      <van-button type="danger" class="btn-small-account-min-width btn-account-invite-copy" size="small"
                  @click="copyToClipboard($event, userAddress)">Copy
      </van-button>
    </div>

  </van-cell-group>

</template>

<script>
  import '@/assets/css/Account.css';
  import {
    reactive,
    onMounted,
    ref,
  } from 'vue';
  import SvgIcon from '@/components/SvgIcon.vue';
  import {
    useRouter,
  } from 'vue-router';
  import {
    copyToClipboard,
  } from '@/utils/clipboard';
  import Web3Provider from '../../utils/Web3Provider';
  import { INVITE_SERVER_ADDRESS } from '@/const/address/linkAddress';

  export default {
    components: {
      SvgIcon,
    },
    setup() {
      const showInvite = ref(false);
      const invitation = ref('');
      const userAddress = ref();
      userAddress.value = '';
      const invitationLink = ref();
      invitationLink.value = '';

      const router = useRouter();
      const goTo = (r, query) => {
        router.push({
          path: r,
          query: query || {},
        });
      };
      onMounted(async () => {
        userAddress.value = await Web3Provider.getInstance().getAccountAddress();
        console.log(userAddress.value);
        invitationLink.value = INVITE_SERVER_ADDRESS + '?inviter=' + userAddress.value;
      });
      return {
        goTo,
        copyToClipboard,
        invitation,
        showInvite,
        userAddress,
        invitationLink,
      };
    },
  };
</script>

<style scoped>
  .upgrade-label {
    margin-left: 16px;
    margin-right: 16px;
    font-size: 12pt;
    color: #575962;
  }

  .success-label {
    margin-left: 16px;
    margin-right: 16px;
    font-size: 10pt;
    color: #575962;
  }

  .invitation-label {
    color: #FFFFFF;
    font-size: 12pt;
    margin-left: 16px;
    margin-right: 16px;
  }

  .btn-account-invite-copy {
    margin-left: 16px;
    margin-bottom: 40px;
  }

  .account-cell-group-dark {
    background-color: #191A1E;
  }

  .account-cell-group-dark .account-cell-dark {
    background-color: #191A1E;
  }
</style>
