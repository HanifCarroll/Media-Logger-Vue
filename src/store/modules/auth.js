import * as axios from 'axios';

function jwtDecode(t) {
  const token = {};
  token.raw = t;
  const [header, payload] = t.split('.');
  token.header = JSON.parse(window.atob(header));
  token.payload = JSON.parse(window.atob(payload));
  return token;
}

export default {
  namespaced: true,

  state: {
    isLoading: false,
    isLoggedIn: false,
    isError: false,
    user: null,
    token: null,
  },

  getters: {},

  mutations: {
    SET_IS_LOADING(state, value) {
      state.isLoading = value;
    },

    SET_IS_LOGGED_IN(state, value) {
      state.isLoggedIn = value;
    },

    SET_IS_ERROR(state, value) {
      state.isError = value;
    },

    SET_USER(state, user) {
      state.user = user;
    },

    SET_TOKEN(state, token) {
      state.token = token;
    },
  },

  actions: {
    login({ commit }, user) {
      commit('SET_IS_LOADING', true);
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/auth/login', user)
          .then((res) => {
            const decoded = jwtDecode(res.data.access_token);
            commit('SET_TOKEN', decoded);
            commit('SET_IS_LOGGED_IN', true);
            resolve();
          })
          .catch((err) => {
            commit('SET_IS_ERROR', true);
            reject(err);
          })
          .finally(() => {
            commit('SET_IS_LOADING', false);
          });
      });
    },
  },
};
