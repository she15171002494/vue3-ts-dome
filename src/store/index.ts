import { createStore } from 'vuex'
const state = {
  allRoutes: [],
  name: '名字',
  asyncRoutesMark: false,
  menu: [],
  routers: [],
}
const mutations = {
  setAsyncRoutesMark(state, data) {
    state.asyncRoutesMark = data
  },

  setMenuList(state, data) {
    state.menu = data
  },

  setRouters(state, data) {
    state.routers = data
  },

  setName(state, data) {
    state.name = data
  },
}

const actions = {
  asyncSetName(store, payload) {
    // 第一个参数是vuex固定的参数，不需要手动去传递
    store.commit('setName', payload)
  },
}
const options = {
  state,
  mutations,
  actions,
}
const store = createStore(options)
export default store
