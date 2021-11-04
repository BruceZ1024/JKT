<template>
<van-cell center is-link @click="showPicker = true" value="English">Language
    <template #icon>
        <svg-icon icon-class='language. icon' style='width:24px; height:24px;' class="right-icon-account"></svg-icon>
    </template>
    <template #right-icon>
        <span class="right-icon-account">English</span>
        <van-icon name="arrow-down" />
    </template>
</van-cell>
<van-popup v-model:show="showPicker" round position="bottom"  closeable>
    <!-- <van-picker allow-html :columns="columns" :default-index="1" @cancel="showPicker = false" @confirm="onConfirm"></van-picker> -->
    <van-cell title="Select Language" class="van-cell-no-border">
    </van-cell>
    <van-radio-group v-model="checked">
        <van-cell-group>
            <van-cell title="English" clickable @click="checked = 'English'">
                <template #right-icon>
                    <van-radio checked-color="#ee0a24" name="English" />
                </template>
            </van-cell>
            <van-cell title="Chinese" clickable @click="checked = 'Chinese'">
                <template #right-icon>
                    <van-radio checked-color="#ee0a24" name="Chinese" />
                </template>
            </van-cell>
            <van-cell title="Korean" clickable @click="checked = 'Korean'">
                <template #right-icon>
                    <van-radio checked-color="#ee0a24" name="Korean" />
                </template>
            </van-cell>
            <van-cell title="Japanese" clickable @click="checked = 'Japanese'">
                <template #right-icon>
                    <van-radio checked-color="#ee0a24" name="Japanese" />
                </template>
            </van-cell>
        </van-cell-group>
    </van-radio-group>

</van-popup>
</template>

<script>
import {
    defineComponent,
    renderSlot
} from 'vue';
import {
    ref
} from 'vue';
export default {
    name: " LanguagePicker",
    setup() {
        const columns = ['English', 'Chinese', 'Korean', ' Japanese'];
        const result = ref('');
        const showPicker = ref(false);

        const onConfirm = (value) => {
            result.value = value;
            showPicker.value = false;
        };
        const checked = ref('English');
        return {
            checked,
            showPicker,
            onConfirm,
        };
        // return {
        //     result,
        //     columns,
        //     onConfirm,
        //     showPicker,
        // };
    },
}
</script>

<style scoped>
.van-radio__icon{
    color: black;
}

.van-cell-no-border::after {
    border: 0px;

}

</style>
