// 当前模块统一管理 API
import requests from "./request";
import mockRequests from "./mockAjax";

// 发请求，已经设置过 baseURL，路径不需要加 'api'
// axios 返回结果为 Promise 对象
export const reqCategoryList = () =>
  mockRequests.get("/product/getBaseCategoryList");

// 利用 mock 获取轮播图
export const reqBannerList = () => mockRequests.get("/banner");

//  floor 底部轮播图
export const reqFloorList = () => mockRequests.get("/floor");

// 获取搜索数据，当前接口需要传递一个默认参数（至少是一个空对象）
export const reqSearchList = (params) =>
  requests({ url: "/list", method: "post", data: params });

// 获取商品详情页数据
export const reqGoodsInfo = (skuId) =>
  requests({ url: `/item/${skuId}`, method: "get" });

// 添加购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

// 购物车列表数据
export const reqCartLis = () =>
  requests({ url: "/cart/cartList", method: "get" });

// 删除购物车产品
export const reqDeleteCartById = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });

// 修改购物车商品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });

// 获取验证码
export const reqGetCaptchaCode = (phoneNum) =>
  requests({ url: `/user/passport/sendCode/${phoneNum}`, method: "get" });

// 注册接口
export const reqUserRegister = (data) =>
  requests({ url: "/user/passport/register", data, method: "post" });

// 登录接口
export const reqUserLogin = (data) =>
  requests({ url: "/user/passport/login", data, method: "post" });

// 根据登录成功后返回的 token 请求用户信息
export const reqUserInfo = () =>
  requests({ url: "/user/passport/auth/getUserInfo", method: "get" });

// 退出登录接口
export const reqLogout = () =>
  requests({ url: "user/passport/logout", method: "get" });

// 获取地址信息接口
export const reqAddressInfo = () =>
  requests({ url: "user/userAddress/auth/findUserAddressList", method: "get" });

// 获取订单信息接口
export const reqOrderInfo = () =>
  requests({ url: "/order/auth/trade", method: "get" });

// 提交订单接口
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "post",
  });

// 获取支付信息
export const reqPayInfo = (orderId) =>
  requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  });

// 订单状态
export const reqPayStatus = (orderId) =>
  requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });

// 订单列表
export const reqMyOrderList = (page, limit) =>
  requests({
    url: `/order/auth/${page}/${limit}`,
    method: "get",
  });
