<template>
  <el-container :style="{height:height + 'px'}">
    <el-container>
      <el-aside class="aside" >
        <div class="logo-top">
          <img src="../assets/img/logo-top.png" alt="">
        </div>
        <div class="title" @click="change('1')" :class="{active: aside == 1}">
          <span class="aside-icon"><img src="../assets/img/one-icon.png" alt=""></span>
          物联态势可视化
        </div>
        <div class="title" @click="change('2')" :class="{active: aside == 2}">
          <span class="aside-icon"><img src="../assets/img/one-icon.png" alt=""></span>
          实时感知监控
        </div>
        <div class="title" @click="change('3')" :class="{active: aside == 3}">
          <span class="aside-icon"><img src="../assets/img/two-icon.png" alt=""></span>
          感知层管理
        </div>
        <div class="title" @click="change('4')" :class="{active: aside == 4}">
          <span class="aside-icon"><img src="../assets/img/three-icon.png" alt=""></span>
          算法应用仓库
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <el-row>
            <el-col :span="7">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="(item, index) in breadList" :key="index"><span style="color:#fff;">{{item.name}}</span></el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
            <el-col :span="10">
              <div style="text-align:center;">电力物联网边缘管理平台</div>
            </el-col>
            <el-col :span="7">
            </el-col>
          </el-row>
          <div class="header">
            <div @click="handleClick(item)" v-for="(item, index) in content" :key="index"
                 :class="{select: activeIndex == item.id}">{{item.name}}</div>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// import mylib from '../mylib'
export default {
  name: 'index',
  data () {
    return {
      userName: localStorage.getItem('user') || '',
      height: null,
      activeIndex: '1',
      aside: '1',
      content: [
        {name: '总览', id: '1', path: '/'},
        {name: '单站可视化', id: '2', path: '/index/visual'}
      ],
      breadList: [
        {name: '首页'},
        {name: '物联网管理'},
        {name: '物联态势可视化'}
      ]
    }
  },
  methods: {
    change (id) {
      this.aside = id
      if (id === '1') {
        this.$router.push('/')
        this.content = [
          {name: '总览', id: '1', path: '/'},
          {name: '单站可视化', id: '2', path: '/index/visual'}
        ]
        this.breadList.splice(2,1, {name: '物联态势可视化'})
      } else if (id === '2') {
        this.$router.push('/control')
        this.content = [
          {name: '总览', id: '1', path: '/control'},
          {name: '实时数据', id: '2', path: '/control/timing'},
          {name: '告警数据', id: '3', path: '/control/warning'}
        ]
        this.breadList.splice(2,1, {name: '实时感知监控'})
      } else if (id === '3') {
        this.$router.push('/preception')
        this.content = [
          {name: '总览', id: '1', path: '/preception'},
          {name: '站点管理', id: '2', path: '/preception/site'},
          {name: '总台账', id: '3', path: '/preception/PMS'},
          {name: '分表', id: '4', path: '/preception/graph'},
          {name: '元数据管理', id: '5', path: '/preception/data'},
          {name: '日志管理', id: '6', path: '/preception/log'},
        ]
        this.breadList.splice(2,1, {name: '感知层管理'})
      } else if (id === '4') {
        this.$router.push('/arithmetic')
        this.content = [
          {name: '总览', id: '1', path: '/arithmetic'},
          {name: '安装日志', id: '2', path: '/arithmetic/log'}
        ]
        this.breadList.splice(2,1, {name: '算法应用仓库'})
      }
      this.activeIndex = '1'
      sessionStorage.setItem('aside', id)
      sessionStorage.setItem('activeIndex', '1')
    },
    handleClick (item) {
      sessionStorage.setItem('activeIndex', item.id)
      this.activeIndex = item.id
      this.$router.push(item.path)
    }
  },
  mounted () {
    this.aside = sessionStorage.getItem('aside') || '1'
    var id = this.aside
    if (id === '1') {
      this.content = [
        {name: '总览', id: '1', path: '/'},
        {name: '单站可视化', id: '2', path: '/index/visual'}
      ]
      this.breadList.splice(2,1, {name: '物联态势可视化'})
    } else if (id === '2') {
      this.content = [
        {name: '总览', id: '1', path: '/control'},
        {name: '实时数据', id: '2', path: '/control/timing'},
        {name: '告警数据', id: '3', path: '/control/warning'}
      ]
      this.breadList.splice(2,1, {name: '实时感知监控'})
    } else if (id === '3') {
      this.content = [
        {name: '总览', id: '1', path: '/preception'},
        {name: '站点管理', id: '2', path: '/preception/site'},
        {name: '总台账', id: '3', path: '/preception/PMS'},
        {name: '分表', id: '4', path: '/preception/graph'},
        {name: '元数据管理', id: '5', path: '/preception/data'},
        {name: '日志管理', id: '6', path: '/preception/log'},
      ]
      this.breadList.splice(2,1, {name: '感知层管理'})
    } else if (id === '4') {
      this.content = [
        {name: '总览', id: '1', path: '/arithmetic'},
        {name: '安装日志', id: '2', path: '/arithmetic/log'}
      ]
      this.breadList.splice(2,1, {name: '算法应用仓库'})
    }
    this.activeIndex = sessionStorage.getItem('activeIndex') || '1'
  },
  created () {
    this.height = document.documentElement.clientHeight
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .el-header {
    width:calc(100% - 179px);
    min-width: 900px;
    background-color: #3F4084;
    text-align: center;
    height:110px !important;
    line-height: 55px;
    font-size: 16px;
    color:#fff;
    padding:0;
    position:fixed;
    top:0;
    z-index: 222;
  }
  .logo-top{
    text-align:center;
    padding-top:30px;
    margin-bottom:34px;
  }
  .logo-top img{
    width:127px;
    height:41px;
  }
  .aside{
    width:179px !important;
    background-color: #3F4084;
  }
  .avatar{
    width:40px;
    height:40px;
    border-radius: 50%;
    background:#fff;
    margin-top:8px;
    float:left;
  }

  .el-aside {
    color: #333;
    overflow-x:hidden;
  }
  .aside-icon{
    float:left;
    margin:0 5px 0 0;
  }
  .aside-icon img{
    width:20px;
    height:20px;
  }
  .active{background:#019694;}
  .el-main{padding:110px 0 0;}
  .title{clear:both;height:55px;padding:15px 0 15px 20px;color:#fff;cursor:pointer;font-size:16px;box-sizing: border-box;}
  .header{
    height:55px;
    line-height:55px;
    display:flex;
    width:100%;
    background-color:rgba(255,255,255,0.08);
    padding:0;
  }
  .header>div{width:135px;text-align:center;color:#fff;cursor:pointer;font-size:16px;}
  .header .select{border-top:2px solid #eb9f0e;font-weight: bold;font-size:20px;}
  .el-breadcrumb{margin-top:22px;font-size:12px;}
  .img{width:40px;height:40px;}
  .header-right{
    cursor: pointer;font-size:14px;
  }
  .left-name{
    float:right;margin-right:75px;
  }
  .right-avatar{
    float:right;margin-right:5px;height:55px;padding-top:7px;box-sizing: border-box;
  }
</style>
