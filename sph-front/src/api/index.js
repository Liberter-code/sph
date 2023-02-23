import request from './request'
import mockRequest from './mockRequest'

export const getCategoryList = () => request.get('/product/getBaseCategoryList')
export const getBannerList = () => mockRequest.get('/banner')
export const getFloorList = () => mockRequest.get('/floor')
export const getSearchResult = (data) => request.post('/list', data)
export const getGoodInfo = (skuId) => request.get(`/item/${ skuId }`)
export const updateShopCart = (skuId, skuNum) => request.post(`/cart/addToCart/${ skuId }/${ skuNum }`)
export const getCartList = () => request.get('/cart/cartList')
export const deleteGoodFromCart = (skuId) => request.delete(`/cart/deleteCart/${skuId}`)
export const updateCheckCart = (skuId,isChecked) => request.get(`/cart/checkCart/${skuId}/${isChecked}`)
