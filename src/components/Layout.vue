<template>
  <com-header></com-header>
</template>

<script>
import {defineComponent} from "vue";
import ComHeader from "./ComHeader.vue";

export default defineComponent({
  name: "layout",
  components: {
    ComHeader,
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>

</style>
