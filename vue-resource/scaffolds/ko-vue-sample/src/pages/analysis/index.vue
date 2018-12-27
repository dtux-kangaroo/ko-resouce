<template>
  <div>
    <div class="vux-home">
       this is analysis{{msg}} {{8002111|toThousandslsFilter}}
      <LineChart
       :option="lineOption"
       :config="{'handle':test}"
       height="300px"></LineChart>
  </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
import {LineChart} from "@/components/chart/index"
import {lineOption}from '@/constants/options'
export default {
  components:{
    LineChart
  },
  data () {
    return {
      msg: 'Hello World!analysis',
      lineOption
    }
  },
  mounted() {
  },
  methods:{
    test(e){
     console.log(e,'item');
    }
  }
}
</script>

<style>
.vux-home {
  text-align: center;
  color:blue;
}
</style>
