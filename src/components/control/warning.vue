<template>
  <div class="container">
    <div class="header-top">
      <div>
        传感器编号：<el-input class="input" placeholder="请输入" v-model="code"></el-input>
      </div>
      <div>
        设备名称：<el-input class="input" placeholder="请输入" v-model="device"></el-input>
      </div>
      <div>
        事件状态：
        <el-select v-model="status" class="input" clearable>
          <el-option value="1" label="上报中"></el-option>
          <el-option value="0" label="已关闭"></el-option>
        </el-select>
        <el-button type="primary" @click="search" style="margin-left:10px;">搜索</el-button>
      </div>
    </div>
    <div class="children">
      <el-table
        :data="WarnList"
        :max-height="height"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          align="center"
          :index="indexMethod"
          width="50"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="ACSNODENAME"
          width="170"
          label="站点">
        </el-table-column>
        <el-table-column
          prop="MAJORTYPE"
          width="100"
          label="告警类型">
          <template slot-scope="scope">
            <span v-if="scope.row.MAJORTYPE == 0">协议告警</span>
            <span v-if="scope.row.MAJORTYPE == 1">设备告警</span>
            <span v-if="scope.row.MAJORTYPE == 2">APP告警</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="SENSORCODE"
          width="110"
          label="传感器编号">
        </el-table-column>
        <el-table-column
          prop="SENSORTYPENAME"
          label="传感器类型">
        </el-table-column>
        <el-table-column
          prop="DEVICENAME"
          label="设备名称">
        </el-table-column>
        <el-table-column
          prop="GRADE"
          width="70"
          label="严重性">
        </el-table-column>
        <el-table-column
          prop="ALARM"
          width="70"
          label="告警值">
        </el-table-column>
        <el-table-column
          width="70"
          prop="THRESOLD"
          label="阈值">
        </el-table-column>
        <el-table-column
          prop="REPORTTIME"
          width="140"
          label="上报时间">
        </el-table-column>
        <el-table-column
          prop="STATUS"
          width="90"
          label="事件状态">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.STATUS == 1" @click="change(scope.row)">上报中</el-button>
            <span v-if="scope.row.STATUS == 0">已关闭</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="USERCODE"
          width="90"
          label="处理人">
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
      WarnList: [],
      device: '',
      code: '',
      status: '',
      height: null
    }
  },
  methods: {
    indexMethod (index) {
      return (index + 1) + (this.currentPage - 1) * this.pageSize
    },
    search () {
      this.getWarn()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getWarn()
    },
    change (row) {
      this.$confirm('确定将该告警关闭?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancel',
        type: 'warning'
      }).then(() => {
        mylib.axios({
          url: '/app/alarm/update',
          type: 'put',
          params: {
            id: row.id,
            status: '0'
          },
          done (res) {
            if (res.code === 0) {
              this.$message.success('修改成功')
              this.getWarn()
            }
          }
        }, this)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    getWarn () {
      mylib.axios({
        url: '/app/actual/queryAlarm',
        type: 'post',
        params: {
          page: this.currentPage,
          limit: this.pageSize,
          sensorCode: this.code,
          deviceName: this.device,
          status: this.status
        },
        done (res) {
          if (res.code === 0) {
            this.WarnList = res.alarmlist
            this.total = res.total
          }
        }
      }, this)
    },
    handleCurrentChange () {
      this.getWarn()
    }
  },
  created () {
    this.height = document.documentElement.clientHeight - 250
    this.getWarn()
  },
  mounted () {

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
