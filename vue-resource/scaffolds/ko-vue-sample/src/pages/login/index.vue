<template>
  <div class="login-form">
  <el-form :model="loginForm" :rules="rules" ref="loginForm" >
    <el-form-item label="" prop="name">
      <el-input v-model="loginForm.name"></el-input>
    </el-form-item>
    <el-form-item label="" prop="pwd">
      <el-input type="password" v-model="loginForm.pwd"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width:100%" @click="login">登 录</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  data () {
    return {
      loginForm:{
        name:'admin',
        pwd:'admin'
      },
      rules:{
        name:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
        ]
      },
      msg: 'Hello World!home',
    }
  },
  methods:{
   login(){
     this.$refs.loginForm.validate((valid,obj)=>{
      this.$router.push('/index/home');
     })
   }
  },
  mounted() {

  }
}
</script>

<style>
.login-form {
    margin: 0 auto;
    width: 380px;
    background: #fff;
    margin-top: 60px;
}
</style>
