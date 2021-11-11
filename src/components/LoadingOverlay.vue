<template>
<van-overlay v-model:show='state.loading' @click='btnClick'>

    <div class="wrapper" @click.stop>
        <div class="block">
            <van-loading type="spinner" size="120px" color="red" />
        </div>
    </div>
</van-overlay>
</template>

<script>
import {
    defineComponent,
    reactive,
    watchEffect
} from 'vue';

export default defineComponent({
    name: 'loadingOverlay',
    props: {
        show: Boolean,
        btnCb: Function,
    },
    setup(props, context) {
        const state = reactive({
            loading: false,
        });

        function btnClick() {
            if (props.btnCb) {
                props.btnCb();
            }
        }
        watchEffect(() => {
            state.loading = props.show || false;
        });
        return {
            state,
            btnClick
        };
    },
});
</script>

<style scoped>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    width: 120px;
    height: 120px;
}
</style>
