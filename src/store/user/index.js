// 登录与注册模块
import {
  reqGetCaptchaCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout,
} from "@/api/index";
const state = {
  userInfo: {},
};
const actions = {
  async getCaptchaCode({ commit }, phoneNum) {
    let result = await reqGetCaptchaCode(phoneNum);
    if (result.code == 200) {
      return Promise.resolve(result.data);
    } else {
      return Promise.reject(
        "Send captcha code failed, error code:" +
          result.code +
          ":" +
          result.message
      );
    }
  },
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    if (result.code == 200) {
      return Promise.resolve();
    } else {
      return Promise.reject(
        "Register failed, error code:" + result.code + ":" + result.message
      );
    }
  },
  async userLogin({ commit }, user) {
    let result = await reqUserLogin(user);
    if (result.code == 200) {
      return Promise.resolve(result.data.token);
    } else {
      return Promise.reject(
        "Login failed, error code:" + result.code + ":" + result.message
      );
    }
  },
  async getUserInfo({ commit }) {
    // 已经在请求头中添加了token
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit("GETUSERINFO", result.data);
      return Promise.resolve("Get user info success");
    } else {
      return Promise.reject(
        "Get user information failed, error code:" +
          result.code +
          ":" +
          result.message
      );
    }
  },
  async userLogout({ commit }) {
    let result = await reqLogout();
    if (result.code == 200) {
      commit("USERLOGOUT");
      return Promise.resolve("User info deleted");
    } else {
      return Promise.reject(
        "Deleting user information failed, error code:" +
          result.code +
          ":" +
          result.message
      );
    }
  },
};
const mutations = {
  GETCAPTCHACODE(state, captchaCode) {
    state.captchaCode = captchaCode;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  USERLOGOUT(state) {
    state.userInfo = {};
    sessionStorage.removeItem("token");
  },
};
const getters = {
  nickName(state) {
    return state.userInfo.nickName;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
