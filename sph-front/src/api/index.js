import request from './request'
import mockRequest from './mockRequest'
export default {
  getCategoryList: () => request.get('/product/getBaseCategoryList'),
  getBannerList: () => mockRequest.get('/banner'),
}
