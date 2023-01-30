<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- 在 Home 、Search 页面显示，在登录、注册时隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 请求导航栏数据并保存
    this.$store.dispatch("getCategoryList");
  },
};
</script>

<style>
</style>
