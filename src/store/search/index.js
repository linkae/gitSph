import { reqSearchList } from "@/api";
// search 模块的仓库
const state = {
  searchList: {},
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  // 当前接口至少传递一个空对象参数
  async getSearchList({ commit }, params) {
    let result = await reqSearchList(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};
// 服务器返回的数据可能很复杂，可以用 getters 简化数据的获取
const getters = {
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
  total(state) {
    return state.searchList.total || 0;
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
