import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    speed: 5,
    count: 10
  },
  mutations: {
    SET_SPEED(state, speed) {
      state.speed = speed
    },
    SET_GENERATOR_LENGTH(state, count) {
      state.count = count
    }
  },
  actions: {},
  modules: {}
})
