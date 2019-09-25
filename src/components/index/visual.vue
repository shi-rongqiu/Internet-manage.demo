<template>
  <div class="container">
    <div style="height:51%;" class="back">
      <div class="header-search">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="石家庄220kV子龙站(GIS)" name="1"></el-tab-pane>
          <el-tab-pane label="保定110kV下河西站(AIS)" name="2"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="chart-container">
        <div class="chart-item">
          <div class="chart-left">
            <div class="chart-title">
              传感器类型和数量统计
            </div>
            <chart ref="chart1" :options="myChart" class="chart-left-mychart"></chart>
          </div>
          <div class="chart-right" style="height:100%;">
            <div class="chart-title">
              设备类型和数据统计
            </div>
            <chart ref="chart2" :options="myChart1" class="chart-left-mychart"></chart>
          </div>
        </div>
      </div>
    </div>
    <div style="height:calc(49% - 5px);" class="back">
      <div>
        <el-row class="second">
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
            <div class="chart-title title1">
              套件告警&nbsp;&nbsp;
              设备事件&nbsp;&nbsp;
              网络故障
            </div>
            <chart ref="chart3" :options="myChart2" class="chart-left-mychart"></chart>
          </div>
          <div class="chart-right">
            <div class="chart-title title1">
              电力设备告警占比
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
      activeName: '1'
    }
  },
  methods: {
    handleClick () {},
    showTime () {
      this.show = true
      this.select = 4
      this.custom = ''
    },
    selectTime (value, active) {
      this.show = false
      this.select = active
      this.custom = value
      this.getBottom()
    },
    handleTime () {
      if (this.endTime && this.startTime && this.endTime <= this.startTime) {
        return this.$message.warning('结束时间在开始时间之前！')
      }
      if (this.endTime && this.startTime) {
        this.getBottom()
      }
    },
    getSensor () {
      var name = ['温度传感器', '湿度传感器']
      // var data1 = []
      // data.forEach((el) => {
      //   name.push(el.sensorTypeName)
      //   data1.push(el.sensorNum)
      // })
      this.myChart = {
        title: {
        },
        tooltip: {},
        grid: {
          top:'27px',
          left: '0',
          right: '0',
          bottom: '0',
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
        series: [{
          type: 'bar',
          itemStyle: {
            color: '#278cff'
          },
          barWidth: 30,
          data: [20, 30]
        }]
      }
    },
    getSensor1 () {
      var name = []
      var data = [
        {
          basicDeviceSensorList: [
            {typeName: '蓄电池组', sensorNum: 5},
            {typeName: '开关柜', sensorNum: 3}
          ],
          sensorTypeName: '温度传感器'
        },
        {
          basicDeviceSensorList: [
            {typeName: '蓄电池组', sensorNum: 4},
            {typeName: '开关柜', sensorNum: 1}
          ],
          sensorTypeName: '湿度传感器'
        }
      ]
      var data1 = []
      if (data.length > 0) {
        data[0].basicDeviceSensorList.forEach((al) => {
          name.push(al.typeName)
        })
      }
      data.forEach((el) => {
        var arr = []
        el.basicDeviceSensorList.forEach((al) => {
          arr.push(al.sensorNum)
        })
        data1.push({
          name: el.sensorTypeName,
          type:'bar',
          stack: '类型',
          barWidth: 30,
          data:arr
        })
      })
      this.myChart1 = {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // legend: {
        // },
        grid: {
          top:'20px',
          left: '0',
          right: '0',
          bottom: '0',
          containLabel: true
        },
        toolbox: {
          show : true,
          orient: 'vertical',
          x: 'right',
          y: 'center',
          feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        calculable : true,
        xAxis : [
          {
            type : 'category',
            data : name
          }
        ],
        yAxis : [
          {
            type : 'value',
            splitLine : {
              show:true,
              lineStyle: {
                color: '#eee',
                type: 'dashed',
                width: 1
              }
            }
          }
        ],
        series: data1
      }
    },
    getSensor2 () {
      var data = [
        {majorType: 0,alarmNum:1},
        {majorType: 1,alarmNum:3},
        {majorType: 2,alarmNum:4}
      ]
      var data1 = []
      data.forEach((el) => {
        if (el.majorType === 0) {
          data1.push({value:data[0].alarmNum, name:'APP告警', itemStyle: {color: '#ffbf00'}})
        }
        if (el.majorType === 1) {
          data1.push({value:data[1].alarmNum, name:'设备告警', itemStyle: {color: '#5a7fff'}})
        }
        if (el.majorType === 2) {
          data1.push({value:data[2].alarmNum, name:'网络故障', itemStyle: {color: '#ff5a5a'}})
        }
      })
      this.myChart2 = {
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: 'right',
          width: '50%',
          itemWidth: 15
        },
        toolbox: {
          show : true,
          feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'center',
                  max: 1548
                }
              }
            },
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        calculable : true,
        series : [
          {
            type:'pie',
            radius : ['40%', '60%'],
            center: ['50%', '65%'],
            data: data1
          }
        ]
      }
    },
    getSensor3 () {
      var data = [
        {alarmNum: 2,typeName: '开关柜'},
        {alarmNum: 2,typeName: '蓄电池组'}
      ]
      var data1 = []
      data.forEach((el) => {
        data1.push({
          value: el.alarmNum,
          name: el.typeName
        })
      })
      this.myChart3 = {
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: 'right',
          width: '75%',
          itemWidth: 15
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series : [
          {
            type:'pie',
            radius : '55%',
            center: ['50%', '65%'],
            data: data1.sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
              normal: { // 标签提示换行，大于20个字换行
                formatter (v) {
                  let text = v.name
                  return text.length < 20 ? text : `${text.slice(0, 20)}\n${text.slice(20)}`
                }
              }
            },
            labelLine: {
              normal: {
                smooth: 0.2,
                length: 20,
                length2: 70
              }
            },
            // itemStyle: {
            //   normal: {
            //     // 随机显示
            //     color: function (d) { return '#' + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16) }
            //   }
            // },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            }
          }
        ]
      }
    },
    getData () {
      mylib.axios({
        url: '/app/topology/overview',
        type: 'post',
        done (res) {
          if (res.code === 0) {
            this.deviceNum = res.deviceNum
            this.sensorNum = res.sensorNum
            this.sensorOnlineNum = res.sensorOnlineNum
            this.agsNodenum = res.agsNodenum
            // this.getSensor(res.sensorgraph)
            // this.getSensor1(res.devicegraph)
          }
        }
      }, this)
    },
    getBottom () {
      mylib.axios({
        url: '/app/topology/lodview',
        type: 'post',
        params: {
          custom: this.custom,
          startTime: this.startTime,
          endTime: this.endTime
        },
        done (res) {
          if (res.code === 0) {
            // this.getSensor2(res.alarmgraph)
            // this.getSensor3(res.devalarmgraph)
          }
        }
      }, this)
    }
  },
  mounted () {
    this.getSensor()
    this.getSensor1()
    this.getSensor2()
    this.getSensor3()
    this.getData()
    this.getBottom()
  },
  created() {
    this.height = document.documentElement.clientHeight - 55
  }
}
</script>
<style scoped>
  .header-search{padding:13px 20px 11px;}
  .top-img{margin-right:10px;float:left;}
  .top-img img{
    width:23px;height:23px;
  }
  .title{color:#333;font-weight: bold;font-size:16px;}
  .left-border{display:inline-block;width:5px;background:#343b70;height:20px;border-radius:8px;float:left;margin-top:15px;margin-right:5px;}
  .chart-title{color:#333;font-weight: bold;font-size:14px;}
  .title1{position:absolute;top:0;}
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

  .total-number{display:flex;justify-content:flex-end;font-size:14px;color:#333;}
  .total-number>div{margin-right:60px;}
  .chart-container{padding:0 20px;height:calc(100% - 57px);box-sizing: border-box;}
  .second{margin-top:5px;height:50px;line-height:50px;padding:0 20px;box-sizing: border-box;}
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
