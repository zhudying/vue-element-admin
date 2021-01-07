import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import user from "./components/user";
import tags from "./components/tags";
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  // 注册模块
  modules: {
    user,
    tags
  },
  getters
  // plugins: [createPersistedState()]
});
