import request from '@/utils/request'

export const getTrademarkList = (page, limit) => request({
  url: `/admin/product/baseTrademark/${page}/${limit}`,
  method: 'get'
})

export const addTrademark = (data) => request({
  url: '/admin/product/baseTrademark/save',
  method: 'post',
  data
})
export const updateTrademark = (data) => request({
  url: '/admin/product/baseTrademark/update',
  method: 'put',
  data
})
