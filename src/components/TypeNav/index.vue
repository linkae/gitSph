<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div
      class="container"
      v-on:mouseleave="
        changeIndex(-1);
        hideTypeNav();
      "
    >
      <div v-on:mouseenter="showTypeNav">
        <h2 class="all">全部商品分类</h2>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!-- 三级联动 -->
      <transition name="sort">
        <div class="sort" v-show="isShow">
          <div class="all-sort-list2" v-on:click="goSearch">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ currentBackground: currentIndex == index }"
            >
              <h3 v-on:mouseenter="changeIndex(index)">
                <!-- 绑定 data-categoryName 自定义属性（data-命名规范），鼠标点击时，dataset中可以识别出该属性（会自动去掉data-） -->
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <!-- 二级、三级分类 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 按需引入 lodash 实现防抖节流，暴露的是 modules 所以不需要'{}'
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return { currentIndex: -1, isShow: true };
  },
  mounted() {
    if (this.$route.path != "/home") {
      this.isShow = false;
    }
  },
  computed: {
    ...mapState({
      // 右侧为函数，使用 categoryList 时会自动返回 state 中的值。
      // 参数 state 为大仓库中的数据，需要指明是哪个小仓库的数据。
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // throttle函数不要用箭头函数，会有 this 上下文问题
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),

    // 实现导航栏路由跳转，并传递项目的 Name 与 Id 到 Search组件
    goSearch(event) {
      let element = event.target;
      // 解构出需要的值，要用小写
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 如果标签身上有 categoryname 则一定是 a 标签，同理 1id,2id,3id 代表第几级分类导航
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // 合并参数跳转路由，如果带有 params 参数，也捎带过去
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location);
        } else {
          this.$router.push(location);
        }
      }
    },
    showTypeNav() {
      this.isShow = true;
    },
    hideTypeNav() {
      if (this.$route.path != "/home") {
        this.isShow = false;
      }
    },
  },
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              text-decoration: none;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //   已使用 js 重写实现 显示/隐藏
          //   &:hover {
          //     .item-list {
          //       display: block;
          //     }
          //   }
        }
        .currentBackground {
          background: lightcoral;
        }
      }
    }
    // 过渡动画样式
    // 进入的起点
    .sort-enter,
    .sort-leave-to {
      height: 0;
    }
    // 进入的终点
    .sort-enter-to,
    .sort-leave {
      height: 461px;
    }
    // 进入与离开的中间，这里可以写动画持续时间与效果，相当于省略了在对应元素样式中写transition效果
    .sort-enter-active,
    .sort-leave-active {
      overflow: hidden;
      transition: all 0.2s linear;
    }
  }
}
</style>