<template>
  <div class="container">
    <div class="header-top">
      <div>
        站点名称：<el-input style="width:250px;" placeholder="请输入" v-model="name"></el-input>
      </div>
      <div>
        节点编号：<el-input style="width:250px;" placeholder="全部" v-model="code"></el-input>
        <el-button type="primary" @click="search" style="margin-left:10px;">搜索</el-button>
        <el-button type="primary" @click="refresh" style="margin-left:30px;">刷新</el-button>
      </div>
    </div>
    <div class="children">
      <div class="operate">
        <div @click="add" class="btn">
          <div><img src="../../assets/img/add-icon.png" alt=""></div>
          <div>新增</div>
        </div>
      </div>
      <el-table
        :max-height="height"
        :data="pointList"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          :index="indexMethod"
          width="90"
          align="center"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="站点名称">
          <template slot-scope="scope">
            <el-button type="text" @click="jump(scope.row)">{{scope.row.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="url"
          align="center"
          label="节点IP地址">
        </el-table-column>
        <el-table-column
          prop="code"
          align="center"
          label="节点编号">
        </el-table-column>
        <el-table-column
          prop="createTime"
          align="center"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="status"
          width="120"
          align="center"
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">在线</span>
            <span style="color:#ffa000;" v-if="scope.row.status == 0">下线</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="120"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="text" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="title"
        :visible.sync="DialogVisible"
        width="38%"
        center>
        <el-row>
          <el-col :span="6" :offset="4" class="item-cell">
            站点名称
          </el-col>
          <el-col :span="10">
            <el-input type="text" v-model="nodeName"></el-input>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="6" :offset="4" class="item-cell">
            节点IP地址
          </el-col>
          <el-col :span="10" class="dia">
            <el-input placeholder="请输入内容" v-model="nodeIP">
              <template slot="prepend">Http://</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="6" :offset="4" class="item-cell">
            节点编号
          </el-col>
          <el-col :span="10">
            <el-input type="text" v-model="nodeCode"></el-input>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="6" :offset="4" class="item-cell">
            状态
          </el-col>
          <el-col :span="10">
            <el-select v-model="status" placeholder="请选择">
              <el-option label="上线" :value="1">
              </el-option>
              <el-option label="下线" :value="0">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer notable">
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </el-dialog>
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
// import axios from 'axios'
export default {
  name: 'home',
  data () {
    return {
      DialogVisible: false,
      title: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pointList: [
        {name: '石家庄220kV子龙站(GIS)', url: '192.168.0.111',unitType: '汇聚节点',code: '509275', sensorTypeName: '温度传感器', nodeCode: '12313265465',supplier: '英锐祺',status: 1,alarm: 1,location: '保险柜',alarmnum: 1,createTime: '2019-3-9'},
        {name: '保定110kV下河西站(AIS)', url: '192.168.0.112',unitType: '汇聚节点',code: '509275', sensorTypeName: '温度传感器', nodeCode: '12313265465',supplier: '英锐祺',status: 1,alarm: 1,location: '保险柜',alarmnum: 1,createTime: '2019-3-9'}
      ],
      name: '',
      code: '',
      action: 'http://localhost:8081/api/app/agsNode/leader',
      nodeName: '',
      nodeIP: '',
      nodeCode: '',
      supplier: '',
      id: '',
      status: '',
      height: null
    }
  },
  methods: {
    jump (row) {
      // axios['post']('http://192.168.0.111/app/log',)
      //   .then ((response) => {
      //     if (response.data.code === 0) {
      //       window.open('http://' + row.url)
      //     } else {
      //       this.$message.error(response.data.msg)
      //     }
      //   })
      mylib.axios({
        url: '/app/log',
        type: 'post',
        done (res) {
          if (res.code === 0) {
            window.open('http://' + row.url)
          } else {
            this.$message.error(res.msg)
          }
        }
      }, this)
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getPoint()
    },
    indexMethod (index) {
      return (index + 1) + (this.currentPage - 1) * this.pageSize
    },
    add () {
      this.title = '新增'
      this.DialogVisible = true
      this.nodeName = ''
      this.nodeIP = ''
      this.nodeCode = ''
      this.supplier = ''
      this.status = ''
      this.id = ''
    },
    edit (id) {
      this.title = '修改'
      this.id = id
      this.DialogVisible = true
      this.getData()
    },
    search () {
      this.getPoint()
    },
    refresh () {
      this.name = ''
      this.code = ''
      this.currentPage = 1
      this.getPoint('1')
    },
    del (id) {
      this.$confirm('此操作将删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancel',
        type: 'warning'
      }).then(() => {
        mylib.axios({
          url: '/app/acsnode/delete',
          type: 'post',
          params: {
            id: id
          },
          done (res) {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getPoint()
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
          message: '已取消删除'
        })
      })
    },
    upload () {
      if (this.activeIndex === '1') {
      } else if (this.activeIndex === '2') {
      } else {
        this.getPoint()
      }
    },
    getPoint (type) {
      mylib.axios({
        url: '/app/acsnode/list',
        params: {
          page: this.currentPage,
          limit: this.pageSize,
          name: this.name,
          code: this.code
        },
        done (res) {
          this.pointList = res.rows
          this.total = res.total
          if (type === '1') {
            this.$message.success('刷新成功')
          }
        }
      }, this)
    },
    handleCurrentChange () {
      this.getPoint()
    },
    save () {
      if (this.nodeName === '') {
        return this.$message('站点名称为空')
      }
      if (this.nodeIP === '') {
        return this.$message('节点IP地址为空')
      }
      if (this.nodeCode === '') {
        return this.$message('节点编号为空')
      }
      if (this.status === '') {
        return this.$message('状态为空')
      }
      if (this.id) {
        mylib.axios({
          url: '/app/acsnode/update',
          type: 'put',
          params: {
            id: this.id,
            name: this.nodeName,
            url: this.nodeIP,
            code: this.nodeCode,
            status: this.status
          },
          done (res) {
            if (res.code === 0) {
              this.$message.success('修改成功！')
              this.getPoint()
              this.DialogVisible = false
            }
          }
        }, this)
      } else {
        mylib.axios({
          url: '/app/acsnode/save',
          type: 'post',
          params: {
            name: this.nodeName,
            url: this.nodeIP,
            code: this.nodeCode,
            status: this.status
          },
          done (res) {
            if (res.code === 0) {
              this.$message.success('保存成功！')
              this.getPoint()
              this.DialogVisible = false
            }
          }
        }, this)
      }
    },
    getData () {
      mylib.axios({
        url: '/app/acsnode/info/' + this.id,
        type: 'get',
        done (res) {
          if (res.code === 0) {
            this.nodeName = res.acsnode.name
            this.nodeIP = res.acsnode.url
            this.nodeCode = res.acsnode.code
            this.status = res.acsnode.status
          }
        }
      }, this)
    }
  },
  created () {
    this.height = document.documentElement.clientHeight - 290
    // this.getPoint()
  },
  mounted () {

  }
}
</script>

<style scoped>
  .item{
    margin-top:20px;
  }

  .upload-demo{float:left;margin:0 10px;}
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    border-bottom-color:#dcdfe6;
  }
  .el-tabs--border-card{
    border:0;
    box-shadow: 0 0 0 0;
  }
  .el-pagination{
    text-align:right;
    margin-top:30px;
  }
</style>
