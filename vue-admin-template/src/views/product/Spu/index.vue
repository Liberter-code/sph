<template>
  <div>
    <el-card style="margin: 20px 0;">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 20px;"
          :disabled="!categoryLevel.category3Id"
          @click="addSpu"
        >添加SPU
        </el-button>
        <el-table style="width: 100%" border :data="dataSource">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          />
          <el-table-column
            prop="spuName"
            label="SPU名称"
            width="width"
            align="center"
          />
          <el-table-column
            prop="description"
            label="SPU描述"
            width="width"
            align="center"
          />
          <el-table-column
            label="操作"
            width="width"
            align="center"
          >
            <template v-slot="{row}">
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加spu"
              />
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              />
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="spu详情"
              />
              <hint-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除spu"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          background
          style="margin-top: 20px;text-align: center"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
      <spu-form v-show="scene === 1" ref="spu" @cancel="scene = 0" />
      <sku-form v-show="scene === 2" />
    </el-card>
  </div>
</template>

<script>
import SkuForm from '@/views/product/Spu/mudules/SkuForm.vue'
import SpuForm from '@/views/product/Spu/mudules/SpuForm.vue'
export default {
  name: 'Spu',
  components: {
    SpuForm,
    SkuForm
  },
  data() {
    return {
      categoryLevel: {},
      page: 1,
      limit: 3,
      dataSource: [],
      total: 0,
      scene: 0
    }
  },
  computed: {
    haveCategory3Id() {
      return (
        this.categoryLevel.category3Id !== undefined &&
        this.categoryLevel.category3Id !== ''
      )
    }
  },
  methods: {
    addSpu() {
      this.scene = 1
      this.$refs.spu.initSpuData()
    },
    updateSpu(row) {
      this.scene = 1
      this.$refs.spu.initSpuData(row)
    },
    handleCurrentChange(page) {
      this.page = page
      this.getSpuList()
    },
    handleSizeChange(pageSize) {
      this.limit = pageSize
      this.getSpuList()
    },
    getCategoryId(categoryIds) {
      this.categoryLevel = categoryIds
      if (this.haveCategory3Id) {
        this.getSpuList()
      }
    },
    async getSpuList() {
      const { page, limit, categoryLevel } = this
      const response = await this.$API.spu.getSpuList(page, limit, categoryLevel.category3Id)
      if (response.code === 200) {
        this.total = response.data.total
        this.dataSource = response.data.records
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
