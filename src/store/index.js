import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import table from './modules/table';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default new Vuex.Store({
  modules: {
    auth,
    table,
  },
  getters: {
    isLoggedIn: (state, getters, rootState) => rootState.auth.isLoggedIn,
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV,
});
