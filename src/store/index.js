import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    speed: 5
  },
  mutations: {
    SET_SPEED(state, speed) {
      state.speed = speed
    }
  },
  actions: {},
  modules: {}
})
