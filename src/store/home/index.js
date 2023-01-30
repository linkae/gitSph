import { reqCategoryList, reqBannerList, reqFloorList } from "@/api";

// home 模块的仓库
const state = {
  // 接口返回的数据是数组，所以定义为数组类型
  categoryList: [],
  bannerList: [],
  floorList: [],
};
const mutations = {
  GETCATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
const actions = {
  // 获取导航栏数据，只使用 commit 所以解构出来
  async getCategoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code === 200) {
      commit("GETCATEGORYLIST", result.data);
    }
  },

  // 获取轮播图数据
  async getBannerList({ commit }) {
    let result = await reqBannerList();
    if (result.code === 200) {
      commit("GETBANNERLIST", result.data);
    }
  },

  // 获取底部轮播图数据
  async getFloorList({ commit }) {
    let result = await reqFloorList();
    if (result.code === 200) {
      commit("GETFLOORLIST", result.data);
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
