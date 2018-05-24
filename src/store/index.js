import _ from 'underscore';
import Vue from 'vue';
import Vuex from 'vuex';
import cookies from '~assets/legacy/utils/cookies'; // TODO: remove
import CONFIG from '~config/';
import api from '~config/api';

import user from './user/';
import auth from './auth';
import about from './about';
import search from './search';
import contacts from './contacts';
import desires from './desires';
import visited from './visited';
import accepts from './accepts';
import modals from './modals';
import notes from './notes';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    auth,
    about,
    search,
    contacts,
    desires,
    visited,
    accepts,
    modals,
    notes,
  },
  state: {
    ready: false,
    locale: 'ru',
    apiToken: '',
    grecaptchaToken: null,
    photoServer: CONFIG.API_PHOTO,
    simple: false,
  },
  actions: {
    LOAD_API_TOKEN({commit}) {
      const token = cookies.get('jwt');
      commit('setApiToken', {apiToken: token});
      console.log('apiToken', token);
      api.contacts.initial.setAuthKey(token); // TODO: Переписать API
      api.contacts.intimate.setAuthKey(token);
    },
  },
  mutations: {
    setApiToken(state, data) {
      if (data) {
        _.assign(state, data);
      }
      // console.log(state)
    },
    simple(state, data) {
      state.simple = (data == true);
    },
    ready(state, data) {
      state.ready = (data == true);
    },
    grecaptchaTokenUpdate(state, token) {
      if (token) {
        state.grecaptchaToken = token;
      }
    },
  },
  getters: {
    registered(state) {
      return !!state.apiToken;
    },
  },
});

store.dispatch('LOAD_API_TOKEN');
store.dispatch('accepts/LOAD');
store.dispatch('LOAD_USER');

export {Vue, store};
