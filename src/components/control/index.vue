<template>
  <div class="container back" style="position:relative;">
    <div class="float-content">
<!--      <div style="position:relative;width:64px;">-->
<!--        <div class="semicircle">-->
<!--          <span class="triangle"></span>-->
<!--        </div>-->
<!--      </div>-->
      <div class="pop-content">
        <div>
          <div class="pop-item-top">
            <div class="pop-item-top-title padding-style"><img src="../../assets/img/tile.png" alt="">石家庄220kV子龙站(GIS)</div>
            <div class="pop-item-top-context padding-style">
              <div>ID号：1513531435</div>
              <div>地址：xxxxxx</div>
              <div>电网名称：xxxx</div>
            </div>
          </div>
          <div class="pop-item-center padding-style" style="margin-top:4%;">
            <span>电压等级</span><span>110KV</span>
          </div>
          <div class="pop-item-center padding-style">
            <span>电力设备总数</span><span>11</span>
          </div>
          <div class="pop-item-center padding-style">
            <span>传感器总数</span><span>20</span>
          </div>
          <div class="pop-item-center padding-style">
            <span>近一个月告警数量</span><span>30</span>
          </div>
          <div style="margin-top:4%;" class="pop-item-bottom padding-style">
            <div class="pop-item-icon"><img src="../../assets/img/warn-icon.svg" alt=""></div>
            <div class="pop-item-bottom-title">
              <div>告警数量</div>
              <div class="pop-item-number" style="color:#ff5e5e;">2</div>
            </div>
            <div class="pop-item-tip">
              <span class="unhandle">立即处理</span>
            </div>
          </div>
          <div class="pop-item-bottom padding-style">
            <div class="pop-item-icon"><img src="../../assets/img/unline-icon.svg" alt=""></div>
            <div class="pop-item-bottom-title">
              <div>离线数量</div>
              <div class="pop-item-number" style="color:#ffa000;">2</div>
            </div>
            <div class="pop-item-tip">
              <span class="unhandle">立即处理</span>
            </div>
          </div>
          <div class="pop-item-bottom padding-style">
            <div class="pop-item-icon"><img src="../../assets/img/accident-icon.svg" alt=""></div>
            <div class="pop-item-bottom-title">
              <div>故障数量</div>
              <div class="pop-item-number" style="color:#f611ff;">2</div>
            </div>
            <div class="pop-item-tip">
              <span>立即处理</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <chart ref="chart" :options="myChart" class="chart" @click="handleClick"></chart>
<!--    <div style="margin-left:15%;padding-top:3%;">-->
<!--      <img src="../../assets/map.jpg" alt="">-->
<!--    </div>-->
  </div>
</template>

<script>
import 'echarts/lib/chart/map'
// 引入柱状图组件
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
import mylib from '../../mylib'
export default {
  data () {
    return {
      myChart: null,
      isOpen: false
    }
  },
  methods: {
    handleClick (params) {
      console.log(params)
    },
    getSensor () {
      this.myChart = {
        title : {
          x:'center'
        },
        tooltip : {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          x:'left',
          data:['iphone3','iphone4','iphone5']
        },
        // dataRange: {
        //   min: 0,
        //   max: 2500,
        //   x: 'left',
        //   y: 'bottom',
        //   text:['高','低'],           // 文本，默认为数值文本
        //   calculable : true
        // },
        toolbox: {
          show: true,
          orient : 'vertical',
          x: 'right',
          y: 'center',
          feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        series: [
          {
            name: "河北",
            type: 'map',
            mapType: "hebei",
            roam: true,
            selectedMode: 'single',
            label: {
              normal: {
                show: false,//显示省份标签
              },
              emphasis: {
                show: true,//对应的鼠标悬浮效果
              }
            },
            itemStyle: {
              areaColor: '#0069ac',
              borderColor: '#00ecc9',
              borderWidth: '1'
            },
            data:[
              {name:'石家庄', selected:true, value: 1231,
                itemStyle: {
                color: '#ff0000'
                }
              }
            ]
          }
        ]
      }
    }
  },
  mounted () {

  },
  created() {
    this.getSensor()
  }
}
</script>
<style scoped>
  .chart{
    width:650px;
    height:calc(100% - 30px);
    margin-right:40%;
    float:right;
  }
.float-content{
  height:100%;
  position:absolute;
  right:0;
  top:0;
  display: flex;
  overflow: auto;
  min-height: 640px;
}
.pop-content{
  padding-top:4%;
  width:336px;
  background:#3f4084;
  height:100%;
  box-sizing: border-box;
}
.pop-content>div{
  width:325px;
  margin:0 auto;
  height:100%;
}
.pop-content>div>div{
  background:rgba(29, 32, 38, 0.4);
  border:1px solid rgba(0, 255, 252, 0.4);
}
.padding-style{
  padding:0 21px;
  box-sizing: border-box;
}
.pop-item-top{
  height:189px;
}
.pop-item-top-title{
  height:38px;
  line-height:38px;
  color:#fff;
  font-weight: bold;
  font-size:18px;
  background:rgba(32, 42, 70, 0.66);
}
.pop-item-top-title img{
  width:19px;
  height:12px;
  margin-right:10px;
}
  .pop-item-top-context{
    margin-top:25px;
    color:#fff;
    font-size: 14px;
  }
.pop-item-top-context>div{
  margin-bottom:15px;
  line-height:1;
}
  .pop-item-center{
    height:35px;
    line-height:35px;
    color:#fff;
    font-size:14px;
    margin-top:5px;
  }
.pop-item-center>span:last-child{
  float: right;
}
  .pop-item-bottom{
    display:flex;
    justify-content: space-between;
    height:80px;
    margin-top:5px;
  }
  .pop-item-bottom-title{
    width:132px;
    display: flex;
    justify-content: space-between;
    height:80px;
    line-height:80px;
    color:#fff;
    font-size:18px;
  }
  .pop-item-tip{
    width:48px;
    font-size:12px;
    color:#08e6df;
    position:relative;
  }
  .pop-item-tip>span{
    position:absolute;
    bottom:10px;
    cursor: pointer;
  }
  .pop-item-icon{
    width:50px;
    height:50px;
    margin:auto 0;
    background:rgba(78, 109, 196, 0.15);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pop-item-number{
    font-size:24px;
  }
  .unhandle{
    color: rgba(8, 230, 223, 0.2);
    cursor: default !important;
  }
  .semicircle {
    width:32px;
    height:64px;
    border-radius: 32px 0 0 32px;
    background:#343a6f;
    position:absolute;
    top:50%;
    right:0;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .triangle{
    display:inline-block;
    width: 0;
    height: 0;
    border: 9px solid transparent;
    border-left-color: #fff;
    position: absolute;
    top:50%;
    left:50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
</style>
