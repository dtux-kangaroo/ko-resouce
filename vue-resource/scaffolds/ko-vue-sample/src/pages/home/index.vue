<template>
  <div>
    <div class="vux-home">
      <LineChart
       :option="lineOption"
       :config="{'handle':test}"
       height="300px"></LineChart>
      <BarChart
       :option="barOption"
       :config="{'handle':test}"
       height="300px"
       ></BarChart>
      <PieChart
       :option="pieOption"
       :config="{'handle':test}"
       height="300px"
       ></PieChart>
  </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
import {PieChart,BarChart,LineChart} from "@/components/chart/index"
import {barOption,pieOption,lineOption}from '@/constants/options'

export default {
  components:{
    PieChart,
    BarChart,
    LineChart
  },
  data () {
    return {
      msg: 'Hello World!home',
      barOption,
      lineOption,
      pieOption
    }
  },
methods:{
  test(option){
   console.log(option);
   //可添加事件
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
