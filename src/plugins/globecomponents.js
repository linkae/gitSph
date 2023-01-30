import Vue from "vue";
// 定义全局组件
import TypeNav from "@/components/TypeNav";
import Pagination from "@/components/Pagination";
// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination);
