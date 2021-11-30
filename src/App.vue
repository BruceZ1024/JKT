<template>
  <router-view/>
</template>

<style lang="scss">
html,body,#app{
  width:100%;
  height: 100%;
  color: #FFFFFF;
  background: #191A1E none repeat scroll 0 0;
  line-height: 25px;
  font-family: 'Open Sans',sans-serif;
}

@media screen and (min-width: 426px) {

  .van-popup--bottom {
    max-width: 426px !important;
    left: calc((100% - 426px)/2) !important;
  }
}

@media screen and (max-width: 426px) {
  .van-popup--bottom {
    width: 100%
  }
}

</style>
