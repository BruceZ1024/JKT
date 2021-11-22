<template>
  <div class="background-wrapper">
    <svg-icon icon-class='black-logo' class="logo-icon"></svg-icon>
    <div class="landing-text">
      The Best of GameFi + DeFi
    </div>
    <div class="land-content">
      JokerManor is a GameFi Aggregator with DeFi features. Here you can earn by playing your
      favorite games in the
      metaverse.
    </div>
    <div class="view-more" @click="checkParent()">
        <span>
            View more
        </span>
      <svg-icon icon-class='enter' class="view-icon"></svg-icon>
    </div>
    <!-- Active Your Address pop up -->
    <van-popup class="van-popup-fixed-height" v-model:show="showAddress" round position="bottom" closeable>
      <van-cell title="Active Your Address" class="van-cell-no-border">
      </van-cell>
      <van-cell-group class="van-popup-fixed-height">

        <div class="account-label-container">
          <van-cell-group inset class="account-cell-group-dark ">
            <van-field class="account-cell-dark" v-model="invitation" center clearable label=""
                       placeholder="Insert invitation address">
            </van-field>
          </van-cell-group>
        </div>
        <van-cell>
          <van-button type="danger" :loading='loading' block @click="active">Activate</van-button>
        </van-cell>
        <div class="account-safe-area-bottom"></div>
      </van-cell-group>
    </van-popup>
    <loading-overlay :show='loading'></loading-overlay>
  </div>

</template>

<script>
  import '@/assets/css/Account.css';
  import {
    defineComponent,
    ref,
  } from 'vue';
  import SvgIcon from '@/components/SvgIcon.vue';
  import Web3Provider from '@/utils/Web3Provider';
  import {
    useRouter,
  } from 'vue-router';
  import {
    Toast,
  } from 'vant';
  import LoadingOverlay from '@/components/LoadingOverlay.vue';

  export default defineComponent({
    name: 'splashScreen',
    components: {
      SvgIcon,
      LoadingOverlay,
    },
    setup() {
      const router = useRouter();
      const urls = ref([]);
      const showAddress = ref(false);
      const invitation = ref();
      invitation.value = '';
      const loading = ref(false);

      async function checkParent() {
        let isc = await Web3Provider.getInstance().checkIsBSCChain();
        if (isc) {
          const parent = await Web3Provider.getInstance().getParentInfo();
          // 0x0000000000000000000000000000000000000000 is no parent
          if (parent && parent !== '0x0000000000000000000000000000000000000000') {
            router.push({
              path: '/home',
            });
          } else {
            showAddress.value = true;
            let search = router.currentRoute.value.query;
            if (search && search.inviter) {
              invitation.value = search.inviter;
            }
          }
        } else {
          Toast.fail('Please change to BSC chain');
        }

      }

      async function active() {
        if (loading.value) {
          return;
        }

        const parentAccount = invitation.value && invitation.value.length === 42 ? invitation.value : undefined;
        if (parentAccount) {
          loading.value = true;
          const res = await Web3Provider.getInstance().bindParentAccount(parentAccount);
          if (res) {
            showAddress.value = true;
            const parent = await Web3Provider.getInstance().getParentInfo();
            // 0x0000000000000000000000000000000000000000 is no parent
            if (parent && parent !== '0x0000000000000000000000000000000000000000') {
              Toast.success('Account activation success!');
              loading.value = false;
              router.push({
                path: '/home',
              });
            } else {
              Toast.fail('Failed to active your account!');
            }
          } else {
            Toast.fail('Failed to active your account!');
          }
          loading.value = false;
        }
      }

      return {
        urls,
        checkParent,
        showAddress,
        invitation,
        active,
        loading,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .background-wrapper {
    width: 100%;
    height: 100%;
    max-width: 426px;
    background-image: url("../../assets/images/home/background.png");
    background-size: cover;
    background-position: center center;
    position: relative;
    margin: 0 auto;
  }

  .logo-icon {
    width: 94px;
    height: 94px;
    top: calc(100vh - 390px);
    left: 50%;
    margin-left: -47px;
    position: absolute;
  }

  .landing-text {
    width: 313px;
    height: 90px;
    top: calc(100vh - 270px);
    left: 50%;
    margin-left: -162px;
    position: absolute;
    font-weight: 700;
    color: #fff;
    font-size: 32px;
    line-height: 45px;
    text-align: center;
  }

  .land-content {
    width: 302px;
    height: 54px;
    left: 50%;
    margin-left: -151px;
    top: calc(100vh - 160px);
    position: absolute;
    //color: $gray-1;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
  }


  .view-more {
    width: 120px;
    height: 24px;
    font-size: 16px;
    line-height: 16px;
    color: #fff;
    position: absolute;
    right: 30px;
    top: calc(100vh - 50px);

    .view-icon {
      width: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: middle;
    }
  }

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
