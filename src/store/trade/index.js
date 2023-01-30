import { reqAddressInfo, reqOrderInfo } from "@/api";
const state = {
  addressInfo: [],
  orderInfo: {},
};
const actions = {
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo();
    if (result.code == 200) {
      commit("GETUSERADDRESS", result.data);
      return Promise.resolve("Get user address success");
    } else {
      return Promise.reject(
        "Get user address info failed, error code: " +
          result.code +
          ":" +
          result.message
      );
    }
  },
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo();
    if (result.code == 200) {
      commit("GETORDERINFO", result.data);
      return Promise.resolve("Get order info success");
    } else {
      return Promise.reject(
        "Get order info failed, error code: " +
          result.code +
          ":" +
          result.message
      );
    }
  },
};
const mutations = {
  GETUSERADDRESS(state, addressInfo) {
    state.addressInfo = addressInfo;
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  },
};
const getters = {
  addressInfo(state) {
    return state.addressInfo;
  },
  orderInfo(state) {
    return state.orderInfo;
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
