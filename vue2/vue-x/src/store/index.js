import Vue from 'vue';
import Vuex from './my-vuex';
import moduleA from './moduleA/index'
import saveStore from '@/store/plugins/saveStore.js'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        counter: 12
    },
    mutations: {
        add(state) {
            // state从哪来？
            state.counter++;
        }
    },
    actions: {
        add({ commit }) {
            //参数哪里来的
            commit('add')
        }
    },
    modules: {
        a: moduleA,
    },
    getters: {
        myGetter(state) {
            return state.counter * 2;
        }
    }
    // plugins: [saveStore]
})

export default store;