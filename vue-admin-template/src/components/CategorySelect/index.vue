<template>
  <div>
    <el-form :inline="true" :model="categoryForm" class="demo-form-inline" :disabled="disabled">
      <el-form-item label="一级分类">
        <el-select v-model="categoryForm.category1Id" placeholder="请选择" @change="getCategory2List">
          <el-option
            v-for="c1 in category1List"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryForm.category2Id" placeholder="请选择" @change="getCategory3List">
          <el-option
            v-for="c2 in category2List"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryForm.category3Id" placeholder="请选择" @change="handler">
          <el-option
            v-for="c3 in category3List"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          />
        </el-select></el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: ['disabled'],
  data() {
    return {
      categoryForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      },
      category1List: [],
      category2List: [],
      category3List: []
    }
  },
  mounted() {
    this.getCategory1List()
  },
  methods: {
    async getCategory1List() {
      const result = await this.$API.attr.getCategory1()
      if (result.code === 200) {
        this.category1List = result.data
      }
    },
    async getCategory2List() {
      this.categoryForm.category2Id = ''
      this.categoryForm.category3Id = ''
      this.$emit('getCategoryId', { ...this.categoryForm })
      const result = await this.$API.attr.getCategory2(this.categoryForm.category1Id)
      if (result.code === 200) {
        this.category2List = result.data
      }
    },
    async getCategory3List() {
      this.categoryForm.category3Id = ''
      this.$emit('getCategoryId', { ...this.categoryForm })
      const result = await this.$API.attr.getCategory3(this.categoryForm.category2Id)
      if (result.code === 200) {
        this.category3List = result.data
      }
    },
    handler() {
      this.$emit('getCategoryId', { ...this.categoryForm })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
