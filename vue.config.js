const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  // 关闭 eslint
  lintOnSave: false,
  publicPath: "/ShoppingV/",
  // 代理跨域
  devServer: {
    proxy: {
      // 只要是 api 开头的路径都转发给 taget 目标服务器
      "/api": {
        // 请求的服务器地址
        target: "http://gmall-h5-api.atguigu.cn",
      },
    },
  },
});
