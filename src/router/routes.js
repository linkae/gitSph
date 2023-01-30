export default [
  {
    // 占位，用来登录成功后重新渲染Header组件显示用户信息
    path: "/home",
    name: "home",
    component: () => import("@/pages/Home"),
    meta: { show: true },
  },
  {
    path: "/search/:keyword?",
    name: "search",
    component: () => import("@/pages/Search"),
    meta: { show: true },
  },
  {
    path: "/login",
    component: () => import("@/pages/Login"),
    meta: { show: true },
  },
  {
    path: "/register",
    component: () => import("@/pages/Register"),
    meta: { show: true },
  },
  {
    path: "/detail/:skuid?",
    component: () => import("@/pages/Detail"),
    meta: { show: false },
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: () => import("@/pages/AddCartSuccess"),
    meta: { show: true },
  },
  {
    path: "/shopcart",
    name: "shopcart",
    component: () => import("@/pages/ShopCart"),
    meta: { show: true },
  },
  {
    path: "/trade",
    name: "trade",
    component: () => import("@/pages/Trade"),
    meta: { show: true },
    // 路由独享守卫，只有从shopcart页面来的才能通过
    beforeEnter: (to, from, next) => {
      if (from.path == "/shopcart") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/pay",
    component: () => import("@/pages/Pay"),
    meta: { show: true },
    // 只有从trade页面来的才能通过
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/paysuccess",
    component: () => import("@/pages/PaySuccess"),
    meta: { show: true },
    // 详见组件内守卫
  },
  {
    path: "/center",
    component: () => import("@/pages/Center"),
    meta: { show: true },
    // 子路由
    children: [
      {
        path: "myorder",
        component: () => import("@/pages/Center/myOrder"),
      },
      {
        path: "grouporder",
        component: () => import("@/pages/Center/groupOrder"),
      },
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
  {
    // 重定向，项目运行时定向到首页
    path: "*",
    redirect: "/home",
  },
];
