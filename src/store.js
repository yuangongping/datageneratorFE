import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        storeConfigs: [],
        storeQuote: null,
        casePage: 1,
        numPerPage: 15,
        suggestionPage:1
    },
    mutations: {
        SET_CONFIGS: (state, configs) => {
            state.storeConfigs = configs;
        },
        SET_QUOTE: (state, quote) => {
            state.storeQuote = quote;
        },
        SET_CASE_PAGE: (state, casePage) => {
            state.casePage = casePage;
        },
        SET_SUGGESTION_PAGE: (state, suggestionPage) => {
            state.suggestionPage = suggestionPage;
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
        storeCasePage: state => {
            return state.casePage;
        },
        storeSuggestionPage: state => {
            return state.suggestionPage;
        },
        storeNumPerPage: state => {
            return state.numPerPage;
        }
    }
})