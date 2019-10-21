<template>
  <div class="container back">
    <div class="header">第三方应用</div>
    <div class="content">
      <div class="content-item" v-for="(item, index) in list" :key="index" @click="enterDetail(item.id)">
        <div>
<!--          <img v-if="item.iconPath" :src="item.iconPath" alt="">-->
<!--          <img src="../../assets/arithmetic/shenhe.png" v-if="item.status == 0 && !item.iconPath" alt="">-->
<!--          <img src="../../assets/arithmetic/online.png" v-if="item.status == 1 && !item.iconPath" alt="">-->
<!--          <img src="../../assets/arithmetic/underline.png" v-if="item.status == 2 && !item.iconPath" alt="">-->
          <img src="../../assets/arithmetic/shenhe.png" alt="">
        </div>
        <div>{{item.name}}</div>
      </div>
      <div class="content-item">
        <div @click="add">
          <img src="../../assets/arithmetic/add.png" alt="" style="margin-top:10.5px;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mylib from '../../mylib'
export default {
  name: 'home',
  data () {
    return {
      list: []
    }
  },
  methods: {
    add () {
      this.$router.push('/arithmetic/add')
    },
    enterDetail (id) {
      this.$router.push('/arithmetic/detail/' + id)
    },
    initList () {
      mylib.axios({
        url: '/app/master/list',
        type: 'post',
        params: {
        },
        done (res) {
          if (res.code === 0) {
            this.list = res.rows
          }
        }
      }, this)
    }
  },
  created () {
    this.initList()
  }
}
</script>

<style scoped>
  .header{
    padding:20px 15px;
    box-sizing: border-box;
    color:#333;
    font-size:18px;
    font-weight: bold;
  }
  .content{
    margin:10px 50px;
    display: flex;
    flex-wrap: wrap;
  }
  .content-item{
    width:95px;
    text-align:center;
    margin-bottom:30px;
    margin-right: 50px;
  }
  .content-item>div:first-child{
    height:75px;
    line-height:75px;
    cursor: pointer;
  }
  .content-item>div:nth-child(2){
    margin-top:10px;
    color:#333;
    font-size:16px;
    cursor: pointer;
  }
</style>
