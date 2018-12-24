<template>
  <div>
    <div class="vux-home">
       this is table{{msg}}
  </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {

  data () {
    return {
      msg: 'Hello World!table',
    }
  },
  mounted() {
  }
}
</script>

<style>
.vux-home {
  text-align: center;
  color:blue;
}
</style>
