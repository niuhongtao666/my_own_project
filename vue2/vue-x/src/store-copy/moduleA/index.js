import Vue from 'vue';

const moduleA = {
    namespaced: true,
    state: {
        name: '12345'
    },
    mutations: {
        changeState(state, payload) {
            console.log(payload)
            state.name = payload;
        },

    },
    getters: {

    },
    actions: {

    },
};
export default moduleA;