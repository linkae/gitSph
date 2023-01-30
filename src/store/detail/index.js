import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
// 游客身份模块uuid
import { getUUID } from "@/utils/uuidToken";
const state = {
  goodsInfo: {},
  uuidToken: getUUID(),
};
const actions = {
  async getGoodsInfo({ commit }, skuid) {
    let result = await reqGoodsInfo(skuid);
    if (result.code == 200) {
      commit("GETGOODSINFO", result.data);
    } else {
      console.warn("Failed getting goods info list, error code:" + result.code);
    }
  },
  changeActive({ commit }, playload) {
    commit("CHANGEACTIVE", playload);
  },
  async getAddOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    // await会返回一个 Promise 对象，服务器并没有返回数据，不需要存储
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code == 200) {
      return Promise.resolve("Add or update cart success");
    } else {
      return Promise.reject("Failed adding or updating shop cart");
    }
  },
};
const mutations = {
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo;
  },
  CHANGEACTIVE(state, playload) {
    playload.spuSaleAttrValueList.forEach((element) => {
      element.isChecked = 0;
    });
    playload.attrValue.isChecked = 1;
  },
};
const getters = {
  categoryView(state) {
    // 商品左上角路径导航
    return state.goodsInfo.categoryView || {};
  },
  skuInfo(state) {
    // 产品信息
    return state.goodsInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || [{}];
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
