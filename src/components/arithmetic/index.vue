<template>
  <div class="container back">
    <div class="header">第三方应用</div>
    <div class="content">
      <div class="content-item" @click="enterDetail('1')">
        <div>
          <img src="../../assets/arithmetic/shenhe.png" alt="">
        </div>
        <div>局放算法</div>
      </div>
      <div class="content-item" @click="enterDetail('2')">
        <div>
          <img src="../../assets/arithmetic/online.png" alt="">
        </div>
        <div>油色谱算法</div>
      </div>
      <div class="content-item" @click="enterDetail('3')">
        <div>
          <img src="../../assets/arithmetic/underline.png" alt="">
        </div>
        <div>避雷器算法</div>
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
// import mylib from '../mylib'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  methods: {
    add () {
      this.$router.push('/arithmetic/add')
    },
    enterDetail (value) {
      this.$router.push('/arithmetic/detail/' + value)
    }
  },
  created () {
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
