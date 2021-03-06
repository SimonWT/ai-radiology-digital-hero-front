import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user_email: localStorage.getItem('user_email') || '',
    observation: {}
  },
  mutations: {
    SET_USER(state, data) {
      state.user_email = data;
      localStorage.setItem('user_email', data);
    },
    SET_OBSERVATION(state, payload) {
      state.observation = payload
    },
    REMOVE_USER(state) {
      state.user_email = null
      localStorage.removeItem('user_email')
    }
  },
  actions: {
    async fetchUser({ commit, getters, dispatch }, user) {
      console.log('fetching');
      commit('SET_USER', user.email);
    },
    setObservation({commit}, payload){
      
      commit('SET_OBSERVATION', payload)
    },
    logout({commit}) {
      console.log('logginout');
      commit('REMOVE_USER')
    }
  },
  getters: {
    user_email(state) {
      return state.user_email;
    },
    isLoggedIn: (state) => !!state.user_email,
    observation: (state) => state.observation
  },
  modules: {},
});
