<template>
  <div class="container">
    <div class="header-top">
      <div>
        站点名称：<el-input class="input" placeholder="请输入" v-model="keyword"></el-input>
      </div>
      <div>
        传感器编号：<el-input class="input" placeholder="请输入" v-model="code"></el-input>
        <el-button type="primary" @click="search" style="margin-left:10px;">搜索</el-button>
      </div>
    </div>
    <div class="children">
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
              prop="name"
              label="站点">
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
              prop="sensorUnitType"
              width="120"
              label="型号">
            </el-table-column>
            <el-table-column
              prop="supplier"
              label="厂家">
            </el-table-column>
            <el-table-column
              prop="mark"
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
              prop="name"
              label="站点">
            </el-table-column>
            <el-table-column
              prop="deviceName"
              label="电力设备名称">
            </el-table-column>
            <el-table-column
              prop="deviceCode"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="typeName"
              label="电力设备类型">
            </el-table-column>
            <el-table-column
              prop="typeCode"
              label="类型编号">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="edit(scope.row.id)">
                  修改
                </el-button>
                <el-button type="text" @click="add">
                  新增
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
              prop="name"
              label="站点">
            </el-table-column>
            <el-table-column
              prop="code"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="unitType"
              label="型号">
            </el-table-column>
            <el-table-column
              prop="supplier"
              label="厂家">
            </el-table-column>
            <el-table-column
              prop="location"
              label="安装位置">
            </el-table-column>
            <el-table-column
              prop="mark"
              label="备注">
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
            <el-input placeholder="请输入" v-model="typeCode"></el-input>
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
      pointList: [
        {name: '石家庄220kV子龙站(GIS)', deviceName: '10v开关',unitType: '汇聚节点',code: '509275', sensorTypeName: '温度传感器', nodeCode: '12313265465',supplier: '英锐祺',threshold: 1,alarm: 1,location: '保险柜',alarmnum: 1,reportTime: '2019-3-9'}
      ],
      keyword: '',
      code: '',
      action: mylib.URL + '/app/agsNode/leadexcel',
      DialogVisible1: false,
      deviceName: '',
      deviceCode: '',
      deviceId: '',
      deviceType: '',
      typeCode: '',
      height: null,
      PIMList: [
        {name: '石家庄220kV子龙站(GIS)', deviceName: '10v开关',typeName: '蓄电池组',typeCode: '509275', sensorTypeName: '温度传感器', deviceCode: '12313265465',supplier: '英锐祺',threshold: 1,alarm: 1,location: '保险柜',alarmnum: 1,reportTime: '2019-3-9'}
      ],
      sensorList: [
        {name: '石家庄220kV子龙站(GIS)', deviceName: '10v开关',sensorUnitType: 'IRW',sensorCode: '509275', sensorTypeName: '温度传感器', nodeCode: '12313265465',supplier: '英锐祺',threshold: 1,alarm: 1,location: '保险柜',alarmnum: 1,reportTime: '2019-3-9'}
      ]
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
        // this.getPIM()
      } else {
        // this.getPoint()
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
    },
    search () {
      if (this.activeName === '1') {
        this.getSensor()
      } else if (this.activeName === '2') {
        // this.getPIM()
      } else {
        // this.getPoint()
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      if (this.activeName === '1') {
        this.getSensor()
      } else if (this.activeName === '2') {
        // this.getPIM()
      } else {
        // this.getPoint()
      }
    },
    handleUpload (response, file, fileList) {
      if (response.code === 0) {
        this.$message.success(response.rows)
        // this.getPoint()
      } else {
        this.$message.error(response.msg)
      }
    },
    download () {
      window.location.href = mylib.URL + '/app/agsNode/exportExcel?token=token&location=' + this.keyword + '&code=' + this.code
    },
    // getPoint () {
    //   mylib.axios({
    //     url: '/app/sub/queryAgsnode',
    //     type: 'get',
    //     params: {
    //       location: this.keyword,
    //       code: this.code,
    //       page: this.currentPage,
    //       limit: this.pageSize
    //     },
    //     done (res) {
    //       this.pointList = res.rows
    //       this.total = res.total
    //     }
    //   }, this)
    // },
    edit (id) {
      this.title = '修改'
      this.deviceId = id
      this.DialogVisible1 = true
      mylib.axios({
        url: '/app/device/get',
        type: 'get',
        params: {
          id: id
        },
        done (res) {
          if (res.code === 0) {
            this.deviceName = res.data.deviceName
            this.deviceCode = res.data.deviceCode
            this.deviceType = res.data.typeName
            this.typeCode = res.data.typeCode
          } else {
            this.$message(res.msg)
          }
        }
      }, this)
    },
    savePoint () {
      if (this.deviceId) {
        mylib.axios({
          url: '/app/device/update',
          params: {
            id: this.deviceId,
            deviceName: this.deviceName,
            deviceCode: this.deviceCode,
            typeName: this.deviceType,
            typeCode: this.typeCode
          },
          type: 'put',
          done (res) {
            if (res.code === 0) {
              this.$message.success('修改成功')
              this.DialogVisible1 = false
              this.deviceName = ''
              this.deviceCode = ''
              // this.getPIM()
            } else {
              this.$message.error(res.msg)
            }
          }
        }, this)
      } else {
        mylib.axios({
          url: '/app/device/insert',
          params: {
            deviceName: this.deviceName,
            deviceCode: this.deviceCode,
            typeName: this.deviceType,
            typeCode: this.typeCode
          },
          type: 'post',
          done (res) {
            if (res.code === 0) {
              this.$message.success('添加成功')
              this.DialogVisible1 = false
              // this.getPIM()
            } else {
              this.$message.error(res.msg)
            }
          }
        }, this)
      }
    },
    // getPIM () {
    //   mylib.axios({
    //     url: '/app/sub/queryDevice',
    //     type: 'get',
    //     params: {
    //       keyword: this.keyword,
    //       deviceCode: this.code,
    //       page: this.currentPage,
    //       limit: this.pageSize
    //     },
    //     done (res) {
    //       if (res.code === 0) {
    //         this.PIMList = res.rows
    //         this.total = res.total
    //       }
    //     }
    //   }, this)
    // },
    getSensor () {
      mylib.axios({
        url: '/app/sub/querySensor',
        type: 'get',
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
      if (this.activeName === '1') {
        this.getSensor()
      } else if (this.activeName === '2') {
        // this.getPIM()
      } else {
        // this.getPoint()
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
          url: '/app/device/delete',
          type: 'post',
          params: {
            id: id
          },
          done (res) {
            if (res.code === 0) {
              this.$message.success('删除成功')
              // this.getPIM()
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
    }
  },
  created () {
    this.height = document.documentElement.clientHeight - 290
    // this.getSensor()
  },
  mounted () {

  }
}
</script>

<style scoped>
  .children-table{height:calc(100% - 50px);}
  .upload-demo{float:right;margin:0 10px;}
  .item{
    margin-top:20px;
  }
  .item-cell{
    margin-top:5px;
  }
</style>
