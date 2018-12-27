<template>
  <div>
    <div class="vux-home">
      user--主页{{msg}}
  </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  data () {
    return {
      msg: 'Hello World!home',
    }
  },
  mounted() {
      //this.$store.dispatch('getNavData')
  }
}
</script>

<style>
.vux-home {
  text-align: center;
  color:blue;
}
</style>
