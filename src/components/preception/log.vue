<template>
  <div class="container">
    <div class="header-top">
      <div>
        用户名：<el-input class="input" placeholder="请输入" v-model="keyword"></el-input>
      </div>
      <div>
        IP地址：<el-input class="input" placeholder="请输入" v-model="code"></el-input>
        <el-button type="primary" @click="search" style="margin-left:10px;">搜索</el-button>
      </div>
    </div>
    <div class="children">
      <el-table
        :data="logList"
        :max-height="height"
        border
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          :index="indexMethod"
          width="70"
          align="center"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="user"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="IP地址">
        </el-table-column>
        <el-table-column
          prop="time1"
          label="登录时间">
        </el-table-column>
        <el-table-column
          prop="time2"
          label="退出时间">
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容">
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
      pageSize: 20,
      total: 0,
      logList: [
        {user: 'user1', ip: '192.168.0.0', time1: '2019-9-12 10:00', time2: '2019-9-12 10:33', content: '修改传感器信息'}
      ],
      keyword: '',
      code: '',
      height: null
    }
  },
  methods: {
    indexMethod (index) {
      return (index + 1) + (this.currentPage - 1) * this.pageSize
    },
    search () {
      this.getLog()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getLog()
    },
    getLog () {
      mylib.axios({
        url: '/app/sensor/list',
        type: 'post',
        params: {
          keyword: this.keyword,
          sensorCode: this.code,
          page: this.currentPage,
          limit: this.pageSize
        },
        done (res) {
          if (res.code === 0) {
            this.logList = res.rows
            this.total = res.total
          }
        }
      }, this)
    },
    handleCurrentChange () {
      this.getLog()
    }
  },
  created () {
    this.height = document.documentElement.clientHeight - 250
    // this.getLog()
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
