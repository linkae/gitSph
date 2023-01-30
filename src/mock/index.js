// 先引入mockjs模块
import Mock from "mockjs";

// 把JSON数据格式引入进来，JSON文件不需要暴露，直接引入
// webpack 默认对外暴露：图片、JSON
import banner from "./banner.json";
import floor from "./floor.json";
import baseCategoryList from "./baseCategoryList.json";

//mock数据：Mock.mock("请求地址", {请求数据})
Mock.mock("/mock/product/getBaseCategoryList", {
  code: 200,
  data: baseCategoryList,
});

Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
