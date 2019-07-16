import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        storeConfigs: [],
        storeQuote: null,
    },
    mutations: {
        SET_STORE_CONFIGS: (state, configs) => {
            state.storeConfigs = configs;
        },
        SET_STORE_QUOTE: (state, quote) => {
            state.storeQuote = quote;
        }
    },
    actions: {

    },
    getters: {
        storeConfigs: state => {
            return state.storeConfigs;
        },
        storeQuote: state => {
            return state.storeQuote;
        },
    }
})