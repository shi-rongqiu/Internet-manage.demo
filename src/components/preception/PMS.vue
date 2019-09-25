<template>
  <div class="container">
    <div class="header-top">
      <div>
        站点名称：<el-input class="input" placeholder="请输入" v-model="keyword"></el-input>
      </div>
      <div>
        传感器编号：<el-input class="input" placeholder="请输入" v-model="keyword"></el-input>
      </div>
      <div>
        电力设备名称：<el-input class="input" placeholder="请输入" v-model="keyword"></el-input>
      </div>
      <div>
        节点编号：<el-input class="input" placeholder="请输入" v-model="code"></el-input>
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
          prop="name"
          label="站点">
        </el-table-column>
        <el-table-column
          prop="sensorCode"
          width="120"
          label="编号">
          <template slot-scope="scope">
            <el-button type="text" @click="check(scope.row)">
              {{scope.row.sensorCode}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="sensorTypeName"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="sensorUnitType"
          width="120"
          label="型号">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="电力设备">
          <template slot-scope="scope">
            <el-button type="text" @click="check1(scope.row)">
              {{scope.row.deviceName}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="location"
          label="具体位置">
        </el-table-column>
        <el-table-column
          prop="nodeCode"
          label="所属节点编号">
          <template slot-scope="scope">
            <el-button type="text" @click="check2(scope.row)">
              {{scope.row.nodeCode}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="location"
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
        title="传感器"
        :visible.sync="DialogVisible1"
        width="38%"
        center>
        <div class="dialog-bottom"><img src="../../assets/img/dialog_bg.png" alt=""></div>
        <el-row>
          <el-col :span="5" :offset="4" style="margin-top:10px;">
            传感器编号：
          </el-col>
          <el-col :span="11">
            <div class="dialog-line">{{sensor.sensorCode}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="5" :offset="4" style="margin-top:10px;">
            传感器类型：
          </el-col>
          <el-col :span="11">
            <div class="dialog-line">{{sensor.sensorTypeName}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="5" :offset="4" style="margin-top:10px;">
            传感器型号：
          </el-col>
          <el-col :span="11">
            <div class="dialog-line">{{sensor.sensorUnitType}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="5" :offset="4" style="margin-top:10px;">
            厂家：
          </el-col>
          <el-col :span="11">
            <div class="dialog-line">{{sensor.supplier}}</div>
          </el-col>
        </el-row>
      </el-dialog>
      <el-dialog
        title="电力设备"
        :visible.sync="DialogVisible2"
        width="38%"
        center>
        <div class="dialog-bottom"><img src="../../assets/img/dialog_bg.png" alt=""></div>
        <el-row>
          <el-col :span="4" :offset="5" style="margin-top:10px;">
            设备名称：
          </el-col>
          <el-col :span="10">
            <div class="dialog-line">{{devices.deviceName}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="4" :offset="5" style="margin-top:10px;">
            设备编号：
          </el-col>
          <el-col :span="10">
            <div class="dialog-line">{{devices.deviceCode}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="4" :offset="5" style="margin-top:10px;">
            设备类型：
          </el-col>
          <el-col :span="10">
            <div class="dialog-line">{{devices.typeName}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="4" :offset="5" style="margin-top:10px;">
            类型编号：
          </el-col>
          <el-col :span="10">
            <div class="dialog-line">{{devices.typeCode}}</div>
          </el-col>
        </el-row>
      </el-dialog>
      <el-dialog
        title="汇聚节点"
        :visible.sync="DialogVisible3"
        width="38%"
        center>
        <div class="dialog-bottom"><img src="../../assets/img/dialog_bg.png" alt=""></div>
        <el-row>
          <el-col :span="4" :offset="5" style="margin-top:10px;">
            节点编号：
          </el-col>
          <el-col :span="10">
            <div class="dialog-line">{{node.code}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="4" :offset="5" style="margin-top:10px;">
            节点类型：
          </el-col>
          <el-col :span="10">
            <div class="dialog-line">{{node.type == 0 ? 'client' : node.type == 1 ? 'relay' : ''}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="4" :offset="5" style="margin-top:10px;">
            节点型号：
          </el-col>
          <el-col :span="10">
            <div class="dialog-line">{{node.unitType}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="4" :offset="5" style="margin-top:10px;">
            安装位置：
          </el-col>
          <el-col :span="10">
            <div class="dialog-line">{{node.location}}</div>
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
      sensorList: [
        {name: '石家庄220kV子龙站(GIS)', deviceName: '10v开关',sensorUnitType: 'IRW',sensorCode: '509275', sensorTypeName: '温度传感器', nodeCode: '12313265465',grade: '严重',threshold: 1,alarm: 1,location: '保险柜',alarmnum: 1,reportTime: '2019-3-9'}
      ],
      keyword: '',
      code: '',
      height: null,
      sensor: {},
      devices: {},
      node: {}
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
          sensorCode: row.sensorCode
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
          deviceCode: row.deviceCode
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
          nodeCode: row.nodeCode
        },
        done (res) {
          if (res.code === 0) {
            this.DialogVisible3 = true
            this.node = res.agsNode
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
          keyword: this.keyword,
          sensorCode: this.code,
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
    }
  },
  created () {
    this.height = document.documentElement.clientHeight - 250
    // this.getSensor()
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
