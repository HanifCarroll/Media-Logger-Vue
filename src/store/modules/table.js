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
          const tableData = res.data;
          tableData.forEach((data) => {
            switch (data.postedBy) {
              case '398298080874725388':
                data.postedBy = 'Tu';
                break;
              case '141338854312378368':
                data.postedBy = 'Hanif';
                break;
              case '283713846399467522':
                data.postedBy = 'Jake';
                break;
              case '163725284569382914':
                data.postedBy = 'Trevor';
                break;
              case '595029868257869854':
                data.postedBy = 'James';
                break;
              case '482708877276610560':
                data.postedBy = 'Stefan';
                break;
              case '593027116312952834':
                data.postedBy = 'Alan';
                break;
              case '398475220190756875':
                data.postedBy = 'Adam';
                break;
              default:
            }
          });
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
