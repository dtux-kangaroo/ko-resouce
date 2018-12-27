<template>
 <span class="hamburger">
    <i class="iconfont" @click="toggle"  :class="{'icon-unfold':isFold,'icon-zhankaianniuicon':!isFold}"></i>
   </span>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isFold: {
      type: Boolean,
      default: false
    },
    toggle: {
      type: Function,
      default: null
    }
  }
}
</script>

<style lang='scss' scoped>
.hamburger{
  display: inline-block;
  cursor: pointer;
  width: 18px;
  height: 18px;
  i{
  font-size:18px;
    color:#fff;
  }
}

</style>
