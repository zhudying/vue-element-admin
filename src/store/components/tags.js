import router from "@/router";
import { getStore, setStore } from '@/utils/store';

const state = {
  tags: getStore({ name: 'TAGS' }) || []
};
const mutations = {
  ADD_TAGS(state, val) {
    if (state.tags.length > 10) state.tags.shift();
    let route = state.tags.some(item => item.path == val.path)
    if (!route) {
      let obj = Object.assign({}, val);
      state.tags.push(obj);
    }
    setStore({ name: 'TAGS', content: state.tags, type: 'session' })
  },
  DEL_TAGS(state, item) {
    // 判断删除当前页的tags，如果是则路由跳到最后一个tags
    if (state.tags.length === 1) return

    let index = state.tags.findIndex(({ path }) => path === item.path)
    state.tags.splice(index, 1);
    setStore({ name: 'TAGS', content: state.tags, type: 'session' })
  },
  ALL_TAGS(state, data) {
    state.tags = data;
    setStore({ name: 'TAGS', content: state.tags, type: 'session' })
  }
}

export default {
  state,
  mutations
}
