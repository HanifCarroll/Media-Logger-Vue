import axiosInstance from '../../utils/axiosInstance';

function jwtDecode(t) {
  const token = {};
  const [header, payload] = t.split('.');
  token.raw = t;
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
        axiosInstance.post('/auth/login', user)
          .then((res) => {
            const decoded = jwtDecode(res.data.access_token);
            commit('SET_USER', { username: decoded.payload.username, id: decoded.payload.id });
            commit('SET_TOKEN', decoded);
            commit('SET_IS_LOGGED_IN', true);
            commit('SET_IS_ERROR', false);
            localStorage.setItem('auth-token', decoded.raw);
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

    logout({ commit }) {
      commit('SET_TOKEN', null);
      commit('SET_IS_LOGGED_IN', false);
      commit('SET_USER', null);
    },
  },
};
