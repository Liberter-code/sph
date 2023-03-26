<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input v-model="spu.spuName" placeholder="SPU名称" />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option
            v-for="tm in trademarkList"
            :key="tm.id"
            :label="tm.tmName"
            :value="tm.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input v-model="spu.description" type="textarea" rows="4" placeholder="描述" />
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          list-type="picture-card"
          action="/dev-api/admin/product/fileUpload"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="saleAttr" :placeholder="`还有${unSelectSaleAttr.length}个未选择`">
          <el-option v-for="sa in unSelectSaleAttr" :key="sa.id" :label="sa.name" :value="`${sa.id}:${sa.name}`" />
        </el-select>
        <el-button
          icon="el-icon-plus"
          type="primary"
          style="margin: 10px;"
          :disabled="!saleAttr"
          @click="addSaleAttr"
        >
          添加销售属性
        </el-button>
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column prop="saleAttrName" label="属性名" width="width" align="center" />
          <el-table-column prop="spuSaleAttrValueList" label="属性值名称列表" width="width" align="center">
            <template v-slot="{row}">
              <el-tag
                v-for="tag in row.spuSaleAttrValueList"
                :key="tag.id"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.inputVisible"
                ref="saveTagInput"
                v-model="row.inputValue"
                class="input-new-tag"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              />
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width" align="center">
            <template v-slot="{}">
              <el-button type="danger" icon="el-icon-delete" size="mini" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('cancel')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      saleAttr: '',
      spu: {
        category3Id: 0,
        tmId: 0,
        description: '',
        skuName: '',
        spuImageList: [
          {
            id: 0,
            imgName: '',
            imgUrl: '',
            spuId: 0
          }
        ],
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: '',
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: '',
                saleAttrName: '',
                saleAttrValueName: '',
                spuId: 0
              }
            ]
          }
        ]
      },
      trademarkList: [],
      spuImageList: [],
      saleAttrList: []
    }
  },
  computed: {
    unSelectSaleAttr() {
      return this.saleAttrList.filter(sale => {
        return this.spu.spuSaleAttrList.every(item => {
          return sale.name !== item.saleAttrName
        })
      })
    }
  },
  methods: {
    async initSpuData(row) {
      try {
        const spuResult = await this.$API.spu.getSpuById(row.id)
        if (spuResult.code === 200) {
          this.spu = spuResult.data
        }

        const tmResult = await this.$API.spu.getTrademarkList()
        if (tmResult.code === 200) {
          this.trademarkList = tmResult.data
        }

        const spuImgResult = await this.$API.spu.getSpuImageList(row.id)
        if (spuImgResult.code === 200) {
          this.spuImageList = spuImgResult.data.map(item => {
            item.name = item.imgName
            item.url = item.imgUrl
            return item
          })
        }

        const saleAttrResult = await this.$API.spu.getSaleAttrList()
        if (saleAttrResult.code === 200) {
          this.saleAttrList = saleAttrResult.data
        }
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.saleAttr.split(':')
      const newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
      this.spu.spuSaleAttrList.push(newSaleAttr)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.spuImageList = fileList
    },
    handleSuccess(response, file, fileList) {
      this.spuImageList = fileList
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput(row) {
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm(row) {
      const inputValue = row.inputValue
      const repeat = row.spuSaleAttrValueList.some(item => item.saleAttrValueName === inputValue)
      if (repeat) {
        this.$message.warning('已存在该属性值')
        return
      }
      if (inputValue.trim()) {
        const newSaleAttrValue = {
          baseSaleAttrId: row.baseSaleAttrId,
          saleAttrValueName: inputValue
        }
        row.spuSaleAttrValueList.push(newSaleAttrValue)
      }
      row.inputVisible = false
      row.inputValue = ''
    }
  }
}
</script>

<style lang="scss">
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
