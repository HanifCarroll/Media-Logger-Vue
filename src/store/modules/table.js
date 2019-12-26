import * as axios from 'axios';
import { Notify } from 'quasar';

export default {
  namespaced: true,

  state: {
    tableData: [],
    isLoading: false,
    isError: false,
  },

  getters: {
    youtube(state) {
      return state.tableData.filter(media => media.service.toLowerCase() === 'youtube');
    },

    soundcloud(state) {
      return state.tableData.filter(media => media.service.toLowerCase() === 'soundcloud');
    },

    spotify(state) {
      return state.tableData.filter(media => media.service.toLowerCase() === 'spotify');
    },
  },

  mutations: {
    SET_TABLE_DATA(state, newData) {
      state.tableData = newData;
    },

    SET_IS_LOADING(state, newStatus) {
      state.isLoading = newStatus;
    },

    SET_IS_ERROR(state, newStatus) {
      state.isError = newStatus;
    },
  },

  actions: {
    loadTableData({ commit }) {
      commit('SET_IS_LOADING', true);
      axios.get('http://localhost:3000/media')
        .then((res) => {
          commit('SET_TABLE_DATA', res.data);
        })
        .catch((err) => {
          console.warn('err', err);
          commit('SET_IS_ERROR', true);
          Notify.create({
            color: 'red-4',
            textColor: 'white',
            icon: 'error',
            message: 'Something went wrong.',
            timeout: 2000,
          });
        })
        .finally(() => {
          commit('SET_IS_LOADING', false);
        });
    },
  },
};