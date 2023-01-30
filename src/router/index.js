import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);

// 先把 VueRouter 原型对象的 push, replace 备份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写 push, replace，（防止连续同一地点跳转时弹出错误警告）
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

let router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

// 设置路由守卫，再跳转前判断条件
// to: 到哪个路由，可以获取该路由信息，同下
// from: 从哪个路由来
// next: 放行，或next('path')指定放行到哪个路由; 或next(false)，中断当前导航，重置到from对应地址
router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem("token")) {
    if (to.path == "/login") {
      next(false);
    } else {
      next();
    }
  } else {
    // 没有登录的情况，其他路径在 独享路由 内配置比较方便
    if (to.path == "/shopcart" || to.path == "/center/myorder") {
      // 临时保存要去路径的信息，在用户登录后直接跳转到保存的页面
      next("/login?redirect=" + to.path);
    } else {
      next();
    }
  }
});

export default router;
