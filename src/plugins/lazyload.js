// 引入 注册 lazyload 懒加载插件
import Vue from "vue";
import VueLazyload from "vue-lazyload";
const loadimage = require("../assets/logo.png");
Vue.use(VueLazyload, {
  // 懒加载时默认图片
  loading: loadimage,
});
