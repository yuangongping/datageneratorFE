import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    datatypeConfigArr: [
      {
        text1: 'text'
      }
    ],
  },
  mutations: {
    ADD_CONFIG_ITEM: (state, item) => {
      state.datatypeConfigArr.push(item);
    }
  },
  actions: {

  },
  getters: {
    datatypeConfigArr: state => {
      return state.datatypeConfigArr;
    }
  }
})
