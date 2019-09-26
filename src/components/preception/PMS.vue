<template>
  <div class="container">
    <div class="header-top">
      <div>
        站点名称：<el-input class="input" placeholder="请输入" v-model="acsname"></el-input>
      </div>
      <div>
        传感器编号：<el-input class="input" placeholder="请输入" v-model="sensorCode"></el-input>
      </div>
      <div>
        电力设备名称：<el-input class="input" placeholder="请输入" v-model="deviceName"></el-input>
      </div>
      <div>
        节点编号：<el-input class="input" placeholder="请输入" v-model="nodeCode"></el-input>
        <el-button type="primary" @click="search" style="margin-left:10px;">搜索</el-button>
      </div>
    </div>
    <div class="children">
      <el-table
        :data="sensorList"
        :max-height="height"
        style="width:100%;"
        border>
        <el-table-column
          type="index"
          :index="indexMethod"
          width="50"
          align="center"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="ACSNAME"
          label="站点">
        </el-table-column>
        <el-table-column
          prop="SENSORCODE"
          width="120"
          label="编号">
          <template slot-scope="scope">
            <el-button type="text" @click="check(scope.row)">
              {{scope.row.SENSORCODE}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="SENSORTYPENAME"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="SENSORUNITTYPE"
          width="120"
          label="型号">
        </el-table-column>
        <el-table-column
          prop="DEVICENAME"
          label="电力设备">
          <template slot-scope="scope">
            <el-button type="text" @click="check1(scope.row)">
              {{scope.row.DEVICENAME}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="LOCATION"
          label="具体位置">
        </el-table-column>
        <el-table-column
          prop="NODECODE"
          label="所属节点编号">
          <template slot-scope="scope">
            <el-button type="text" @click="check2(scope.row)">
              {{scope.row.NODECODE}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="AGSLOCATION"
          label="节点位置">
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
      <el-dialog
        title="传感器详情"
        :visible.sync="DialogVisible1"
        width="38%"
        center>
        <div class="dialog-bottom"><img src="../../assets/img/dialog_bg.png" alt=""></div>
        <el-row>
          <el-col :span="5" :offset="4" style="margin-top:10px;">
            传感器编号：
          </el-col>
          <el-col :span="11">
            <div class="dialog-line">{{sensor.SENSORCODE}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="5" :offset="4" style="margin-top:10px;">
            传感器类型：
          </el-col>
          <el-col :span="11">
            <div class="dialog-line">{{sensor.SENSORTYPENAME}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="5" :offset="4" style="margin-top:10px;">
            传感器型号：
          </el-col>
          <el-col :span="11">
            <div class="dialog-line">{{sensor.SENSORUNITTYPE}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="5" :offset="4" style="margin-top:10px;">
            厂家：
          </el-col>
          <el-col :span="11">
            <div class="dialog-line">{{sensor.SUPPLIER}}</div>
          </el-col>
        </el-row>
      </el-dialog>
      <el-dialog
        title="PMS台账详情"
        :visible.sync="DialogVisible2"
        width="38%"
        center>
        <div class="dialog-bottom"><img src="../../assets/img/dialog_bg.png" alt=""></div>
        <el-row>
          <el-col :span="4" :offset="5" style="margin-top:10px;">
            站点：
          </el-col>
          <el-col :span="10">
            <div class="dialog-line">{{devices.ACSNAME}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" :offset="5" style="margin-top:10px;">
            电力设备名称：
          </el-col>
          <el-col :span="10">
            <div class="dialog-line">{{devices.DEVICENAME}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="4" :offset="5" style="margin-top:10px;">
            设备编号：
          </el-col>
          <el-col :span="10">
            <div class="dialog-line">{{devices.DEVICECODE}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="4" :offset="5" style="margin-top:10px;">
            设备类型：
          </el-col>
          <el-col :span="10">
            <div class="dialog-line">{{devices.DEVICETYPENAME}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="4" :offset="5" style="margin-top:10px;">
            类型编号：
          </el-col>
          <el-col :span="10">
            <div class="dialog-line">{{devices.DEVICETYPECODE}}</div>
          </el-col>
        </el-row>
      </el-dialog>
      <el-dialog
        title="汇聚节点详情"
        :visible.sync="DialogVisible3"
        width="38%"
        center>
        <div class="dialog-bottom"><img src="../../assets/img/dialog_bg.png" alt=""></div>
        <el-row>
          <el-col :span="4" :offset="5" style="margin-top:10px;">
            站点：
          </el-col>
          <el-col :span="10">
            <div class="dialog-line">{{node.ACSNAME}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" :offset="5" style="margin-top:10px;">
            编号：
          </el-col>
          <el-col :span="10">
            <div class="dialog-line">{{node.CODE}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="4" :offset="5" style="margin-top:10px;">
            型号：
          </el-col>
          <el-col :span="10">
            <div class="dialog-line">{{node.UNITTYPE}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="4" :offset="5" style="margin-top:10px;">
            厂家：
          </el-col>
          <el-col :span="10">
            <div class="dialog-line">{{node.SUPPLIER}}</div>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import mylib from '../../mylib'
export default {
  name: 'home',
  data () {
    return {
      DialogVisible1: false,
      DialogVisible2: false,
      DialogVisible3: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      sensorList: [],
      height: null,
      sensor: {},
      devices: {},
      node: {},
      acsname: '',
      sensorCode: '',
      deviceName: '',
      nodeCode: ''
    }
  },
  methods: {
    indexMethod (index) {
      return (index + 1) + (this.currentPage - 1) * this.pageSize
    },
    check (row) {
      mylib.axios({
        url: '/app/general/querySensor',
        type: 'get',
        params: {
          sensorCode: row.SENSORCODE
        },
        done (res) {
          if (res.code === 0) {
            this.DialogVisible1 = true
            this.sensor = res.sensor
          } else {
            this.$message.error(res.msg)
          }
        }
      }, this)
    },
    check1 (row) {
      mylib.axios({
        url: '/app/general/queryDevice',
        type: 'get',
        params: {
          deviceCode: row.DEVICECODE
        },
        done (res) {
          if (res.code === 0) {
            this.DialogVisible2 = true
            this.devices = res.device
          } else {
            this.$message.error(res.msg)
          }
        }
      }, this)
    },
    check2 (row) {
      mylib.axios({
        url: '/app/general/queryAgsnode',
        type: 'get',
        params: {
          nodeCode: row.NODECODE
        },
        done (res) {
          if (res.code === 0) {
            this.DialogVisible3 = true
            this.node = res.agsnode
          } else {
            this.$message.error(res.msg)
          }
        }
      }, this)
    },
    search () {
      this.getSensor()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getSensor()
    },
    getSensor () {
      mylib.axios({
        url: '/app/general/list',
        type: 'post',
        params: {
          acsname: this.acsname,
          sensorCode: this.sensorCode,
          deviceName: this.deviceName,
          nodeCode: this.nodeCode,
          page: this.currentPage,
          limit: this.pageSize
        },
        done (res) {
          if (res.code === 0) {
            this.sensorList = res.general
            this.total = res.total
          }
        }
      }, this)
    },
    handleCurrentChange () {
      this.getSensor()
    }
  },
  created () {
    this.height = document.documentElement.clientHeight - 250
    this.getSensor()
  },
  mounted () {

  }
}
</script>

<style scoped>
  .dialog-line{
    height:40px;
    line-height:40px;
  }
  @media screen and (max-width: 1366px) {
    .header-top>div{margin-right:20px;}
    .input{width:110px;}
  }
  .dialog-bottom{
    width:calc(100% - 25px);
    position:absolute;
    bottom:0;
    text-align:right;
  }
  .dialog-bottom img{
    width:280px;
    height:185px;
  }
</style>
