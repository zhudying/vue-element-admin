import { getLogin, getRoles, logout } from '@/api/login'
import { getStore, setStore, clearStore } from '@/utils/store';
const state = {
  menuList: getStore({ name: 'MENU_LIST' }) || [],
  token: getStore({ name: 'TOKEN' }) || '',
  refreshToken: getStore({ name: 'REFRESH_TOKEN' }) || '',
};

const mutations = {
  SET_MENU(state, menu) {
    state.menuList = menu
    setStore({ name: 'MENU_LIST', content: state.menuList, type: 'session' })
  },
  SET_TOKEN(state, token) {
    state.token = token
    setStore({ name: 'TOKEN', content: state.token, type: 'session' })
  },
  REFRESH_TOKEN(state, refreshToken) {
    state.token = refreshToken
    setStore({ name: 'REFRESH_TOKEN', content: state.token, type: 'session' })
  }
};

const actions = {
  // 登录
  LOGIN({ state, commit, dispatch }) {
    return new Promise((resolve, reject) => {
      getLogin().then(res => {
        let { data } = res
        commit('SET_TOKEN', data.data.token)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 登出
  LOGOUT({ state, commit, dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(res => {
        let { data } = res
        commit('SET_TOKEN', '')
        commit('SET_MENU', [])
        commit('REFRESH_TOKEN', '')
        clearStore({ type: 'session' })
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取路由
  GET_MENU({ state, commit, dispatch }) {
    return new Promise((resolve, reject) => {
      getRoles().then(res => {
        let { data } = res
        commit('SET_MENU', data.data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
};

export default {
  state,
  mutations,
  actions
};
