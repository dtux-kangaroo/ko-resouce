<template>
   <div>
     <img :src="page404" alt="404"/>
     <div>查看页面不存在，<span class="back-tip" @click="redirct">返回</span></div>
   </div>
</template>

<script>
import page404 from '@public/assets/imgs/404.jpg'
export default {
 data(){
   return {
     page404
   }
 },
 methods:{
   redirct(){
     this.$router.go(-1);
   }
 }
}
</script>

<style>
.back-tip{
 cursor: pointer;
 color:lightblue;
}
</style>
