<template>
  <div class="notable container back">
    <div class="header">应用管理 <span class="backhome" @click="back">返回上一级页面</span></div>
    <div class="content">
      <div>
        <div class="item-left">
          <img v-if="appMaster.iconPath" :src="appMaster.iconPath" alt="">
          <img src="../../assets/arithmetic/shenhe-detail.png" v-if="appMaster.status == 0 && !appMaster.iconPath" alt="">
          <img src="../../assets/arithmetic/online-detail.png" v-if="appMaster.status == 1 && !appMaster.iconPath" alt="">
          <img src="../../assets/arithmetic/under-detail.png" v-if="appMaster.status == 2 && !appMaster.iconPath" alt="">
        </div>
        <div class="item-right">
          <el-button class="cancel" @click="dele">
            <span class="btn">
              <img src="../../assets/arithmetic/detele-icon.png" alt="">
            </span>删除
          </el-button>
          <el-button @click="edit" class="cancel" v-if="appMaster.status == 0 || appMaster.status == 2">
            <span class="btn">
              <img src="../../assets/arithmetic/edit-icon.png" alt="">
            </span>编辑
          </el-button>
          <el-button type="primary" @click="" v-if="appMaster.status == 0 || appMaster.status == 2">
            <span class="btn">
              <img src="../../assets/arithmetic/online-icon.png" alt="">
            </span>上架
          </el-button>
          <el-button @click="upgrade" type="primary" v-if="appMaster.status == 1">
            <span class="btn">
              <img src="../../assets/arithmetic/level.png" alt="">
            </span>升级
          </el-button>
          <el-button type="primary" v-if="appMaster.status == 1">
            <span class="btn">
              <img src="../../assets/arithmetic/download-icon.png" alt="">
            </span>下架
          </el-button>
        </div>
        <div class="item-center">
          <div>
            <div class="title">应用名称：{{appMaster.name}}</div>
            <div>版本号：{{appMaster.version}}</div>
            <div>版本大小：{{appMaster.filesize}}</div>
            <div>厂家名称：{{appMaster.supplier}}</div>
            <div>应用说明：{{appMaster.profile}}</div>
          </div>
          <div>
            <div class="title">更新内容</div>
            <div>{{appMaster.mark}}</div>
          </div>
          <div>
            <div><span class="title">附件:</span> <img style="margin-right:10px;" src="../../assets/arithmetic/fujian-icon.png" alt="">{{appMaster.filename}}</div>
          </div>
        </div>
      </div>
      <img src="../../assets/arithmetic/bg.png" alt="" class="img-bottom">
    </div>
    <el-dialog
      title="编辑"
      center
      :visible.sync="editVisible">
      <div class="dialog-container">
        <el-form :model="appMaster" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="应用名称：">
            <div style="height:40px;line-height:40px;">{{appMaster.name}}</div>
          </el-form-item>
          <el-form-item label="版本号：" prop="version">
            <el-input v-model="appMaster.version" style="width:70%;float:left;margin-top:5px;"></el-input>
            <span class="right-tip right">*必填项</span>
          </el-form-item>
          <el-form-item label="厂家名称：" prop="supplier">
            <el-input v-model="appMaster.supplier" style="width:70%;float:left;margin-top:5px;"></el-input>
            <span class="right-tip right">*必填项</span>
          </el-form-item>
          <el-form-item label="更新内容：" prop="profile">
            <el-input type="textarea" :rows="3" style="width:70%;margin-top:5px;" v-model="appMaster.profile"></el-input>
          </el-form-item>
          <el-form-item label="上传附件：" class="add-content">
            <el-upload
              class="upload-demo"
              :action="action"
              :on-remove="handleRemove"
              :before-upload="beforeUpload"
              :on-success="handleSuccess"
              :file-list="fileList">
              <el-button size="small" style="color:#4553d1;border-color:#4553d1;padding:5px 16px;font-size:14px;" v-if="!uploadFiles">
                <span style="margin-right:5px;">
                  <img src="../../assets/arithmetic/upload-icon.png" alt="">
                </span>上传文件
              </el-button>
              <span class="right-tip" v-if="!uploadFiles">*必须上传相关附件</span>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="resetForm" style="margin-left:60px;">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog
      title="应用升级"
      center
      :visible.sync="levelVisible">
      <div class="dialog-container">
        <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="应用名称：">
            <div style="height:40px;line-height:40px;">算法</div>
          </el-form-item>
          <el-form-item label="版本号：" prop="code">
            <el-input v-model="ruleForm1.code" style="width:70%;float:left;"></el-input>
            <span class="right-tip right">*必填项</span>
          </el-form-item>
          <el-form-item label="升级内容：" prop="explain">
            <el-input type="textarea" :rows="3" style="width:70%;" v-model="ruleForm1.explain"></el-input>
          </el-form-item>
          <el-form-item label="上传附件：">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-remove="handleRemove1"
              :before-upload="beforeUpload1"
              :file-list="fileList1">
              <el-button size="small" style="color:#4553d1;border-color:#4553d1;padding:5px 16px;font-size:14px;">
              <span style="margin-right:5px;">
                <img src="../../assets/arithmetic/upload-icon.png" alt="">
              </span>上传文件
              </el-button>
              <span class="right-tip">*必须上传相关附件</span>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm1('ruleForm1')">保存</el-button>
            <el-button @click="resetForm1" style="margin-left:60px;">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mylib from '../../mylib'
export default {
  name: 'detail',
  props: ['id'],
  data () {
    return {
      editVisible: false,
      levelVisible: false,
      action: mylib.URL + '/app/master/upload',
      appMaster: {
        version: '',
        supplier: '',
        profile: ''
      },
      rules: {
        version: [
          { required: true, message: '请输入版本号', trigger: 'blur' }
        ],
        supplier: [
          { required: true, message: '请输入厂家名称', trigger: 'blur' }
        ]
      },
      fileList: [],
      uploadFiles: '',
      ruleForm1: {
        code: '',
        supplier: '',
        explain: ''
      },
      rules1: {
        code: [
          { required: true, message: '请输入版本号', trigger: 'blur' }
        ],
        supplier: [
          { required: true, message: '请输入厂家名称', trigger: 'blur' }
        ]
      },
      fileList1: []
    }
  },
  methods: {
    back () {
      history.back()
    },
    edit () {
      this.editVisible = true
      this.fileList.push({
        name: this.appMaster.filename
      })
    },
    upgrade () {
      this.levelVisible = true
    },
    dele () {
      this.$confirm('应用删除后将无法恢复，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancel',
        type: 'warning'
      }).then(() => {
        mylib.axios({
          url: '/app/master/delete',
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
              this.$router.push('/arithmetic')
            } else {
              this.$message.error(res.msg)
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
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 200

      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 200MB!')
      }
      return isLt2M
    },
    handleSuccess (file, fileList) {
      this.uploadFiles = fileList.name
    },
    handleRemove(file, fileList) {
      this.uploadFiles = ''
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          mylib.axios({
            url: '/app/master/update',
            type: 'put',
            params: {
              id: this.id,
              name: this.appMaster.name,
              version: this.appMaster.version,
              supplier: this.appMaster.supplier,
              filename: this.uploadFiles,
              profile: this.appMaster.profile
            },
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            },
            done (res) {
              if (res.code === 0) {
                this.$message.success('修改成功')
                this.editVisible = false
                this.getInfor()
              } else {
                this.$message.error(res.msg)
              }
            }
          }, this)
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.editVisible = false
    },
    handleRemove1(file, fileList) {
      console.log(file, fileList)
    },
    beforeUpload1(file) {
      const isLt2M = file.size / 1024 / 1024 < 200

      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 200MB!')
      }
      return isLt2M
    },
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
    },
    resetForm1() {
      this.levelVisible = false
    },
    getInfor () {
      mylib.axios({
        url: '/app/master/info/' + this.id,
        type: 'get',
        done (res) {
          if (res.code === 0) {
            this.appMaster = res.appMaster
            this.uploadFiles = this.appMaster.filename
          } else {
            this.$message.error(res.msg)
          }
        }
      }, this)
    }
  },
  created () {
    this.getInfor()
  }
}
</script>

<style scoped>
  .header{
    height:60px;
    line-height:60px;
    padding-left:15px;
    box-sizing: border-box;
    color:#333;
    font-size:18px;
    font-weight: bold;
  }
  .backhome{
    color:#4553d1;
    float:right;
    margin-right:36px;
    cursor: pointer;
  }
  .content{
    margin:10px 21px 60px 15px;
    background:#f5f5f5;
    position:relative;
    min-height:495px;
  }
  .item-left{
    width:183px;
    float: left;
    padding-left:45px;
    margin-top:30px;
    box-sizing: border-box;
  }
  .item-center{
    padding-top:30px;
    margin-left:183px;
    margin-right: 500px;
  }
  .item-center div{
    margin-bottom:10px;
    color:#333;
    font-size:14px;
  }
  .item-center>div{
    margin-bottom:25px;
  }
  .item-center .title{
    font-size:16px;
    font-weight: bold;
  }
  .item-right{
    width:430px;
    float: right;
    margin-top:30px;
    box-sizing: border-box;
  }
  .btn{
    margin-right:10px;
  }
  .img-bottom{
    position:absolute;
    bottom:0;
    right:0;
  }
  .dialog-container{
    margin-top: 10px;
    margin-left: 20%;
  }
  .demo-ruleForm{
    width:80%;
  }
  .avatar-uploader-tip {
    width: 75px;
    height: 75px;
    text-align: center;
    color:rgba(0, 0, 0, 0.65)
  }
  .avatar {
    width: 75px;
    height: 75px;
    display: block;
  }
  .tip{
    position:absolute;
    left:95px;
    bottom:10px;
    color:#999;
    font-size:12px;
  }
  .right-tip{
    color:rgba(255,0,0,0.85);
    font-size:12px;
    margin-left:10px;
  }
  .right{
    height:40px;
    line-height:40px;
  }
  .cancel{border:2px solid #d9d9d9;color:#000;}
</style>
