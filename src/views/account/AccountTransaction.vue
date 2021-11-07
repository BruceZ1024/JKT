<template>
<van-cell center title="$ 34221" label="ID: 342324">
    <template #icon>
        <svg-icon icon-class='big-wallet' style='width:48px; height:48px;' class="right-icon-account"></svg-icon>
    </template>

</van-cell>
<van-cell title="" label="Address: dfasdouewoiruoqiwer798">
    <template #right-icon>
        <i><svg-icon icon-class='copy' style='width:13px; height:13px;' class="right-icon-account" @click="copyToClipboard($event, 'Address: dfasdouewoiruoqiwer798')"></svg-icon></i>
    </template>
</van-cell>
<van-tabs v-model:active="activeName">
    <van-tab title="Withdraw" name="Withdraw">
        <van-list v-model:loading="withdrawLoading" :finished="withdrawFinished" finished-text="No more item" @load="withdrawOnLoad">
            <van-cell-group v-for="item in list" :key="item.key" inset class="van-cell-group-margin">
                <van-cell class="padding-bottom-0" center :title="'+ '+item.number" :label="item.account">
                    <template #icon>
                        <svg-icon icon-class='logo-up' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
                    </template>
                    <template #right-icon>
                        <div><span>JKT</span>
                            <br />
                            <i><svg-icon icon-class='small-copy' style='width:13px; height:13px;' class="right-icon-account" @click="copyToClipboard($event, item.account)"></svg-icon></i>
                        </div>
                    </template>

                </van-cell>
                <p class="transaction-date-label">{{item.dateTime}}</p>
            </van-cell-group>
            <div class="account-safe-area-bottom"></div>
        </van-list>
    </van-tab>
    <van-tab title="Deposit" name="Deposit">
        <van-list v-model:loading="depositLoading" :finished="depositFinished" finished-text="No more item" @load="withdrawOnLoad">
            <van-cell-group v-for="item in list" :key="item.key" inset class="van-cell-group-margin">
                <van-cell class="padding-bottom-0" center :title="'+ '+item.number" :label="item.account">
                    <template #icon>
                        <svg-icon icon-class='logo-down' style='width:34px; height:34px;' class="right-icon-account"></svg-icon>
                    </template>
                    <template #right-icon>
                        <div><span>JKT</span>
                            <br />
                            <i><svg-icon icon-class='small-copy' style='width:13px; height:13px;' class="right-icon-account" @click="copyToClipboard($event, item.account)"></svg-icon></i>
                        </div>
                    </template>

                </van-cell>
                <p class="transaction-date-label">{{item.dateTime}}</p>
            </van-cell-group>
            <div class="account-safe-area-bottom"></div>
        </van-list>
    </van-tab>
</van-tabs>
</template>

<script>
import {
    reactive,
    ref
} from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';
import {
    useRouter,
} from 'vue-router';
import {copyToClipboard} from '@/utils/clipboard'
export default {
    components: {
        SvgIcon,
    },
    setup() {
        const router = useRouter();
        const activeName = ref('Withdraw');
        const goTo = (r, query) => {
            router.push({
                path: r,
                query: query || {},
            });
        };

        //Withs list
        const list = ref([]);
        const withdrawLoading = ref(false);
        const withdrawFinished = ref(false);
        const depositLoading = ref(false);
        const depositFinished = ref(false);
        const withdrawOnLoad = () => {
            // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    list.value.push({
                        key: i,
                        number: "3595,45345.0" + list.value.length + 1,
                        account: "dufgergrv335764csdfvfjvdfjdnjcnsjndcn.",
                        dateTime: "10/23 02:12:32"
                    });
                }

                // 加载状态结束
                withdrawLoading.value = false;

                // 数据全部加载完成
                if (list.value.length >= 40) {
                    withdrawFinished.value = true;
                }
            }, 1000);
        };
        return {
            goTo,
            activeName,
            list,
            withdrawOnLoad,
            withdrawLoading,
            withdrawFinished,
            depositLoading,
            depositFinished,
            copyToClipboard,
        };
    },
};
</script>

<style scoped>
.transaction-date-label {
    margin-left: 55px;
    font-size: 10pt;
    color: #96979B;
}

.padding-bottom-0 {
    padding-bottom: 0px;
}
</style>
