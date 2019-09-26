<template>
  <div class="back tree">
    <div class="header-search">
      <div class="total-number">
        <div>
          <span class="top-img"><img src="../../assets/img/device-icon.png" alt=""></span>
          电力设备
          <span class="total-data" style="margin-left:8px;">{{deviceNum}}</span>
        </div>
        <div>
          <span class="top-img"><img src="../../assets/img/sensor-icon.png" alt=""></span>
          传感器
          <span class="time-data">{{sensorOnlineNum}}</span><span class="total-data">/{{sensorNum}}</span>
        </div>
        <div>
          <span class="top-img"><img src="../../assets/img/point-icon.png" alt=""></span>
          节点数
          <span class="total-data" style="margin-left:8px;">{{agsNodenum}}</span>
        </div>
      </div>
    </div>
    <div style="position:relative;">
      <div class="tip">
        <span><span class="online"></span> 在线</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span><span class="underline"></span> 离线</span>
      </div>
      <chart v-if="data.length > 0" id="chart1" :options="myChart" @click="clickFun" class="mychart"></chart>
      <div class="click-table" v-if="data.length > 0">
        <div class="table-title">展开列表
          <span class="el-icon-close close"></span>
        </div>
        <div style="margin: 20px 10px;">
          <el-table
            :data="sensorList"
            border
            style="width:100%;">
            <el-table-column
              type="index"
              :index="indexMethod"
              width="50"
              align="center"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="sensorCode"
              align="center"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="deviceName"
              align="center"
              label="安装设备">
            </el-table-column>
            <el-table-column
              prop="location"
              align="center"
              label="安装位置">
            </el-table-column>
            <el-table-column
              prop="isOnline"
              align="center"
              width="60"
              label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.isOnline == 1">在线</span>
                <span style="color:#ffa000;" v-if="scope.row.isOnline == 0">离线</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
import 'echarts/lib/chart/tree'
import mylib from '../../mylib'
export default {
  data () {
    return {
      myChart: null,
      value: 0,
      level: 0,
      parentArr: [0],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      sensorList: [
        {name: '石家庄220kV子龙站(GIS)', deviceName: '10v开关',sensorUnitType: 'IRW',sensorCode: '509275', location: '保险柜', isOnline: 1},
        {name: '石家庄220kV子龙站(GIS)', deviceName: '10v开关',sensorUnitType: 'IRW',sensorCode: '509276', location: '保险柜', isOnline: 0},
        {name: '石家庄220kV子龙站(GIS)', deviceName: '10v开关',sensorUnitType: 'IRW',sensorCode: '509286', location: '保险柜', isOnline: 1},
        {name: '石家庄220kV子龙站(GIS)', deviceName: '10v开关',sensorUnitType: 'IRW',sensorCode: '509273', location: '保险柜', isOnline: 0},
        {name: '石家庄220kV子龙站(GIS)', deviceName: '10v开关',sensorUnitType: 'IRW',sensorCode: '509277', location: '保险柜', isOnline: 1},
        {name: '石家庄220kV子龙站(GIS)', deviceName: '10v开关',sensorUnitType: 'IRW',sensorCode: '509279', location: '保险柜', isOnline: 0},
        {name: '石家庄220kV子龙站(GIS)', deviceName: '10v开关',sensorUnitType: 'IRW',sensorCode: '509210', location: '保险柜', isOnline: 1},
        {name: '石家庄220kV子龙站(GIS)', deviceName: '10v开关',sensorUnitType: 'IRW',sensorCode: '509220', location: '保险柜', isOnline: 0},
        {name: '石家庄220kV子龙站(GIS)', deviceName: '10v开关',sensorUnitType: 'IRW',sensorCode: '509233', location: '保险柜', isOnline: 1},
        {name: '石家庄220kV子龙站(GIS)', deviceName: '10v开关',sensorUnitType: 'IRW',sensorCode: '509245', location: '保险柜', isOnline: 0}
      ],
      deviceNum: '',
      sensorNum: '',
      sensorOnlineNum: '',
      agsNodenum: '',
      type: '',
      sensorCode: '',
      data: []
    }
  },
  methods: {
    indexMethod (index) {
      return (index + 1) + (this.currentPage - 1) * this.pageSize
    },
    getSensor () {
      mylib.axios({
        url: '/app/sensor/list',
        type: 'post',
        params: {
          sensorType: this.type,
          nodeCode: this.sensorCode,
          page: this.currentPage,
          limit: this.pageSize
        },
        done (res) {
          if (res.code === 0) {
            this.sensorList = res.rows
            this.total = res.total
          }
        }
      }, this)
    },
    handleCurrentChange () {
      this.getSensor()
    },
    changeTree (data, num) {
      var indexOne = ''
      var indexValue = ''
      data.children.forEach((al, ind) => {
        al.name = al.nodename
        // if (cl.status === '0') {
        //   cl.lineStyle = {
        //     type: 'dashed'
        //   }
        // }
        // if (cl.children){
        //   cl.children.forEach((al) => {
            if (al.status === '0') {
              al.lineStyle = {
                type: 'dashed'
              }
            }
            if (al.children && al.children.length > 0){
              al.children.forEach((bl, index) => {
                bl.name = bl.nodename
                if (bl.status === '0') {
                  bl.lineStyle = {
                    type: 'dashed'
                  }
                }
                if (bl.children && bl.children.length > 0) {
                  if (indexOne === '') {
                    indexOne = ind
                  }
                  if (indexValue === '') {
                    indexValue = index
                  }
                  bl.children.forEach((el) => {
                    if (!num) {
                      el.name = el.SENSORTYPENAME + ' ' + el.NUM + '/' + 0
                    }
                    el.itemStyle = {
                      color: '#0069ac'
                    }
                    el.label = {
                      color: '#0069ac'
                    }
                  })
                  if (!num) {
                    data.children[indexOne].children[indexValue].children[0].itemStyle = {
                      color: '#ed9b12'
                    }
                    this.type = data.children[indexOne].children[indexValue].children[0].SENSORTYPE
                    // this.sensorCode = al.children[indexValue].children[0].nodeCode
                  }
                }
              })
            }
        //   })
        // }
      })
      if (num) {
        var arr = num.split(',')
        data.children[arr[1]].children[arr[2]].children[arr[3]].itemStyle = {
          color: '#ed9b12'
        }
      }
      if (this.sensorCode) {
        this.getSensor()
      }
    },
    /*
    data  数据
    index 下标
    parent 父级
    * */
    initData (data, ind) {
      if (data.children && data.children.length > 0) {
        data.children.forEach((el, index) => {
          var level = ind + ',' + index
          el.level = level
          return this.initData(el, level)
        })
      }
    },
    clickFun (params) {
      var index = params.data.level
      this.type = params.data.SENSORTYPE
      this.sensorCode = params.data.nodeCode
      this.changeTree(this.data[0],index)
      this.initTree()
    },
    initTree () {
      this.myChart = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            name: 'tree',
            data: this.data,
            roam: 'scale',
            top: '30px',
            left: '8%',
            bottom: '10%',
            right: '40%',

            label: {
              normal: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right'
              }
            },

            leaves: {
              label: {
                normal: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left'
                }
              }
            },
            symbol: 'circle',
            symbolSize: 18,
            itemStyle: {
              color: '#0069ac',
              borderWidth: 0
            },
            lineStyle: {
              color: '#0069ac'
            },

            expandAndCollapse: false,

            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      }
    },
    getData () {
      mylib.axios({
        url: '/app/visual/topology',
        type: 'get',
        done (res) {
          if (res.code === 0) {
            this.deviceNum = res.deviceNum
            this.sensorNum = res.sensorNum
            this.sensorOnlineNum = res.sensorOnlineNum
            this.agsNodenum = res.agsNodenum
            var arr = [{
              name: '平台',
              children: res.rows
            }]
            this.data = arr
            if (this.data.length > 0) {
              this.data[0].level = 0
              this.initData(this.data[0], '0')
              this.changeTree(this.data[0])
              this.initTree()
            }
          }
        }
      }, this)
    }
  },
  mounted () {
    this.getData()
    // this.data = [{
    //   "name": "平台",
    //   "children": [
    //     {
    //       "name": "石家庄220kV子龙站(GIS)",
    //       "children": [
    //         {
    //           "name": "汇聚节点",
    //           "children": [
    //             {"name": "温度传感器", "value": 10, sensorType: '温度传感器', nodeCode: '123'}
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       "name": "保定110kV下河西站(AIS)",
    //       "children": [
    //         {
    //           "name": "汇聚节点",
    //           "children": [
    //             {"name": "温度传感器", "value": 10, sensorType: '温度传感器', nodeCode: '124'}
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // }]
    // this.data[0].level = 0
    // this.initData(this.data[0], '0')
    // this.changeTree(this.data[0])
    // this.initTree()
  },
  created () {
  }
}
</script>
<style scoped>
  .tree{
    min-height:100%;
    box-sizing: border-box;
  }
  .header-search{padding:15px;}
  .top-img{margin-right:7px;float:left;}
  .top-img img{
    width:23px;height:23px;
  }
  .total-number{font-size:14px;display:flex;}
  .total-number>div{margin-right:60px;}
  .online{
    display:inline-block;
    width:20px;
    height:0;
    overflow:hidden;
    border-bottom:2px solid #0069ac;
    margin-bottom:5px;
  }
  .underline{
    display:inline-block;
    width:20px;
    height:0;
    overflow:hidden;
    border-bottom:2px dashed #0069ac;
    margin-bottom:5px;
  }
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
  .click-table{
    position: absolute;
    width:470px;
    top:20px;
    left: 58%;
    box-shadow:0 0 30px #eee;
  }
  .table-title{
    width:100%;
    height:50px;
    line-height:50px;
    color:#fff;
    background: linear-gradient(to right, #6150B6 , #333971);
    text-align:center;
    font-size:18px;
  }
  .close{
    float:right;
    margin-right:20px;
    font-size:24px;
    margin-top:15px;
  }
  .tip{
    padding-left:20px;font-size:14px;
  }
  .el-pagination{
    text-align:right;
    margin-bottom:20px;
  }
  .mychart{
    width:60%;height:800px;margin-left:15px;
  }
</style>
