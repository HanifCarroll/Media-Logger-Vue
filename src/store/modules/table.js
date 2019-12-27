import { Notify } from 'quasar';
import axiosInstance from '../../utils/axiosInstance';

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
      axiosInstance.get('/media')
        .then((res) => {
          commit('SET_TABLE_DATA', res.data);
        })
        .catch(() => {
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
