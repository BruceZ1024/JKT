<template>
<van-cell center title="VIP Level: Gold" label="Rewards: 34,32">
    <template #icon>
        <svg-icon icon-class='big-wallet' style='width:48px; height:48px;' class="right-icon-account"></svg-icon>
    </template>
    <template #right-icon>
        <van-button type="danger" class="btn-small-account-min-width" size="small">Receive</van-button>
    </template>

</van-cell>
<van-cell title="" label="">
</van-cell>
<!-- <van-cell-group inset class="van-cell-group-margin">

</van-cell-group> -->
<van-cell-group inset class="van-cell-group-margin">
    <van-cell center is-link @click="showPicker = true">Sellect Level
        <template #right-icon>
            <van-icon name="arrow-down" />
        </template>
    </van-cell>
    <van-popup v-model:show="showPicker" round position="bottom" closeable>
        <van-cell title="Sellect VIP Status" class="van-cell-no-border">
        </van-cell>
        <van-radio-group v-model="checked">
            <van-cell-group>
                <van-cell title="Sliver - 15% extra power" label="JKT~ $100) | + 5% from 2nd level invitees)" clickable @click="checked = 'Silver'">
                    <template #icon>
                        <svg-icon icon-class='sliver' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
                    </template>
                    <template #right-icon>
                        <van-radio checked-color="#ee0a24" name="Silver" />
                    </template>
                </van-cell>
                <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider>
                <van-cell title="Gold - 20% extra power" label="JKT~ $500) | + 10% from 2nd level invitees)" clickable @click="checked = 'Gold'">
                    <template #icon>
                        <svg-icon icon-class='gold' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
                    </template>
                    <template #right-icon>
                        <van-radio checked-color="#ee0a24" name="Gold" />
                    </template>
                </van-cell>
                <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider>
                <van-cell title="Platinum - 30% extra power" label="JKT~ $500) | + 15% from 2nd level invitees)" clickable @click="checked = 'Platinum'">
                    <template #icon>
                        <svg-icon icon-class='platinum' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
                    </template>
                    <template #right-icon>
                        <van-radio checked-color="#ee0a24" name="Platinum" />
                    </template>
                </van-cell>
                <van-divider :style="{ borderColor: '#FFFFFF', padding: '0 16px' }"></van-divider>
                <van-cell>
                    <van-button type="danger" block @click="showPicker = false">Select</van-button>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
        <div class="account-safe-area-bottom"></div>
    </van-popup>
    <van-cell center title="Price in JKT">
        <template #right-icon>
            <van-button plain size="small" class="btn-small-account-min-width right-icon-account btn-plain-dark-white-dark">
                3233.3
                <template #icon>
                        <svg-icon icon-class='app-icon' style='width:26px; height:26px;' class="right-icon-account"></svg-icon>
                    </template>
            </van-button>
        </template>
    </van-cell>
</van-cell-group>
<span class="upgrade-label"> Wallet Balance: 3423,34 JKT</span>
<div class="pay-button">
    <van-button type="danger" block @click="showSuccess = true">Pay</van-button>
</div>

<van-popup v-model:show="showSuccess" round position="bottom" closeable>
    <van-cell title="Congratulations" class="van-cell-no-border">
        <template #icon>
            <svg-icon icon-class='dropdown-green' style='width:30px; height:30px;' class="right-icon-account"></svg-icon>
        </template>
    </van-cell>
    <van-cell-group>
        <div class="account-label-container">
            <p class="success-label">
                You have successfully upgardes your account.</p>
            <p class="success-label">
                Now you can power up your earnings.</p>
        </div>
        <van-cell>
            <van-button type="danger" block @click="goTo('/account')">Go to my account</van-button>
        </van-cell>
        <div class="account-safe-area-bottom"></div>
    </van-cell-group>

</van-popup>
</template>

<script>
import {
    reactive,
    onMounted,
    toRefs,
} from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';
import {
    useRouter,
} from 'vue-router';
import {
    ref
} from 'vue';

export default {
    components: {
        SvgIcon,
    },
    setup() {
        const showPicker = ref(false);
        const showSuccess = ref(false);
        const checked = ref('Silver');
        const router = useRouter();
        const goTo = (r, query) => {
            router.push({
                path: r,
                query: query || {},
            });
        };
        return {
            goTo,
            checked,
            showPicker,
            showSuccess,
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

.pay-button {
    margin-left: 16px;
    margin-right: 16px;
}
</style>
