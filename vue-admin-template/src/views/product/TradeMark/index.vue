<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" size="small" @click="showDialog()">添加</el-button>
    <el-table border style="margin-top: 20px;" :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center" />
      <el-table-column prop="tmName" label="品牌名称" align="center" />
      <el-table-column prop="logoUrl" label="品牌LOGO" align="center">
        <template v-slot="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 50px;height: 50px;">
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="{ row }">
          <el-button type="primary" size="mini" @click="showDialog(row)">修改</el-button>
          <el-button type="danger" size="mini" @click="deleteTrademark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      style="margin-top: 20px;text-align: center"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      :pager-count="7"
      :page-sizes="[10, 20, 30]"
      @current-change="getPageList"
      @size-change="handlerChangeSize"
    />
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form ref="trademark-form" :model="trademark" :rules="rules" style="width: 80%;">
        <el-form-item prop="tmName" label="品牌名称" label-width="100px" required>
          <el-input v-model="trademark.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="logoUrl" label="品牌LOGO" label-width="100px" required>
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="trademark.logoUrl" :src="trademark.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('trademark-form')">取 消</el-button>
        <el-button type="primary" @click="handlerSubmit('trademark-form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'TradeMark',
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      list: [],
      dialogFormVisible: false,
      trademark: {
        tmName: '',
        logoUrl: ''
      },
      formLabelWidth: '120px',
      title: '',
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请选择品牌图片' }
        ]
      }
    }
  },
  mounted() {
    this.getPageList()
  },
  methods: {
    async getPageList(page = 1) {
      this.currentPage = page
      const result = await this.$API.trademark.getTrademarkList(this.currentPage, this.pageSize)
      if (result.code === 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    handlerChangeSize(limit) {
      this.pageSize = limit
      this.getPageList()
    },
    showDialog(row) {
      this.title = row ? '修改品牌' : '新增品牌'
      this.trademark = { ...row } || { tmName: '', logoUrl: '' }
      this.dialogFormVisible = true
    },
    closeDialog(formName) {
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false
    },
    handleAvatarSuccess(res) {
      this.trademark.logoUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handlerSubmit(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.dialogFormVisible = false
          try {
            const result = this.title === '新增品牌'
              ? await this.$API.trademark.addTrademark(this.trademark)
              : await this.$API.trademark.updateTrademark(this.trademark)
            if (result.code === 200) {
              await this.getPageList(this.currentPage)
              this.$message.success(this.trademark.id ? '修改成功' : '添加成功')
            }
          } catch (e) {
            this.$message.error(e.message)
          } finally {
            this.title = ''
          }
        } else {
          return false
        }
      })
    },
    async deleteTrademark(row) {
      try {
        await this.$confirm(`你确定删除${row.tmName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const result = await this.$API.trademark.deleteTrademark(row.id)
        if (result.code === 200) {
          this.$message.success('删除成功!')
          this.getPageList(this.list.length > 1 ? this.currentPage : this.currentPage - 1)
        }
      } catch (e) {
        this.$message.info('已取消删除')
      }
    }
  }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
