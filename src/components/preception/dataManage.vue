<template>
  <div class="container">
    <div class="header-top">
      <div>
        传感器类型名称：<el-input class="input" placeholder="请输入" v-model="keyword"></el-input>
      </div>
      <div>
        状态：
        <el-select v-model="status" clearable>
          <el-option value="1" label="已上架"></el-option>
          <el-option value="0" label="下架中"></el-option>
        </el-select>
        <el-button type="primary" @click="search" style="margin-left:10px;">搜索</el-button>
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
        :data="tableData"
        border
        :max-height="height"
        style="width: 100%">
        <el-table-column
          type="index"
          :index="indexMethod"
          width="110"
          align="center"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="sensorTypeCode"
          align="center"
          label="传感器类型编号">
        </el-table-column>
        <el-table-column
          prop="sensorTypeName"
          align="center"
          label="传感器类型名称">
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="paramNameCh"-->
<!--          align="center"-->
<!--          label="中文名">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="paramNameEn"-->
<!--          align="center"-->
<!--          label="英文名">-->
<!--        </el-table-column>-->
        <el-table-column
          prop="sensorTypeStatus"
          align="center"
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.sensorTypeStatus == 1">已上架</span>
            <span style="color:#ffa000;" v-if="scope.row.sensorTypeStatus == 0">下架中</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showdetail(scope.row.id)">
              详情
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
          layout="sizes, total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="元数据模型"
      :visible.sync="DialogVisible"
      width="45%"
      center>
      <div class="dialog-title"><span></span>基本信息</div>
      <div class="dialog-item">
        <div v-for="(item, index) in sensortype.basicList" :key="index">
          <div style="width:100px;">{{item.paramNameCh}}</div>
          <div>{{item.paramNameEn}}</div>
        </div>
      </div>
      <div v-if="sensortype.basicList.length == 0" class="dialog-empty">无</div>
      <div class="dialog-title"><span></span>定值</div>
      <div class="dialog-item">
        <div v-for="(item, index) in sensortype.constantList" :key="index">
          <div style="width:100px;">{{item.paramNameCh}}</div>
          <div>{{item.paramNameEn}}</div>
        </div>
      </div>
      <div v-if="sensortype.constantList.length == 0" class="dialog-empty">无</div>
      <div class="dialog-title"><span></span>测量值</div>
      <div class="dialog-item">
        <div v-for="(item, index) in sensortype.observedList" :key="index">
          <div style="width:100px;">{{item.paramNameCh}}</div>
          <div>{{item.paramNameEn}}</div>
        </div>
      </div>
      <div v-if="sensortype.observedList.length == 0" class="dialog-empty">无</div>
      <div class="dialog-title"><span></span>状态值</div>
      <div class="dialog-item">
        <div v-for="(item, index) in sensortype.statusList" :key="index">
          <div style="width:100px;">{{item.paramNameCh}}</div>
          <div>{{item.paramNameEn}}</div>
        </div>
      </div>
      <div v-if="sensortype.statusList.length == 0" class="dialog-empty">无</div>
      <span slot="footer" class="dialog-footer notable">
        <el-button type="primary" @click="edit">修 改</el-button>
        <el-button class="cancel" @click="dele">删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mylib from '../../mylib'
export default {
  name: 'dataManage',
  data () {
    return {
      currentPage: 1,
      tableData: [],
      total: 0,
      pageSize: 10,
      height: null,
      keyword: '',
      status: '',
      id: '',
      DialogVisible: false,
      sensortype: {
        basicList: [],
        constantList: [],
        observedList: [],
        statusList: []
      }
    }
  },
  methods: {
    indexMethod (index) {
      return (index + 1) + (this.currentPage - 1) * this.pageSize
    },
    search () {
      this.getData()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getData()
    },
    edit () {
      this.$router.push({path: '/preception/add', name: 'addSensor', query: {id: this.id}})
    },
    showdetail (id) {
      this.DialogVisible = true
      this.id = id
      this.getDetail()
    },
    getDetail () {
      mylib.axios({
        url: '/app/sensormeta/detailmeta',
        type: 'get',
        params: {
          id: this.id
        },
        done (res) {
          if (res.code === 0) {
            this.sensortype = res.sensortype
          }
        }
      }, this)
    },
    dele () {
      this.$confirm('此操作将删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancel',
        type: 'warning'
      }).then(() => {
        mylib.axios({
          url: '/app/sensormeta/deleteBatch',
          type: 'post',
          params: {
            id: this.id
          },
          done (res) {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.DialogVisible = false
              this.getData()
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
    getData () {
      mylib.axios({
        url: '/app/sensortype/list',
        type: 'get',
        params: {
          page: this.currentPage,
          limit: this.pageSize,
          sensorTypeName: this.keyword,
          status: this.status
        },
        done (res) {
          if (res.code === 0) {
            this.tableData = res.rows
            this.total = res.total
          }
        }
      }, this)
    },
    handleCurrentChange () {
      this.getData()
    },
    add () {
      this.$router.push('/preception/add')
    }
  },
  created () {
    this.height = document.documentElement.clientHeight - 250
    this.getData()
  },
  mounted () {

  }
}
</script>

<style scoped>
.dialog-title{
  height:50px;
  line-height:50px;
  border-bottom:1px solid #e5e5e5;
  font-size: 16px;
  color:#333;
  font-weight: bold;
}
.dialog-title span{
  display:inline-block;
  width:5px;
  height:20px;
  background:#343b70;
  border-radius: 8px;
  margin-right:10px;
  vertical-align: middle;
}
  .dialog-item{
    width:88%;
    display:flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    margin:0 auto;
  }
.dialog-item>div{
  width:50%;
  display:flex;
  height:50px;
  line-height:50px;
  font-size:14px;
  color:#000;
  opacity: 0.85;
}
  .dialog-empty{
    width:35%;
    text-align:right;
    font-size:14px;
    color:#000;
    opacity: 0.85;
    margin-top:10px;
  }
</style>
