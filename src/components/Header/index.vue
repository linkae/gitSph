<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="isLogin">
            <router-link to="/Login">请登录</router-link>
            <router-link to="/Register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <router-link to="/home">{{ nickName }}</router-link>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            v-model="keyword"
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
          />
          <button
            v-on:click="goSearch"
            class="sui-btn btn-xlarge btn-danger"
            type="button"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
      isLogin: true,
    };
  },
  mounted() {
    this.$bus.$on("clearInput", () => {
      this.keyword = "";
    });
    // 获取用户信息展示，已在api请求头中添加token
    // 为防止刷新页面用户数据丢失，需要在mounted中加上此段代码
    this.$store
      .dispatch("getUserInfo")
      .then((resolve) => {
        this.isLogin = false;
        console.log(resolve);
      })
      .catch((error) => {
        console.warn(error);
      });
  },
  methods: {
    goSearch() {
      let location = {
        name: "search",
        params: { keyword: this.keyword || undefined },
      };
      // 如果有 query 参数也捎带过去
      if (this.$route.query) {
        location.query = this.$route.query;
        this.$router.push(location);
      } else {
        this.$router.push(location);
      }
    },
    logout() {
      // 通知服务器，清除token
      this.$store
        .dispatch("userLogout")
        .then((resolve) => {
          this.isLogin = true;
          this.$router.push("/login");
          console.log(resolve);
        })
        .catch((error) => {
          console.warn(error);
        });
    },
  },
  watch: {
    $route: {
      handler() {
        // 获取用户信息展示，已在api请求头中添加token
        if (this.$route.params.isLogin) {
          this.$store
            .dispatch("getUserInfo")
            .then((resolve) => {
              this.isLogin = false;
              console.log(resolve);
            })
            .catch((error) => {
              console.warn(error);
            });
        }
      },
    },
  },
  computed: {
    ...mapGetters(["nickName"]),
  },
  beforeDestroy() {
    this.$bus.$off("clearInput", () => {
      console.log("ClearInput event unbound from $bus");
    });
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;
          a {
            &:hover {
              cursor: pointer;
              color: lightcoral !important;
            }
          }
          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>  