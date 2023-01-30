import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// 引入仓库
import store from "@/store";
// 模拟数据
import "@/mock";
// 引入 Swiper 样式，在需要用轮播图的组件中 import Swiper from "swiper";
import "swiper/css/bundle";
// 统一接口api里面全部请求函数
import * as API from "@/api";

// 插件
import "@/plugins/globecomponents";
import "@/plugins/lazyload";
import "@/plugins/elementui";
import "@/plugins/veevalidate";

Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store,
}).$mount("#app");
