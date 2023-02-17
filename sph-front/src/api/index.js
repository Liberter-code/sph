import request from './request'

export default {
  categoryList: () => request.get('/product/getBaseCategoryList'),
}
