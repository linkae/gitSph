// 按需引入 ElementUI
import Vue from "vue";
import { Button, MessageBox } from "element-ui";
Vue.use(Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
