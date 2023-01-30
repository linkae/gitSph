// 对于 axios 二次封装
import axios from "axios";

// 引入页面加载进度条，以及其样式表
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const requests = axios.create({
  // 接口路径当中都有 api，设置 baseURL 可以在端口号后默认带上 /api，不需要手动填写
  baseURL: "/api",
  // 代表请求超时的时间 5s
  timeout: 5000,
});

// 请求拦截器，在发请求之前可以监测到，从而做一些事情
requests.interceptors.request.use((config) => {
  // config 配置对象，有一个 headers 请求头很重要
  if (sessionStorage.getItem("uuidToken")) {
    // 给请求头添加一个字段(userTempId)，与后端提前确认
    config.headers.userTempId = store.state.detail.uuidToken;
  }
  // 携带 token 发给服务器
  if (sessionStorage.getItem("token")) {
    config.headers.token = sessionStorage.getItem("token");
  }
  nprogress.start();
  return config;
});

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 成功的回调函数：服务器响应数据回来以后，可以做一些事情
    nprogress.done();
    return res.data;
  },
  (reason) => {
    return reject(reason); //响应失败的回调函数 终止promise链
  }
);

export default requests;
