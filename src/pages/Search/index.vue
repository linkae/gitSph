<template>
  <div>
    <type-nav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i v-on:click="removeBread(0)">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i v-on:click="removeBread(1)">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i v-on:click="removeBread(2)">×</i>
            </li>
            <!-- 平台售卖属性的面包屑，用户可能选择多个属性，所以要v-for -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1]
              }}<i v-on:click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector 通过绑定自定义事件函数实现：子传父数据-->
        <search-selector
          v-on:trademarkInfo="trademarkInfo"
          v-on:attrInfo="attrInfo"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="{ active: isActive1 }"
                  v-on:click="changeOrder('1')"
                >
                  <a
                    >综合<ion-icon :name="isAsc" v-show="isShow1"></ion-icon
                  ></a>
                </li>
                <li
                  :class="{ active: isActive2 }"
                  v-on:click="changeOrder('2')"
                >
                  <a
                    >销量<ion-icon :name="isAsc" v-show="isShow2"></ion-icon
                  ></a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 路由跳转，将商品id传递过去 -->
                    <router-link :to="`/detail/${goods.id}`"
                      ><img v-lazy="goods.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器，默认连续页码为5 -->
          <Pagination
            @getPageNo="getPageNo"
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continue="5"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector";
import { mapGetters } from "vuex";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      // 请求参数，根据请求返回的数据来渲染页面
      searchParams: {
        // 多级分类 id
        category1Id: undefined,
        category2Id: undefined,
        category3Id: undefined,
        // 分类名字
        categoryName: undefined,
        // 关键字
        keyword: undefined,
        // 结果排序（升序/降序）
        order: "1:desc",
        // 分页器，代表当前第几页
        pageNo: 1,
        // 每页展示的数据个数
        pageSize: 10,
        // 平台售卖属性带的参数（品牌，内存，系统等）
        props: [],
        trademark: undefined,
      },
    };
  },
  beforeMount() {
    // 复杂写法：
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // ...
    // 使用 ES6 新增语法：Object.assign 合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // 首次挂载时，合并 TypeNav 传递来的数据，然后发送请求
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
      // 把 123 级分类的id置空，清除历史数据
      // 设为 undefined 不会发给服务器，减少带宽消耗
      // 置空操作不能放最上边，否则 mounted 初次挂载会受影响
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
    removeBread(value) {
      // 0代表categoryName, 1代表keyword，2代表trademark
      if (value == 0) {
        this.searchParams.categoryName = undefined;
        // 路径也要改变
        this.$router.push({ name: "search", params: this.$route.params });
      }
      if (value == 1) {
        this.searchParams.keyword = undefined;
        // 通知兄弟组件 Header 清除搜索框关键字
        this.$bus.$emit("clearInput");
        this.$router.push({ name: "search", query: this.$route.query });
      }
      if (value == 2) {
        // 参数置空，并重新发送请求
        // getData相当于使用原有参数（如果有的话）query,params发起请求（类似回退操作）
        // 所以此时使用 $router.push 因为参数没有变化，监听不到，也就无法触发watch中的getData，
        // 并且trademark并没有传递query/params参数，不需要$router.push
        this.searchParams.trademark = undefined;
        this.getData();
      }
    },
    trademarkInfo(trademark) {
      // 整理参数，这里必须要同时接收 tmId 和 tmName，不然请求不到正确的数据
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    attrInfo(attr, attrValue) {
      // [属性ID:属性值:属性名] 按此格式保存在参数中的 attrs 里，需要去重
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }

      this.getData();
    },
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    changeOrder(flag) {
      // flag：1代表综合，2代表价格
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
      let newOrder = "";
      // 如果相等表明用户点击的是同一个排序项（综合/价格）
      if (originFlag == flag) {
        newOrder = `${originFlag}:${originSort == "asc" ? "desc" : "asc"}`;
      } else {
        // 默认降序，当点击的不是同一个排序项，将searchParas改为目标项的参数
        newOrder = `${flag}:desc`;
      }
      this.searchParams.order = newOrder;
      this.getData();
    },
    getPageNo(pageNo) {
      // 自定义事件，获取当前第几页，从服务器返回数据
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
  },
  computed: {
    ...mapGetters(["goodsList", "total"]), // 没有开启命名空间'namespaced'的getters是不分模块的
    isActive1() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isActive2() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      if (this.searchParams.order.indexOf("asc") != -1) {
        return "arrow-up";
      } else if (this.searchParams.order.indexOf("desc") != -1) {
        return "arrow-down";
      } else {
        throw new Error("Not a specific order params");
      }
    },
    isShow1() {
      return this.searchParams.order.indexOf(1) != -1;
    },
    isShow2() {
      return this.searchParams.order.indexOf(2) != -1;
    },
  },
  watch: {
    // 监听路由，每当点击搜索和导航栏项时，会改变路由身上的 query,params 参数，可以被监听到
    $route(newValue, oldValue) {
      // 需要再次重新整理参数数据
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>