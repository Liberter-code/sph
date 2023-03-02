<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" size="small" @click="showDialog">添加</el-button>
    <el-table border style="margin-top: 20px;" :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center" />
      <el-table-column prop="tmName" label="品牌名称" align="center" />
      <el-table-column prop="logoUrl" label="品牌LOGO" align="center">
        <template v-slot="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 50px;height: 50px;">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" align="center">
        <template v-slot>
          <el-button type="primary" size="mini" @click="showDialog">修改</el-button>
          <el-button type="danger" size="mini">删除</el-button>
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
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="trademark" style="width: 80%;">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input v-model="trademark.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlerSubmit">确 定</el-button>
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
      formLabelWidth: '120px'
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
    showDialog() {
      this.trademark = { tmName: '', logoUrl: '' }
      this.dialogFormVisible = true
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
    async handlerSubmit() {
      this.dialogFormVisible = false
      const result = await this.$API.trademark.addTrademark(this.trademark)
      if (result.code === 200) {
        await this.getPageList(this.currentPage)
        this.$message.success('添加成功')
      } else {
        this.$message.error('添加失败')
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
