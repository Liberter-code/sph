import request from '@/utils/request'

export const getCategory1 = () => request.get('/admin/product/getCategory1')
export const getCategory2 = (category1Id) => request.get(`/admin/product/getCategory2/${category1Id}`)
export const getCategory3 = (category2Id) => request.get(`/admin/product/getCategory3/${category2Id}`)
export const attrList = ({ category1Id, category2Id, category3Id }) => request.get(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
export const saveAttrInfo = (data) => request.post('/admin/product/saveAttrInfo', data)
