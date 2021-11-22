<template>
<van-cell :label="'$ '+(showAmount ? USDTBalance : '*******')">
    <template #title>
        {{showAmount ? JKTBalance : '********'}}
        <svg-icon :icon-class="showAmount ? 'show' : 'hidden'" @click="toggleShow()" style='width:16px; height:16px;' class="right-icon-account"></svg-icon>
    </template>
    <template #icon>
        <svg-icon icon-class='big-wallet' style='width:48px; height:48px;' class="right-icon-account"></svg-icon>
    </template>
    <template #right-icon>
        <van-button type="danger" class="btn-small-account-min-width" @click="goTo('/account/transaction')" size="small">
            Transactions
        </van-button>
    </template>

</van-cell>
<van-cell title="">
    <template #label>
        <div class="van-ellipsis">Address: {{userAddress}}</div>
    </template>
    <template #right-icon>
        <span @click="copyToClipboard($event, userAddress)">
            <svg-icon icon-class='copy' style='width:13px; height:13px;' class="right-icon-account"></svg-icon>
        </span>
    </template>

</van-cell>
<!-- <van-cell-group inset class="van-cell-group-margin">

    </van-cell-group> -->
<van-cell-group inset class="van-cell-group-margin">
    <van-cell center>
        <template #title>
            <!-- <span>VIP Status:&nbsp;{{vipLevel[userInfo.eUserLevel]['level']}}</span> -->
            <span>VIP Status:&nbsp;{{userInfo.eUserLevel ? vipLevel[userInfo.eUserLevel]['level'] : vipLevel['0']['level']}}</span>
        </template>
        <template #icon>
            <svg-icon :icon-class="userInfo.eUserLevel ? vipLevel[userInfo.eUserLevel]['icon'] : vipLevel['0']['icon']" style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
        </template>
        <template #right-icon>
            <van-button type="danger" class="btn-small-account-min-width" @click="goTo('/account/upgrade')" size="small">
                Upgrade
            </van-button>
        </template>
    </van-cell>
</van-cell-group>
<van-cell-group inset class="van-cell-group-margin">
    <van-cell center title="JKT" :label="showAmount ? balance : '*******'">
        <template #icon>
            <svg-icon icon-class='small-jkt' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
        </template>
        <template #right-icon>
            <van-button plain size="small" class="btn-small-account-min-width right-icon-account btn-plain-red-white-dark" @click="showWithdraw = true">Withdraw
            </van-button>
            <van-button class="btn-small-account-min-width" type="danger" size="small" @click="showDeposit = true">Deposit
            </van-button>
        </template>
    </van-cell>
    <!-- Deposit pop up -->
    <van-popup v-model:show="showDeposit" round position="bottom" closeable>
        <van-cell title="Deposit" class="van-cell-no-border">
        </van-cell>
        <van-cell-group class="van-popup-fixed-height">
            <van-cell-group inset class="account-cell-group-dark ">
                <van-field class="account-cell-dark" v-model="amountDeposit" type="number" center clearable label="" placeholder="Enter Amount">
                    <template #button>
                        <van-button size="mini" color="#191A1E" @click="amountDeposit = JKTBalanceNum">
                            <div style="display: block">
                                <span style="color: red">MAX&nbsp;</span>
                                <span>JKT &nbsp;&nbsp;</span>
                                <van-icon name="arrow-down" />
                            </div>
                        </van-button>
                    </template>
                </van-field>
            </van-cell-group>
            <div class="account-label-container">
                <p class="success-label">
                    Wallet Balance: {{JKTBalance}} JKT</p>

            </div>
            <van-cell>
                <van-button type="danger" block @click="handleDeposit()">Deposit</van-button>
            </van-cell>
            <div class="account-safe-area-bottom"></div>
        </van-cell-group>
    </van-popup>
    <!-- Withdraw pop up -->
    <van-popup class="van-popup-fixed-height" v-model:show="showWithdraw" round position="bottom" closeable>
        <van-cell title="Withdraw" class="van-cell-no-border">
        </van-cell>
        <van-cell-group class="van-popup-fixed-height">
            <van-cell-group inset class="account-cell-group-dark ">
                <van-field class="account-cell-dark" v-model="amountWithdraw" type="number" center clearable label="" placeholder="Enter Amount">
                    <template #button>
                        <van-button size="mini" color="#191A1E" @click="amountWithdraw = balance">
                            <div style="display: block">
                                <span style="color: red">MAX&nbsp;</span>
                                <span>JKT &nbsp;&nbsp;</span>
                                <van-icon name="arrow-down" />
                            </div>
                        </van-button>
                    </template>
                </van-field>
            </van-cell-group>
            <div class="account-label-container">
                <p class="success-label">
                    Wallet Balance: {{balance}} JKT</p>
                <p class="success-label">
                    Transaction Fees: 8 % (7% will be transferred to the black hole address for destruction)</p>
            </div>
            <van-cell>
                <van-button type="danger" block @click="handleWithdraw()">Withdraw</van-button>
            </van-cell>
            <div class="account-safe-area-bottom"></div>
        </van-cell-group>
    </van-popup>

</van-cell-group>
<van-cell-group inset class="van-cell-group-margin">
    <van-cell center title="Invite Friends">
        <template #icon>
            <svg-icon icon-class='invite-friends' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
        </template>
        <template #right-icon>
            <van-button class="btn-small-account-min-width" type="danger" size="small" @click="goTo('/account/invite')">
                Invite
            </van-button>
        </template>
    </van-cell>
    <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider>
    <van-cell center title="Community">
        <template #icon>
            <svg-icon icon-class='bsc-contract' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
        </template>
        <template #right-icon>
            <van-button class="btn-small-account-min-width" type="danger" size="small" @click="window.open(communityAddress)">Join Us
            </van-button>
        </template>
    </van-cell>
    <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider>
    <van-cell center title="Contact Us" is-link icon="phone-o" @click="window.open(communityAddress )">
        <template #icon>
            <svg-icon icon-class='contact-us' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
        </template>
    </van-cell>
    <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider>
    <van-cell center title="Settings" is-link icon="setting-o" @click="goTo('/account/setting')">
        <template #icon>
            <svg-icon icon-class='settings' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
        </template>
    </van-cell>
    <van-divider :style="{ borderColor: '#202125', padding: '0 16px' }"></van-divider>
</van-cell-group>
<loading-overlay :show='loading'></loading-overlay>
<div class="account-safe-area-bottom"></div>
</template>

<script>
import {
    defineComponent,
    onMounted,
    ref,
} from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';
import {
    formatCurrency
} from '@/utils/baseUtils';
import {
    useRouter,
} from 'vue-router';
import {
    copyToClipboard,
} from '@/utils/clipboard';
import Web3Provider from '../../utils/Web3Provider';
import {
    COMMUNITE_ADDRESS
} from '@/const/address/linkAddress';
import {
    vipLevel
} from '@/const/vipLevel';
import BigNumber from 'bignumber.js';
import request from '@/utils/request';
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import {
    Toast
} from 'vant';
import {
    JKT_DECIMAL
} from '@/const/address/tokenAddress';

export default defineComponent({
    components: {
        SvgIcon,
        LoadingOverlay
    },
    setup() {
        const loading = ref(false);
        const router = useRouter();
        const userInfo = ref();
        userInfo.value = {};
        const userAddress = ref();
        userAddress.value = '';
        const transferAddress = ref();
        transferAddress.value = undefined;

        const JKTBalance = ref();
        JKTBalance.value = 'Loading...';
        const USDTBalance = ref();
        USDTBalance.value = 'Loading...';
        const JKTBalanceNum = ref(0);

        const balanceNum = ref(0);
        const balance = ref();
        balance.value = 'Loading...';

        const communityAddress = ref(COMMUNITE_ADDRESS);

        const showDeposit = ref(false);
        const showWithdraw = ref(false);
        const showAmount = ref(localStorage.getItem('showAmount') !== null ? JSON.parse(localStorage.getItem('showAmount')) : true);
        const amountDeposit = ref('');
        const amountWithdraw = ref('');

        const goTo = (r, query) => {
            router.push({
                path: r,
                query: query || {},
            });
        };

        const toggleShow = () => {
            showAmount.value = !showAmount.value;
            localStorage.setItem('showAmount', showAmount.value);
        };

        const handleDeposit = async () => {
            const ammount = Number(amountDeposit.value);
            if (ammount > Number(JKTBalanceNum.value) || ammount === 0) {
                Toast.fail('Input number should less than balance and bigger than 0!');
                return;
            }
            if (JKTBalanceNum.value === 0) {
                Toast.fail('No balance to Deposit!');
                return;
            }
            await getTransferAddress();
            if (transferAddress.value && ammount > 0) {
                loading.value = true;
                const res = await Web3Provider.getInstance().transferMoney(transferAddress.value, new BigNumber(ammount).times(new BigNumber(10).pow(JKT_DECIMAL)))
                if (res) {
                    Toast.success("Deposit success !!!");
                    //Toast.success('The process will take 3~5 minutes, please check later');
                    initData();

                } else {
                    Toast.fail("Deposit failed !!!");
                }
                initData();
                showDeposit.value = false;
                loading.value = false;
            }
        }

        const handleWithdraw = async () => {
            const ammount = Number(amountWithdraw.value);
            if (ammount > Number(balance.value) || ammount === 0) {
                Toast.fail('Input number should less than balance and bigger than 0!');
                return;
            }
            if (balance.value === '0') {
                Toast.fail('No balance to withdraw!');
                return;
            }
            await getTransferAddress();
            if (transferAddress.value && ammount > 0) {
                loading.value = true;
                await request.post('/withdraw', {
                    data: {
                        address: userAddress.value,
                        from_address: transferAddress.value,
                        amount: amountWithdraw
                    }
                }).then((res) => {
                    if (res.code === 0) {
                        Toast.success(res.result);
                        //Toast.success('The process will take 3~5 minutes, please check later');
                        initData();
                    }
                    showWithdraw.value = false;
                    loading.value = false;
                }).catch((err) => {
                    showWithdraw.value = false;
                    loading.value = false;
                    Toast.fail("Withdraw failed !!!");
                    console.log(err);
                });;
            }
        }

        const initData = async () => {
            amountDeposit.value = undefined;
            amountWithdraw.value = undefined;
            const total = await Web3Provider.getInstance().getJKTBalance();
            JKTBalanceNum.value = new BigNumber(total).div(new BigNumber(10).pow(JKT_DECIMAL)).toNumber();
            JKTBalance.value = formatCurrency(JKTBalanceNum.value);

            const exchangeOfUsdtToJkt = await Web3Provider.getInstance().getExchangeOfUsdtToJkt();
            USDTBalance.value = formatCurrency(new BigNumber(total).div(new BigNumber(exchangeOfUsdtToJkt)));
            request.get('/getbalance', {
                params: {
                    userid: userAddress.value
                }
            }).then((res) => {
                if (res.code === 0) {
                    balance.value = res.result;
                }
            }).catch((err) => {
                console.log(err);
            });
        }

        const getTransferAddress = async () => {
            if (!transferAddress.value) {
                await request.get('/getaddress', {
                    params: {
                        userid: userAddress.value
                    }
                }).then((res) => {
                    if (res.code === 0) {
                        transferAddress.value = res.result;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }

        }

        onMounted(async () => {
            userInfo.value = await Web3Provider.getInstance().getUserInfo();
            userAddress.value = await Web3Provider.getInstance().getAccountAddress();
            await getTransferAddress();
            await initData();
        });

        return {
            userInfo,
            userAddress,
            goTo,
            showDeposit,
            showWithdraw,
            amountDeposit,
            amountWithdraw,
            showAmount,
            toggleShow,
            copyToClipboard,
            window,
            JKTBalance,
            communityAddress,
            vipLevel,
            USDTBalance,
            balance,
            JKTBalanceNum,
            balanceNum,
            transferAddress,
            loading,
            handleWithdraw,
            handleDeposit
        };
    },
});
</script>

<style src='../../assets/css/Account.css'></style>
<style scoped>
.van-popup-fixed-height {
    min-height: 300px;
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

.account-cell-group-dark {
    background-color: #191A1E;
}

.account-cell-group-dark .account-cell-dark {
    background-color: #191A1E;
}
</style>
