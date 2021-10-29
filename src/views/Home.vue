<template>
  <div class="background-wrapper">

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "home",
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.background-wrapper{
  width: 100%;
  height:100%;
  background-image: url("../assets/images/home/background.jpg");
  background-size: cover;
  background-position: center center;
}
</style>
