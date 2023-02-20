import request from './request'
import mockRequest from './mockRequest'

export default {
  getCategoryList: () => request.get('/product/getBaseCategoryList'),
  getBannerList: () => mockRequest.get('/banner'),
  getFloorList: () => mockRequest.get('/floor'),
  getSearchResult: (data) => request.post('/list', data)
}
