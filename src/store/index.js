import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    skin: {
      skin: '',
      textSkin: '',
      activeTextSkin: ''
    }
  },
  mutations: {
    changeSkin: (state, data) => {
      state.skin = data
    }
  },
  actions: {
  },
  modules: {
  }
})
