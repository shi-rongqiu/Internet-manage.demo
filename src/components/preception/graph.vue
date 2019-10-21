<template>
  <div class="container">
    <div class="header-top">
      <div>
        站点名称：<el-input class="input" placeholder="请输入" v-model="keyword"></el-input>
      </div>
      <div>
        编号：<el-input class="input" placeholder="请输入" v-model="code"></el-input>
        <el-button type="primary" @click="search" style="margin-left:10px;">搜索</el-button>
      </div>
    </div>
    <div class="children">
      <div class="operate" v-if="activeName == 2">
        <div @click="add" class="btn">
          <div><img src="../../assets/img/add-icon.png" alt=""></div>
          <div>新增</div>
        </div>
      </div>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="传感器列表" name="1">
          <el-table
            :data="sensorList"
            :max-height="height"
            style="width:100%;margin-top:10px;"
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
              width="130"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="SENSORTYPENAME"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="SENSORUNITTYPE"
              width="130"
              label="型号">
            </el-table-column>
            <el-table-column
              prop="SUPPLIER"
              label="厂家">
            </el-table-column>
            <el-table-column
              prop="MARK"
              label="备注">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="PMS台账" name="2">
<!--          <div class="operate">-->
<!--            <div @click="add" class="btn">-->
<!--              <div><img src="../../assets/img/add-icon.png" alt=""></div>-->
<!--              <div>新增</div>-->
<!--            </div>-->
<!--          </div>-->
          <el-table
            :data="PIMList"
            border
            :max-height="height"
            style="width: 100%;margin-top:10px;">
            <el-table-column
              type="index"
              :index="indexMethod"
              width="70"
              align="center"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="ACSNAME"
              label="站点">
            </el-table-column>
            <el-table-column
              prop="DEVICENAME"
              label="电力设备名称">
            </el-table-column>
            <el-table-column
              prop="DEVICECODE"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="DEVICETYPENAME"
              label="电力设备类型">
            </el-table-column>
            <el-table-column
              prop="DEVICETYPECODE"
              label="类型编号">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="edit(scope.row.ID)">
                  修改
                </el-button>
                <el-button type="text" @click="del(scope.row.ID)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="汇聚节点表" name="3">
          <el-table
            :data="pointList"
            border
            :max-height="height"
            style="width: 100%;margin-top:10px;">
            <el-table-column
              type="index"
              :index="indexMethod"
              width="70"
              align="center"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="ACSNAME"
              label="站点">
            </el-table-column>
            <el-table-column
              prop="CODE"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="AGSNAME"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="UNITTYPE"
              label="型号">
            </el-table-column>
            <el-table-column
              prop="SUPPLIER"
              label="厂家">
            </el-table-column>
            <el-table-column
              prop="LOCATION"
              label="安装位置">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
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
        :title="title"
        :visible.sync="DialogVisible1"
        width="38%"
        center>
        <el-row>
          <el-col :span="6" :offset="4" class="item-cell">
            电力设备名称：
          </el-col>
          <el-col :span="10">
            <el-input placeholder="请输入" v-model="deviceName"></el-input>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="6" :offset="4" class="item-cell">
            电力设备编号：
          </el-col>
          <el-col :span="10">
            <el-input placeholder="请输入" v-model="deviceCode"></el-input>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="6" :offset="4" class="item-cell">
            电力设备类型：
          </el-col>
          <el-col :span="10">
            <el-input placeholder="请输入" v-model="deviceType"></el-input>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="6" :offset="4" class="item-cell">
            类型编号：
          </el-col>
          <el-col :span="10">
            <el-input placeholder="请输入" v-model="typeCode"></el-input>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="6" :offset="4" class="item-cell">
            站点：
          </el-col>
          <el-col :span="10">
            <el-select v-model="site">
              <el-option v-for="(item, index) in sites" :key="index" :value="item.code" :label="item.name"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer notable">
          <el-button type="primary" @click="savePoint">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import mylib from '../../mylib'
export default {
  name: 'node',
  data () {
    return {
      activeName: '1',
      title: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pointList: [],
      keyword: '',
      code: '',
      DialogVisible1: false,
      deviceName: '',
      deviceCode: '',
      deviceId: '',
      deviceType: '',
      typeCode: '',
      height: null,
      PIMList: [],
      sensorList: [],
      site: '',
      sites: []
    }
  },
  methods: {
    indexMethod (index) {
      return (index + 1) + (this.currentPage - 1) * this.pageSize
    },
    handleClick () {
      this.currentPage = 1
      this.total = 0
      this.pageSize = 10
      this.keyword = ''
      this.code = ''
      if (this.activeName === '1') {
        this.getSensor()
      } else if (this.activeName === '2') {
        this.getPIM()
      } else {
        this.getPoint()
      }
    },
    add () {
      this.title = '新增'
      this.DialogVisible1 = true
      this.deviceId = ''
      this.deviceName = ''
      this.deviceCode = ''
      this.deviceType = ''
      this.typeCode = ''
      this.site = ''
      this.getSite()
    },
    search () {
      if (this.activeName === '1') {
        this.getSensor()
      } else if (this.activeName === '2') {
        this.getPIM()
      } else {
        this.getPoint()
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      if (this.activeName === '1') {
        this.getSensor()
      } else if (this.activeName === '2') {
        this.getPIM()
      } else {
        this.getPoint()
      }
    },
    getPoint () {
      mylib.axios({
        url: '/app/sub/queryAgsnode',
        type: 'post',
        params: {
          acsname: this.keyword,
          code: this.code,
          page: this.currentPage,
          limit: this.pageSize
        },
        done (res) {
          this.pointList = res.agsnode
          this.total = res.total
        }
      }, this)
    },
    edit (id) {
      this.title = '修改'
      this.deviceId = id
      this.deviceName = ''
      this.deviceCode = ''
      this.deviceType = ''
      this.typeCode = ''
      this.site = ''
      this.DialogVisible1 = true
      mylib.axios({
        url: '/app/sub/info/' + id,
        type: 'get',
        done (res) {
          if (res.code === 0) {
            this.deviceName = res.device.devicename
            this.deviceCode = res.device.devicecode
            this.deviceType = res.device.devicetypename
            this.typeCode = res.device.devicetypecode
            this.site = res.device.acsnodecode
          } else {
            this.$message(res.msg)
          }
        }
      }, this)
    },
    savePoint () {
      if (this.deviceId) {
        mylib.axios({
          url: '/app/sub/update',
          params: {
            id: this.deviceId,
            devicename: this.deviceName,
            devicecode: this.deviceCode,
            devicetypename: this.deviceType,
            devicetypecode: this.typeCode,
            acsnodecode: this.site
          },
          type: 'put',
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          },
          done (res) {
            if (res.code === 0) {
              this.$message.success('修改成功')
              this.DialogVisible1 = false
              this.getPIM()
            } else {
              this.$message.error(res.msg)
            }
          }
        }, this)
      } else {
        mylib.axios({
          url: '/app/sub/save',
          params: {
            devicename: this.deviceName,
            devicecode: this.deviceCode,
            devicetypename: this.deviceType,
            devicetypecode: this.typeCode,
            acsnodecode: this.site
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          },
          type: 'post',
          done (res) {
            if (res.code === 0) {
              this.$message.success('添加成功')
              this.DialogVisible1 = false
              this.getPIM()
            } else {
              this.$message.error(res.msg)
            }
          }
        }, this)
      }
    },
    getPIM () {
      mylib.axios({
        url: '/app/sub/queryDevice',
        type: 'post',
        params: {
          acsname: this.keyword,
          devicecode: this.code,
          page: this.currentPage,
          limit: this.pageSize
        },
        done (res) {
          if (res.code === 0) {
            this.PIMList = res.device
            this.total = res.total
          }
        }
      }, this)
    },
    getSensor () {
      mylib.axios({
        url: '/app/sub/querySensor',
        type: 'post',
        params: {
          acsname: this.keyword,
          sensorCode: this.code,
          page: this.currentPage,
          limit: this.pageSize
        },
        done (res) {
          if (res.code === 0) {
            this.sensorList = res.sensor
            this.total = res.total
          }
        }
      }, this)
    },
    handleCurrentChange () {
      if (this.activeName === '1') {
        this.getSensor()
      } else if (this.activeName === '2') {
        this.getPIM()
      } else {
        this.getPoint()
      }
    },
    del (id) {
      this.$confirm('确定删除此信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancel',
        type: 'warning'
      }).then(() => {
        mylib.axios({
          url: '/app/sub/delete',
          type: 'post',
          params: {
            id: id
          },
          done (res) {
            if (res.code === 0) {
              this.$message.success('删除成功')
              this.getPIM()
            } else {
              this.$message({
                type: 'error',
                message: '删除出错!'
              })
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
    getSite () {
      mylib.axios({
        url: '/app/acsnode/list',
        type: 'post',
        params: {
          status: 1
        },
        done (res) {
          this.sites = res.rows
        }
      }, this)
    }
  },
  created () {
    this.height = document.documentElement.clientHeight - 290
    this.getSensor()
  },
  mounted () {

  }
}
</script>

<style scoped>
  .children{
    position:relative;
  }
  .operate{
    position:absolute;
    top:10px;
    right:15px;
    z-index:22;
  }
  .item{
    margin-top:20px;
  }
  .item-cell{
    margin-top:5px;
  }
</style>
