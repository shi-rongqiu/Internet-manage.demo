<template>
  <div class="notable container back">
    <div class="header">新增应用</div>
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="应用名称：" prop="name">
          <el-input v-model="ruleForm.name" style="width:70%;float:left;margin-top:5px;"></el-input>
          <span class="right-tip right">*必填项</span>
        </el-form-item>
        <el-form-item label="版本号：" prop="code">
          <el-input v-model="ruleForm.code" style="width:70%;float:left;margin-top:5px;"></el-input>
          <span class="right-tip right">*必填项</span>
        </el-form-item>
        <el-form-item label="厂家名称：" prop="supplier">
          <el-input v-model="ruleForm.supplier" style="width:70%;float:left;margin-top:5px;"></el-input>
          <span class="right-tip right">*必填项</span>
        </el-form-item>
        <el-form-item label="版本大小：" prop="size">
          <el-input v-model="ruleForm.size" style="width:70%;margin-top:5px;"></el-input>
        </el-form-item>
        <el-form-item label="应用说明：" prop="explain">
          <el-input type="textarea" :rows="3" style="width:70%;margin-top:5px;" v-model="ruleForm.explain"></el-input>
        </el-form-item>
        <el-form-item label="应用图标：">
          <el-upload
            style="float:left;"
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <div v-else class="avatar-uploader-tip">
              <img src="../../assets/arithmetic/add-icon.png" alt="" style="margin-top:15px;">
              <div style="margin-top:20px;">上传照片</div>
            </div>
          </el-upload>
          <div class="tip">支持.jpg .png格式，尺寸75X75px</div>
        </el-form-item>
        <el-form-item label="上传附件：" class="add-content">
          <el-upload
            class="upload-demo"
            :action="action1"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
            :file-list="fileList">
            <el-button v-if="uploadFiles == ''" size="small" style="color:#4553d1;border-color:#4553d1;padding:5px 16px;font-size:14px;margin-top:5px;">
              <span style="margin-right:5px;">
                <img src="../../assets/arithmetic/upload-icon.png" alt="">
              </span>上传文件
            </el-button>
            <span class="right-tip" v-if="uploadFiles == ''">*必须上传相关附件</span>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">完成</el-button>
          <el-button @click="resetForm" style="margin-left:60px;">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import mylib from '../../mylib'
export default {
  name: 'addApply',
  data () {
    return {
      ruleForm: {
        name: '',
        code: '',
        supplier: '',
        size: '',
        explain: ''
      },
      action: mylib.URL + '/app/master/upload',
      action1: mylib.URL + '/app/master/upload',
      rules: {
        name: [
          { required: true, message: '请输入应用名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入版本号', trigger: 'blur' }
        ],
        supplier: [
          { required: true, message: '请输入厂家名称', trigger: 'blur' }
        ]
      },
      imageUrl: '',
      image: '',
      fileList: [],
      uploadFiles: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.image = res.url
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上传图标大小不能超过 2MB!')
      }
      return isLt2M
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
            url: '/app/master/save',
            type: 'post',
            params: {
              version: this.ruleForm.code,
              name: this.ruleForm.name,
              filesize: this.ruleForm.size,
              supplier: this.ruleForm.supplier,
              iconPath: this.image,
              filename: this.uploadFiles,
              profile: this.ruleForm.explain
            },
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            },
            done (res) {
              if (res.code === 0) {
                this.$message.success('添加成功')
                this.$router.push('/arithmetic')
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
      this.$router.push('/arithmetic')
    }
  },
  created () {
  }
}
</script>

<style scoped>
  .header{
    height:50px;
    line-height:50px;
    padding-left:15px;
    box-sizing: border-box;
    color:#333;
    font-size:18px;
    font-weight: bold;
  }
  .content{
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
</style>
