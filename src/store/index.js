import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 引入其他模块的小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";

// const state = {};
// const actions = {};
// const mutations = {};
// const getters = {};
// export default {
//   state,
//   actions,
//   mutations,
//   getters,
// };

export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade,
  },
});
