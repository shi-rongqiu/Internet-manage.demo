<template>
  <div class="container">
    <div class="header-top">
      <div>
        传感器类型：
        <el-select v-model="type" class="input" clearable>
          <el-option v-for="(item, index) in types" :key="index" :value="item.sensorTypeCode" :label="item.sensorTypeName"></el-option>
        </el-select>
      </div>
      <div>
        传感器编号：<el-input class="input" placeholder="请输入" v-model="code"></el-input>
      </div>
      <div>
        设备名称：
        <el-input class="input" placeholder="请输入" v-model="device"></el-input>
        <el-button type="primary" @click="search" style="margin-left:10px;">搜索</el-button>
      </div>
    </div>
<!--    :span-method="objectSpanMethod"-->
    <div class="children">
      <el-table
        :data="list"
        :max-height="height"
        border
        style="width: 100%;">
        <el-table-column
          type="index"
          width="50"
          align="center"
          :index="indexMethod"
          label="序号">
        </el-table-column>
        <el-table-column
          width="170"
          prop="name"
          label="站点">
        </el-table-column>
        <el-table-column
          width="140"
          prop="deviceName"
          label="电力设备">
        </el-table-column>
        <el-table-column
          prop="sensorCode"
          width="120"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="sensorTypeName"
          label="类型">
        </el-table-column>
        <el-table-column
          width="90"
          prop="measurement"
          label="当前值">
        </el-table-column>
        <el-table-column
          prop="power"
          width="60"
          label="电量">
          <template slot-scope="scope">
            <span>{{scope.row.power}}%</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="location"
          label="安装位置">
        </el-table-column>
        <el-table-column
          width="60"
          prop="isOnline"
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.isOnline == 1">在线</span>
            <span style="color:#ffa000;" v-if="scope.row.isOnline == 0">离线</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="alarmnum"
          width="60"
          label="告警">
        </el-table-column>
        <el-table-column
          prop="reportTime"
          width="140"
          label="时间">
        </el-table-column>
        <el-table-column
          width="80"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="enterDetail(scope.row)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-footer">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="sizes, total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import mylib from '../../mylib'
export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      types: [],
      list: [
        {name: '石家庄220kV子龙站(GIS)', deviceName: '10v开关',sensorCode: '509275', sensorTypeName: '温度传感器', measurement: '20℃',power: 60,isOnline: 1,location: '保险柜',alarmnum: 1,reportTime: '2019-3-9'}
      ],
      type: '',
      code: '',
      device: '',
      spanArr: [],
      pos: 0,
      height: null
    }
  },
  methods: {
    indexMethod (index) {
      return (index + 1) + (this.currentPage - 1) * this.pageSize
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getList()
    },
    search () {
      this.getList()
    },
    enterDetail (row) {
      this.$router.push({path: '/control/detail', name: 'dataDetail', query: {device: row.deviceName, code: row.deviceCode}})
    },
    getTypes () {
      mylib.axios({
        url: '/app/sensor/querysensortype',
        type: 'post',
        done (res) {
          if (res.code === 0) {
            this.types = res.rows
          }
        }
      }, this)
    },
    getList () {
      mylib.axios({
        url: '/app/actual/querySensor',
        type: 'post',
        params: {
          page: this.currentPage,
          limit: this.pageSize,
          sensorType: this.type,
          sensorCode: this.code,
          deviceName: this.device
        },
        done (res) {
          if (res.code === 0) {
            this.list = res.sensorList
            this.spanArr = []
            for (var i = 0; i < this.list.length; i++) {
              if (i === 0) {
                this.spanArr.push(1)
                this.pos = 0
              } else {
                // 判断当前元素与上一个元素是否相同(第1和第2列)
                if (this.list[i].deviceCode === this.list[i - 1].deviceCode) {
                  this.spanArr[this.pos] += 1
                  this.spanArr.push(0)
                } else {
                  this.spanArr.push(1)
                  this.pos = i
                }
              }
            }
            this.total = res.total
          }
        }
      }, this)
    },
    handleCurrentChange () {
      this.getList()
    },
    // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 1 || columnIndex === 2 || columnIndex === 11) {
    //     const _row = this.spanArr[rowIndex]
    //     const _col = _row > 0 ? 1 : 0
    //     return {
    //       rowspan: _row,
    //       colspan: _col
    //     }
    //   }
    // }
  },
  mounted () {

  },
  created () {
    this.height = document.documentElement.clientHeight - 250
    // this.getList()
    this.getTypes()
  }
}
</script>

<style scoped>
  .upload-demo{float:left;margin:0 10px;}
  .dialog-line{
    height:40px;
    line-height:40px;
    padding-left: 20px;
    border:1px solid #d9d9d9;
  }

</style>
