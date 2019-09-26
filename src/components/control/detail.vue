<template>
  <div class="container">
    <div class="title">{{deviceName}}</div>
    <div class="search back">
      <div>
        传感器编号：<el-input class="input" placeholder="请输入" v-model="code"></el-input>
      </div>
      <div>
        时间：<el-date-picker
        v-model="startTime"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm"
        @change="handleTime"
        placeholder="选择日期时间">
      </el-date-picker>
        至
        <el-date-picker
          v-model="endTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm"
          @change="handleTime"
          placeholder="选择日期时间">
        </el-date-picker>
        <el-button type="primary" @click="search" class="btn">搜索</el-button>
      </div>
    </div>
    <div v-for="(item,index) in list" :key="index" class="chart back">
      <chart :ref="'chart' + index" :options="item.myChart" class="mychart"></chart>
    </div>
  </div>
</template>

<script>
import mylib from '../../mylib'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
require('echarts/lib/component/title')
export default {
  name: 'dataDetail',
  data () {
    return {
      myChart: null,
      myChart1: null,
      deviceName: '',
      startTime: '',
      endTime: '',
      code: '',
      list: [],
      id: ''
    }
  },
  methods: {
    search () {
      this.getList()
    },
    getList () {
      mylib.axios({
        url: '/app/actual/line',
        params: {
          sensorcode: this.code,
          deviceCode: this.id,
          startTime: this.startTime,
          endTime: this.endTime
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        type: 'post',
        done (res) {
          if (res.code === 0) {
            this.list = res.rows
            this.getData(this.list)
          }
        }
      }, this)
    },
    handleTime () {
      if (this.endTime && this.startTime && this.endTime <= this.startTime) {
        return this.$message.warning('结束时间在开始时间之前！')
      }
    },
    getData (list) {
      list.forEach((item) => {
        item.myChart = {
          title : {
            text: item.SENSORTYPE
          },
          legend: {
            data:item.legend
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            top:'40px',
            left: '0',
            right: '10%',
            bottom: '5px',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            data: item.xAxis
          },
          yAxis: {
            type: 'value',
            splitLine : {
              show:true,
              lineStyle: {
                color: '#eee',
                type: 'dashed',
                width: 1
              }
            }
          },
          series: item.series
        }
      })

    }
  },
  mounted () {

  },
  created () {
    this.deviceName = this.$route.query.device
    this.id = this.$route.query.code
    this.getList()
  }
}
</script>

<style scoped>
  .title{padding:7px 10px 10px;font-size:16px;color:#333;font-weight: bold;float:left;}
  .search{
    clear:both;padding:13px 11px 12px;
    font-size:12px;
    display:flex;
  }
  .search>div{margin-right:60px;}
  .btn{
    margin-left:10px;
  }
  .children{float:left;margin:11px 30px;}
  .chart{
    clear:both;margin-top:5px;padding:25px;height:calc(50% - 55px);box-sizing: border-box;
  }
  .mychart{
    width:100%;height:100%;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    border-bottom-color:#dcdfe6;
  }
  .el-tabs--border-card{
    border:0;
    box-shadow: 0 0 0 0;
  }
  .detail{
    clear:both;
    margin: 30px 20px;
    display:flex;
    flex-wrap: wrap;
  }
  .detail-item{
    width:280px;
    height:175px;
    margin-right:25px;
    font-size:12px;
    position:relative;
    margin-top:25px;
  }
  .detail-title{
    width:100%;
    display:flex;
    justify-content: space-between;
    font-size:14px;
    color:#333;
    font-weight: bold;
  }
  /*电池*/
  .inner {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .battery {
    position: relative;
    display: inline-block;
    height: 10px;
    width: 18px;
    background: #4553d1;
    border: 1px solid transparent;
  }
  .battery:before {
    content: "";
    position: absolute;
    background-color: #fff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .battery:after {
    content: "";
    position: absolute;
    top: calc(50% - 3px);
    right: -4px;
    height: 6px;
    width: 3px;
    background-color: #4553d1;
  }
  .power {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    background: #4553d1;
    -webkit-transition: -webkit-transform 1s cubic-bezier(0, 0, 0.28, 0.95);
    transition: -webkit-transform 1s cubic-bezier(0, 0, 0.28, 0.95);
    transition: transform 1s cubic-bezier(0, 0, 0.28, 0.95);
    transition: transform 1s cubic-bezier(0, 0, 0.28, 0.95), -webkit-transform 1s cubic-bezier(0, 0, 0.28, 0.95);
  }
  .detail-subtitle{
    color:#888;
    margin-top:3px;
  }
  .detail-show{
    display:flex;
    justify-content: space-between;
    margin-top:8px;
  }
  .value-content{
    width:120px;
    height:45px;
    display:flex;
    border:1px solid #eee;
  }
  .value-content .number{
    font-size: 20px;
  }
  .detail-tip{
    width:120px;
    display:flex;
    justify-content: space-between;
    margin-top:7px;
  }
  .detail-tip>div>span{
    display:inline-block;
    width:8px;
    height:8px;
    background:#278cff;
    margin-right:5px;
  }
  .detail-footer{
    width:100%;
    height:25px;
    line-height:25px;
    padding-left:15px;
    background:#dedeeb;
    position:absolute;
    bottom:0;
  }
  .header-search{line-height:50px;padding:10px 30px;}
  .chart-title{font-weight:bold;font-size:14px;margin-top:20px;}
  .el-pagination{
    text-align:right;
    margin:30px;
  }
</style>
