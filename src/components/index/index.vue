<template>
  <div class="container">
    <div style="height:51%;" class="back">
      <div class="second">
        <div class="title"><span class="left-border"></span>变电站设备情况统计
          <div class="total-number">
            {{total}}个站
          </div>
        </div>
      </div>
      <div class="chart-container">
        <div class="chart-item">
          <div class="chart-left">
            <div class="chart-title">
              传感器类型和数量统计
            </div>
            <chart ref="chart1" :options="myChart" class="chart-left-mychart"></chart>
          </div>
          <div class="chart-right">
            <div class="chart-title">
              设备在线率
            </div>
            <chart ref="chart2" :options="myChart1" class="chart-left-mychart"></chart>
          </div>
        </div>
      </div>
    </div>
    <div style="height:calc(49% - 5px);" class="back">
      <div>
        <el-row class="second" style="margin-top:5px;">
          <el-col :span="8">
            <div class="title"><span class="left-border"></span>变电站设备故障统计情况</div>
          </el-col>
          <el-col :span="16">
            <span :class="{selection: true, active: select == 1}" style="cursor: pointer;" @click="selectTime('1', 1)">一个月</span>
            <span style="margin:0 20px;cursor: pointer;" :class="{selection: true, active: select == 2}" @click="selectTime('3', 2)">三个月</span>
            <span :class="{selection: true, active: select == 3}" style="cursor: pointer;margin-right:20px" @click="selectTime('6', 3)">半年</span>
            <span style="cursor: pointer;margin-right:20px" :class="{selection: true, active: select == 4}" @click="showTime">自定义</span>
            <el-date-picker
              v-if="show"
              v-model="startTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm"
              @change="handleTime"
              placeholder="选择日期时间">
            </el-date-picker>
            <span style="font-size:14px;" v-if="show">到</span>
            <el-date-picker
              v-if="show"
              v-model="endTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm"
              @change="handleTime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-col>
        </el-row>
      </div>
      <div class="chart-container">
        <div class="chart-item">
          <div class="chart-left">
            <div class="chart-title">
              套件告警&nbsp;&nbsp;
              设备事件&nbsp;&nbsp;
              网络故障
            </div>
            <chart ref="chart3" :options="myChart2" class="chart-left-mychart"></chart>
          </div>
          <div class="chart-right">
            <div class="chart-title">
              传感器类型告警占比
            </div>
            <chart ref="chart4" :options="myChart3" class="chart-left-mychart"></chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/pie'
  // 引入柱状图组件
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
  import mylib from '../../mylib'
  export default {
    data () {
      return {
        myChart: null,
        myChart1: null,
        myChart2: null,
        myChart3: null,
        select: 1,
        deviceNum: '',
        sensorNum: '',
        sensorOnlineNum: '',
        agsNodenum: '',
        custom: '1',
        startTime: '',
        endTime: '',
        show: false,
        height: null,
        total: 0
      }
    },
    methods: {
      showTime () {
        this.show = true
        this.select = 4
        this.custom = ''
      },
      selectTime (value, active) {
        this.show = false
        this.select = active
        this.custom = value
        this.getData()
      },
      handleTime () {
        if (this.endTime && this.startTime && this.endTime <= this.startTime) {
          return this.$message.warning('结束时间在开始时间之前！')
        }
        if (this.endTime && this.startTime) {
          this.getData()
        }
      },
      getSensor (data) {
        var name = []
        var data1 = []
        data[0].date.forEach((al) => {
          name.push(al.sensorTypeName)
        })
        data.forEach((el) => {
          var arr = []
          el.date.forEach((al) => {
            arr.push(al.sensornum)
          })
          data1.push({
            type: 'bar',
            name: el.acsname,
            barWidth: 30,
            data: arr
          })
        })
        this.myChart = {
          title: {
          },
          tooltip: {},
          legend: {
          },
          grid: {
            top:'27px',
            left: '0',
            right: '0',
            bottom: '5px',
            containLabel: true
          },
          xAxis: {
            data: name
          },
          yAxis: [{
            type: 'value',
            splitLine : {
              show:true,
              lineStyle: {
                color: '#eee',
                type: 'dashed',
                width: 1
              }
            }
          }],
          series: data1
        }
      },
      getSensor1 (data) {
        var name = []
        var data1 = []
        data[0].date.forEach((al) => {
          name.push(al.sensorTypeName)
        })
        data.forEach((el) => {
          var arr = []
          el.date.forEach((al) => {
            arr.push(al.totalnum)
          })
          data1.push({
            type: 'bar',
            name: el.acsname,
            barWidth: 30,
            data: arr
          })
        })
        this.myChart1 = {
          title: {
          },
          tooltip: {},
          legend: {},
          grid: {
            top:'27px',
            left: '0',
            right: '0',
            bottom: '5px',
            containLabel: true
          },
          xAxis: {
            data: name
          },
          yAxis: [{
            type: 'value',
            splitLine : {
              show:true,
              lineStyle: {
                color: '#eee',
                type: 'dashed',
                width: 1
              }
            }
          }],
          series: data1
        }
      },
      getSensor2 (data) {
        var name = ['协议告警', '设备告警', 'app告警']
        var data1 = []
        data.forEach((el) => {
          var arr = []
          el.date.forEach((al) => {
            arr.push(al.dlnum)
          })
          data1.push({
            type: 'bar',
            name: el.acsname,
            barWidth: 30,
            data: arr
          })
        })
        this.myChart2 = {
          title: {
          },
          tooltip: {},
          legend: {
          },
          grid: {
            top:'27px',
            left: '0',
            right: '0',
            bottom: '5px',
            containLabel: true
          },
          xAxis: {
            data: name
          },
          yAxis: [{
            type: 'value',
            splitLine : {
              show:true,
              lineStyle: {
                color: '#eee',
                type: 'dashed',
                width: 1
              }
            }
          }],
          series: data1
        }
      },
      getSensor3 (data) {
        var name = ['温度', '湿度', '形变', '水浸']
        var data1 = []
        data.forEach((el) => {
          var arr = []
          el.date.forEach((al) => {
            arr.push(al.zlnum)
          })
          data1.push({
            type: 'bar',
            name: el.acsname,
            barWidth: 30,
            data: arr
          })
        })
        this.myChart3 = {
          title: {
          },
          tooltip: {},
          legend: {
          },
          grid: {
            top:'27px',
            left: '0',
            right: '0',
            bottom: '5px',
            containLabel: true
          },
          xAxis: {
            data: name
          },
          yAxis: [{
            type: 'value',
            splitLine : {
              show:true,
              lineStyle: {
                color: '#eee',
                type: 'dashed',
                width: 1
              }
            }
          }],
          series: data1
        }
      },
      getData () {
        mylib.axios({
          url: '/app/visual/pandect',
          type: 'post',
          params: {
            custom: this.custom,
            startTime: this.startTime,
            endTime: this.endTime
          },
          done (res) {
            if (res.code === 0) {
              this.total = res.LXZB.length || res.ZXL.length || res.GJDL.length || res.GJZL.length
              this.getSensor(res.LXZB)
              this.getSensor1(res.ZXL)
              this.getSensor2(res.GJDL)
              this.getSensor3(res.GJZL)
            }
          }
        }, this)
      }
    },
    mounted () {
      this.getData()
    },
    created() {
      this.height = document.documentElement.clientHeight - 55
    }
  }
</script>
<style scoped>
  .top-img{margin-right:10px;float:left;}
  .top-img img{
    width:23px;height:23px;
  }
  .title{color:#333;font-weight: bold;font-size:16px;}
  .left-border{display:inline-block;width:5px;background:#343b70;height:20px;border-radius:8px;float:left;margin-top:15px;margin-right:5px;}
  .chart-title{color:#333;font-weight: bold;font-size:14px;}
  .time-data{
    color:#ed9b12;
    font-weight: bold;
    font-size:16px;
    margin-left:8px;
  }
  .total-data{
    color:#039793;
    font-weight: bold;
    font-size:16px;
  }

  .total-number{font-size:16px;color:#333;float:right;}
  .chart-container{padding:0 20px;height:calc(100% - 57px);box-sizing: border-box;}
  .second{height:50px;line-height:50px;padding:0 20px;box-sizing: border-box;}
  .chart-item{
    width:100%;
    display:flex;padding:10px 0;border-top:1px solid #eee;
    height:100%;
    box-sizing: border-box;
  }
  .chart-left{
    width:45%;padding-left:3px;border-right:1px solid #eee;
    position:relative;
    height:100%;
    box-sizing: border-box;
  }
  .chart-left-mychart{
    width:98%;
    height:calc(100% - 30px);
  }
  .chart-right{
    width:55%;padding-left:20px;
    position:relative;
    height:100%;
    box-sizing: border-box;
  }
  .selection{
    display:inline-block;
    font-size:14px;
    color:#666;
    height:48px;
  }
  .active{
    color:#5952bd;
    border-bottom: 2px solid #5952bd;
    font-weight: bold;
  }
</style>
