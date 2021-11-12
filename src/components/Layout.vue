<template>
<div style=''>
<div class="layout-fixed-width">
    <com-header :title='state.title' :vip_level='vipInfo' :adress='userAddress'></com-header>
    <div style='padding-top: 50px; padding-bottom: 60px'>
        <router-view @postRefreshUserInfo="refreshUserInfo" />
    </div>
    <com-tab-bar :default-path='state.fullPath'></com-tab-bar>
</div>
</div>
</template>

<script>
import {
    defineComponent,
    reactive,
    onMounted,
    ref
} from 'vue';
import {
    onBeforeRouteLeave,
    useRoute,
    onBeforeRouteUpdate,
} from 'vue-router';
import ComHeader from './ComHeader.vue';
import ComTabBar from '@/components/ComTabBar.vue';
import {
    vipLevel
} from '@/const/vipLevel';
import Web3Provider from '@/utils/Web3Provider';

export default defineComponent({
    name: 'layout',
    components: {
        ComHeader,
        ComTabBar,
    },
    emits: ['postRefreshUserInfo'],
    setup() {
        const route = useRoute();
        const state = reactive({
            title: '',
            fullPath: '',
        });
        const {
            meta
        } = route;
        state.title = meta.title;
        state.fullPath = route.fullPath;

        const vipInfo = reactive({
            level: 'N/A',
            icon: 'not_vip'
        });

        const userAddress = ref();
        userAddress.value = '';

        onBeforeRouteLeave((to, from) => {
            state.title = to.meta.title;
            state.fullPath = to.fullPath;
        });

        onBeforeRouteUpdate((to, from) => {
            state.title = to.meta.title;
            state.fullPath = to.fullPath;
        });

        const refreshUserInfo = async () => {
            const userInfo = await Web3Provider.getInstance().getUserInfo();
            vipInfo.level = vipLevel[userInfo.eUserLevel]['level'];
            vipInfo.icon = vipLevel[userInfo.eUserLevel]['icon'];
        };
        onMounted(async () => {
            refreshUserInfo();
            let address = await Web3Provider.getInstance().getAccountAddress();
            if (address && address.length === 42) {
                userAddress.value = address.substring(0, 5) + '...' + address.substring(38, 42);
            }
        });

        return {
            state,
            vipInfo,
            userAddress,
            refreshUserInfo
        };
    },
});
</script>

<style scoped>
@media screen and (min-width: 720px) {
    .layout-fixed-width {
        max-width: 720px;
        padding: 0px calc((100% - 720px)/2)
    }
}

@media screen and (max-width: 720px) {
    .layout-fixed-width {
        width: 100%
    }
}
</style>
