import request from '@/utils/request'

export const getSpuList = (page, limit, category3Id) => request({
  url: `/admin/product/${page}/${limit}`,
  method: 'get',
  params: { category3Id }
})

export const getSpuById = (id) => request({ url: `/admin/product/getSpuById/${id}`, method: 'get' })

export const getTrademarkList = () => request({
  url: `/admin/product/baseTrademark/getTrademarkList`,
  method: 'get'
})

export const getSpuImageList = (id) => request({
  url: `/admin/product/spuImageList/${id}`,
  method: 'get'
})

export const getSaleAttrList = () => request({
  url: `/admin/product/baseSaleAttrList`,
  method: 'get'
})

