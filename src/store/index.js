import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user_email: localStorage.getItem('user_email') || '',
  },
  mutations: {
    SET_USER(state, data) {
      state.user_email = data;
      localStorage.setItem('user_email', data);
    },
  },
  actions: {
    async fetchUser({ commit, getters, dispatch }, user) {
      console.log('fetching');
      commit('SET_USER', user.email);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    isLoggedIn: (state) => !!state.user_email,
  },
  modules: {},
});
