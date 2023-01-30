import { reqCartLis, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
const state = {
  cartList: [],
};
const actions = {
  async getCartList({ commit }) {
    let result = await reqCartLis();
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
      return Promise.resolve();
    } else {
      return Promise.reject("Get cart list failed, error code:" + result.code);
    }
  },
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return Promise.resolve("Shop cart deleted");
    } else {
      return Promise.reject(
        "Deleting shop cart failed, error code:" + result.code
      );
    }
  },
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.code == 200) {
      return Promise.resolve();
    } else {
      return Promise.reject(
        "Request update/checked action failed, error code:" + result.code
      );
    }
  },
  deleteAllChecked({ dispatch, getters }) {
    // context上下文有commit,dispatch,getters,state等方法，可以派发deleteCartListBySkuId操作删除购物车
    // 通过getters获得其中购物车商品列表，遍历操作
    let allPromise = [];
    getters.cartList.cartInfoList.forEach((item) => {
      // result结果返回的是一个Promise，利用Promise.all判断是否全部删除成功
      let result =
        item.isChecked == 1
          ? dispatch("deleteCartListBySkuId", item.skuId)
          : "";
      allPromise.push(result);
    });
    return Promise.all(allPromise);
  },
  updateAllCartIsChecked({ state, dispatch }, isChecked) {
    // 为每个购物车项目派发action，是否勾选依据传来的isChecked决定
    // 将每次结果保存，最后使用Promise.all判定此次行为失败与否
    let allPromise = [];
    state.cartList[0].cartInfoList.forEach((item) => {
      allPromise.push(
        dispatch("updateCheckedById", { skuId: item.skuId, isChecked })
      );
    });
    return Promise.all(allPromise);
  },
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
