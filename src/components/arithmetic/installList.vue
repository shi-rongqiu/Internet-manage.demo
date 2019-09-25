<template>
  <div class="container">
    <div class="header-top">
      <div>
        站点名称：<el-input class="input" placeholder="请输入" v-model="name"></el-input>
      </div>
      <div>
        节点编号：<el-input class="input" placeholder="全部" v-model="code"></el-input>
      </div>
      <div>
        APP名称：<el-input class="input" placeholder="全部" v-model="appName"></el-input>
      </div>
      <div>
        厂家：<el-input class="input" placeholder="全部" v-model="supplier"></el-input>
        <el-button type="primary"  style="margin-left:20px;" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="children">
      <el-table
        :data="list"
        :max-height="height"
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
          label="站点">
        </el-table-column>
        <el-table-column
          prop="code"
          align="center"
          label="节点编号">
        </el-table-column>
        <el-table-column
          prop="app"
          align="center"
          label="APP名称">
        </el-table-column>
        <el-table-column
          prop="createTime"
          align="center"
          label="安装时间">
        </el-table-column>
        <el-table-column
          prop="size"
          align="center"
          label="大小">
        </el-table-column>
        <el-table-column
          prop="supper"
          align="center"
          label="发布者">
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          label="版本">
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
export default {
  name: 'installList',
  data () {
    return {
      name: '',
      code: '',
      appName: '',
      supplier: '',
      list: [
        {name: '石家庄220kV子龙站(GIS)', code: '509275', app: '油色谱算法', createTime: '2019-9-10', size: '20M',supper: '电科院', status: 'v1.1.1'}
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      height: null
    }
  },
  methods: {
    indexMethod (index) {
      return (index + 1) + (this.currentPage - 1) * this.pageSize
    },
    search () {},
    reset () {},
    handleCurrentChange () {},
    handleSizeChange (val) {
      this.pageSize = val
    },
  },
  created() {
    this.height = document.documentElement.clientHeight - 250
  }
}
</script>

<style scoped>
  @media screen and (max-width: 1366px) {
    .header-top>div{margin-right:20px;}
    .input{width:110px;}
  }
</style>
