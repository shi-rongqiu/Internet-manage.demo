<template>
  <div class="content tree">
    <div class="login-content">
      <div style="text-align:center;"><img class="top-img" src="../assets/img/logo.png" alt=""></div>
      <div class="login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="55px">
          <el-form-item prop="userName">
            <el-input placeholder="请输入用户名" class="card-width" v-model="ruleForm.userName">
              <template slot="prepend">
                <span class="left-icon"><img src="../assets/img/admin.png" alt="" class="img"></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <el-input placeholder="请输入密码" type="password" class="card-width" v-model="ruleForm.password">
              <template slot="prepend">
                <span class="left-icon"><img src="../assets/img/key.png" alt="" class="img"></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div>
              <el-checkbox v-model="checked" @change="handleChange">记住密码</el-checkbox>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="card-width notable">
              <el-button class="btn" type="primary" @click="login('ruleForm')">登录</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import mylib from '../mylib'
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      height: null,
      checked: false,
      userName: '',
      password: '',
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          localStorage.setItem('userName', this.ruleForm.userName)
          axios['post'](mylib.URL + '/app/login', {
              username: this.ruleForm.userName,
              password: this.ruleForm.password
          })
            .then ((response) => {
              if (response.data.code === 0) {
                sessionStorage.setItem('token', response.data.token)
                // mylib.ACCESS_TOKEN = res.token
                localStorage.setItem('user', response.data.user.userId)
                location.href = '#/'
              } else {
                this.$message.error(response.data.msg)
              }
            })
        }
      })
    },
    handleChange () {
      if (this.checked) {
        localStorage.setItem('checked', '1')
        localStorage.setItem('password', this.ruleForm.password)
      } else {
        localStorage.setItem('checked', '')
        localStorage.setItem('password', '')
      }
    }
  },
  created () {
    this.height = document.documentElement.clientHeight
    var value = localStorage.getItem('checked')
    this.ruleForm.userName = localStorage.getItem('userName') || ''
    this.ruleForm.password = localStorage.getItem('password') || ''
    sessionStorage.setItem('activeIndex', '1')
    sessionStorage.setItem('token', '')
    if (value === '1') {
      this.checked = true
    }
  }
}
</script>

<style scoped>
.content{
  width:100%;
  min-width:1200px;
  height:100vh;
  min-height:400px;
  background:url("../assets/img/login-bg.png") no-repeat;
  background-size: cover;
  box-sizing: border-box;
  /*position:absolute;*/
  /*top:0;*/
  /*bottom:0;*/

}
.login-content{
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%, -50%);
}
  .login{
    width:469px;
    height:280px;
    background: #fff;
    margin:45px auto;
    border-radius: 4px;
    padding-top:35px;
    box-sizing: border-box;
  }
  .left-icon{
    display:inline-block;
    width:100%;
    height:100%;
    background:#4854bf;
    padding-top:5px;
    box-sizing: border-box;
  }
  .btn{
    width:100%;
    background:#4854bf;
    color: #fff;
  }
  .card-width{
    width:350px;
  }
  .img{
    box-sizing: border-box;
    width:17px;
    height:22px;
  }
</style>
