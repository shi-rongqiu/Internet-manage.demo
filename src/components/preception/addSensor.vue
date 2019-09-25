<template>
  <div class="back" style="min-height:100%;">
    <div class="infor-table">
      <el-row class="table-tr">
        <el-col :span="6" class="table-td td-title">传感器类型名称</el-col>
        <el-col :span="6" class="table-td">
          <input type="text" v-model="sensorName">
        </el-col>
        <el-col :span="6" class="table-td td-title">传感器类型编号</el-col>
        <el-col :span="6" class="table-td">
          <input type="text" v-model="sensorCode">
        </el-col>
      </el-row>
      <el-row class="table-tr">
        <el-col :span="6" class="table-td td-title">状态</el-col>
        <el-col :span="6" class="table-td">
          <el-select v-model="status" placeholder="请选择">
            <el-option label="上架" :value="1">
            </el-option>
            <el-option label="下架" :value="0">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6" class="table-td td-title">备注</el-col>
        <el-col :span="6" class="table-td">
          <input type="text" v-model="mark">
        </el-col>
      </el-row>
      <div class="two-container">
        <div class="table-header">
          基本信息
          <span class="el-icon-circle-plus add"></span>
        </div>
        <el-table
          :data="baseInfor"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            :index="indexMethod"
            width="110"
            align="center"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="paramNameCh"
            align="center"
            label="中文名">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.paramNameCh">
            </template>
          </el-table-column>
          <el-table-column
            prop="paramNameEn"
            align="center"
            label="英文名">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.paramNameEn">
            </template>
          </el-table-column>
          <el-table-column
            prop="paramUnit"
            align="center"
            label="单位">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.paramUnit">
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="delBase(scope.$index)">
                删除
              </el-button>
              <el-button type="text" @click="addBase(scope.$index)">
                添加
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-header">
          测量值
          <span class="el-icon-circle-plus add"></span>
        </div>
        <el-table
          :data="measure"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            :index="indexMethod"
            width="110"
            align="center"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="paramNameCh"
            align="center"
            label="中文名">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.paramNameCh">
            </template>
          </el-table-column>
          <el-table-column
            prop="paramNameEn"
            align="center"
            label="英文名">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.paramNameEn">
            </template>
          </el-table-column>
          <el-table-column
            prop="paramUnit"
            align="center"
            label="单位">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.paramUnit">
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="delMeasure(scope.$index)">
                删除
              </el-button>
              <el-button type="text" @click="addMeasure(scope.$index)">
                添加
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-header">
          定值
          <span class="el-icon-circle-plus add"></span>
        </div>
        <el-table
          border
          :data="constant"
          style="width: 100%">
          <el-table-column
            type="index"
            :index="indexMethod"
            width="110"
            align="center"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="paramNameCh"
            align="center"
            label="中文名">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.paramNameCh">
            </template>
          </el-table-column>
          <el-table-column
            prop="paramNameEn"
            align="center"
            label="英文名">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.paramNameEn">
            </template>
          </el-table-column>
          <el-table-column
            prop="paramUnit"
            align="center"
            label="单位">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.paramUnit">
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="delConstant(scope.$index)">
                删除
              </el-button>
              <el-button type="text" @click="addConstant(scope.$index)">
                添加
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-header">
          状态信息
          <span class="el-icon-circle-plus add"></span>
        </div>
        <el-table
          border
          :data="statusInfor"
          style="width: 100%">
          <el-table-column
            type="index"
            :index="indexMethod"
            width="110"
            align="center"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="paramNameCh"
            align="center"
            label="中文名">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.paramNameCh">
            </template>
          </el-table-column>
          <el-table-column
            prop="paramNameEn"
            align="center"
            label="英文名">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.paramNameEn">
            </template>
          </el-table-column>
          <el-table-column
            prop="paramUnit"
            align="center"
            label="单位">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.paramUnit">
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="delStatus(scope.$index)">
                删除
              </el-button>
              <el-button type="text" @click="addStatus(scope.$index)">
                添加
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="btns notable">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button class="cancel" @click="back">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mylib from '../../mylib'
export default {
  name: 'addSensor',
  data () {
    return {
      sensorName: '',
      sensorCode: '',
      status: '',
      mark: '',
      baseInfor: [{
        paramNameCh: '',
        paramNameEn: '',
        paramUnit: ''
      }],
      measure: [{
        paramNameCh: '',
        paramNameEn: '',
        paramUnit: ''
      }],
      constant: [{
        paramNameCh: '',
        paramNameEn: '',
        paramUnit: ''
      }],
      statusInfor: [{
        paramNameCh: '',
        paramNameEn: '',
        paramUnit: ''
      }],
      id: ''
    }
  },
  methods: {
    indexMethod (index) {
      return (index + 1)
    },
    back () {
      history.back()
    },
    save () {
      if (this.sensorName === '') {
        return this.$message('传感器类型名称为空')
      }
      if (this.sensorCode === '') {
        return this.$message('传感器类型编号为空')
      }
      if (this.status === '') {
        return this.$message('状态为空')
      }
      if (this.id) {
        mylib.axios({
          url: '/app/sensortype/update',
          type: 'put',
          params: {
            id: this.id,
            sensorTypeName: this.sensorName,
            sensorTypeCode: this.sensorCode,
            sensorTypeStatus: this.status,
            mark: this.mark,
            basicList: this.baseInfor,
            constantList: this.constant,
            observedList: this.measure,
            statusList: this.statusInfor
          },
          done (res) {
            if (res.code === 0) {
              this.$message('修改成功！')
              this.$router.push('/site/manage')
            }
          }
        }, this)
      } else {
        mylib.axios({
          url: '/app/sensortype/save',
          type: 'post',
          params: {
            sensorTypeName: this.sensorName,
            sensorTypeCode: this.sensorCode,
            sensorTypeStatus: this.status,
            mark: this.mark,
            basicList: this.baseInfor,
            constantList: this.constant,
            observedList: this.measure,
            statusList: this.statusInfor
          },
          done (res) {
            if (res.code === 0) {
              this.$message('保存成功！')
              this.$router.push('/preception/data')
            }
          }
        }, this)
      }
    },
    addBase (index) {
      this.baseInfor.splice(index + 1, 0, {
        paramNameCh: '',
        paramNameEn: '',
        paramUnit: ''
      })
    },
    delBase (index) {
      this.baseInfor.splice(index, 1)
    },
    addMeasure (index) {
      this.measure.splice(index + 1, 0, {
        paramNameCh: '',
        paramNameEn: '',
        paramUnit: ''
      })
    },
    delMeasure (index) {
      this.measure.splice(index, 1)
    },
    addConstant (index) {
      this.constant.splice(index + 1, 0, {
        paramNameCh: '',
        paramNameEn: '',
        paramUnit: ''
      })
    },
    delConstant (index) {
      this.constant.splice(index, 1)
    },
    addStatus (index) {
      this.statusInfor.splice(index + 1, 0, {
        paramNameCh: '',
        paramNameEn: '',
        paramUnit: ''
      })
    },
    delStatus (index) {
      this.statusInfor.splice(index, 1)
    },
    getData () {
      mylib.axios({
        url: '/app/sensortype/detailmeta',
        type: 'get',
        params: {
          id: this.id
        },
        done (res) {
          if (res.code === 0) {
            // this.sensorName = res.sensortype.sensorTypeName
            // this.sensorCode = res.sensortype.sensorTypeCode
            // this.status = res.sensortype.sensorTypeStatus
            // this.mark = res.sensortype.mark
            // this.baseInfor = res.sensortype.basicList
            // this.constant = res.sensortype.constantList
            // this.measure = res.sensortype.observedList
            // this.statusInfor = res.sensortype.statusList
          }
        }
      }, this)
    }
  },
  created () {
    this.id = this.$route.params.id
    if (this.id) {
      this.getData()
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
  .infor-table{
    padding:20px;
    box-sizing: border-box;
  }
  /*.table-header{height:40px;line-height:40px;padding-left:20px;}*/
  .table-tr{border:1px solid #eee;}
  .table-td{color:#333;font-size:14px;height:40px;line-height:30px;
    text-align:center;border-right:1px solid #eee;padding:5px 10px 5px;box-sizing: border-box;}
  .td-title{background:#fafafa;}
  input{width:100%;padding-left:15px;box-sizing:border-box;height:30px;border:0;outline:none;}
  input:focus{border:1px solid #4553d1;}
  .two-container{
    background:#fff;
    position:relative;
    box-sizing: border-box;
  }
  .table-header{
    width:100%;
    background:#fafafa;
    border-top:1px solid #e1e6eb;
    border-left:1px solid #e1e6eb;
    border-right:1px solid #e1e6eb;
    padding:10px 32px;
    box-sizing: border-box;
    font-size:16px;
    color:#333;
    font-weight: bold;
    margin-top:15px;
  }
  .table-header .add{
    float: right;
    font-size:20px;
    color:#4553d1;
  }
  .btns{
    text-align:center;
    margin-top:55px;
  }
  .cancel{
    border:2px solid #d9d9d9;
    color:#000;
    font-size:16px;
  }
</style>
