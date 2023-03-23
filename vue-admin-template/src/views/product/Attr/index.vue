<template>
  <div>
    <el-card>
      <CategorySelect @getCategoryId="getCategoryId" :disabled="!showTable" />
    </el-card>
    <el-card>
      <div v-show="showTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!haveCategory3Id"
          @click="addAttr"
        >
          添加属性
        </el-button>
        <el-table style="width: 100%; margin-top: 15px" border :data="attrList">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          />
          <el-table-column prop="attrName" label="属性名称" width="150" />
          <el-table-column prop="prop" label="属性值列表" width="auto">
            <template v-slot="{ row }">
              <div style="display: flex; gap: 5px">
                <el-tag
                  v-for="attrValue in row.attrValueList"
                  :key="attrValue.id"
                  type="success"
                >
                  {{ attrValue.valueName }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template v-slot="{ row }">
              <div>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="updateAttrInfo(row)"
                />
                <el-button type="danger" icon="el-icon-delete" size="mini" />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!showTable">
        <el-form :inline="true" label-width="80" :model="attrInfo">
          <el-form-item label="属性名称">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName.trim().length"
          @click="addAttrValue"
        >添加属性值
        </el-button>
        <el-button @click="showTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="80"
          />
          <el-table-column
            prop="valueName"
            align="left"
            label="属性值名称"
            width="width"
          >
            <template v-slot="{ row, index }">
              <el-input
                v-if="row.isEdit"
                ref="attrInput"
                v-model="row.valueName"
                placeholder="请输入属性值"
                size="mini"
                @blur="toDisplay(row, index)"
                @keyup.native.enter="toDisplay(row, index)"
              />
              <div
                v-else
                style="height: 1.5rem; width: 100%"
                @click="toEdit(row, index)"
              >
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            align="center"
            label="操作"
            width="width"
          >
            <template slot-scope="{ row, index }">
              <el-popconfirm
                :title="`确定删除${row.valueName}吗?`"
                @onConfirm="deleteAttr(index)"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="saveAttr"
          :disabled="attrInfo.attrValueList.length < 1"
        >保存
        </el-button>
        <el-button @click="showTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'Attr',
  data () {
    return {
      showTable: true,
      categoryLevel: {},
      attrList: [],
      isReap: false,
      showInput: true,
      attrInfo: {
        attrName: '',
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3
      }
    }
  },
  computed: {
    haveCategory3Id () {
      return (
        this.categoryLevel.category3Id !== undefined &&
        this.categoryLevel.category3Id !== ''
      )
    }
  },
  methods: {
    deleteAttr (index) {
      this.attrInfo.attrValueList.splice(index, 1)
    },
    getCategoryId (categoryIds) {
      this.categoryLevel = categoryIds
      if ( this.haveCategory3Id ) {
        this.getAttrList()
      }
    },
    async getAttrList () {
      const result = await this.$API.attr.attrList(this.categoryLevel)
      if ( result.code === 200 ) {
        this.attrList = result.data
      }
    },
    addAttr () {
      this.showTable = false
      this.attrInfo = {
        attrName: '',
        attrValueList: [],
        categoryId: this.categoryLevel.category3Id,
        categoryLevel: 3
      }
    },
    addAttrValue () {
      if ( this.isReap ) {
        return
      }
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        isEdit: true
      })
      this.$nextTick(() => {
        this.$refs.attrInput.focus()
      })
    },
    toEdit (row) {
      if ( this.isReap ) {
        this.$message.warning('该属性已存在')
        this.$nextTick(() => {
          this.$refs.attrInput.focus()
        })
        return
      }
      row.isEdit = true
      this.$nextTick(() => {
        this.$refs.attrInput.focus()
      })
    },
    toDisplay (row) {
      if ( row.valueName.trim() === '' ) {
        this.$message.warning('输入不能为空')
        this.$nextTick(() => {
          this.$refs.attrInput.focus()
        })
        this.isReap = true
        return
      }
      this.isReap = this.attrInfo.attrValueList.some((item) => {
        if ( row !== item ) {
          return row.valueName === item.valueName
        }
      })
      if ( this.isReap ) {
        this.$message.warning('该属性已存在')
        this.$nextTick(() => {
          this.$refs.attrInput.focus()
        })
        return
      }
      row.isEdit = false
    },
    updateAttrInfo (attrInfo) {
      this.showTable = false
      this.attrInfo = cloneDeep(attrInfo)
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item, 'isEdit', false)
      })
    },
    async saveAttr () {
      try {
        const res = await this.$API.attr.saveAttrInfo(this.attrInfo)
        if ( res.code === 200 ) {
          this.$message.success('保存成功!')
          this.getAttrList()
          this.showTable = true
        }
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
