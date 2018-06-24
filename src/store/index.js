import _ from 'underscore';
import lscache from 'lscache';
import Vue from 'vue';
import Vuex from 'vuex';
import cookies from '~assets/legacy/utils/cookies'; // TODO: remove
import CONFIG from '~config/';
import api from '~config/api';

import user from './user';
import auth from './auth';
import search from './search';
import human from './human';
import about from './about';
import results from './results';
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
    search,
    human,
    about,
    results,
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
    mute: false,
  },
  actions: {
    LOAD_API_TOKEN({commit}) {
      const token = cookies.get('jwt');
      commit('setApiToken', {apiToken: token});
      api.contacts.initial.setAuthKey(token); // TODO: Переписать API
      api.contacts.intimate.setAuthKey(token);
    },
  },
  mutations: {
    load(state) {
      state.mute = lscache.get('app.mute');
      state.locale = lscache.get('app.locale');
    },
    setApiToken(state, data) {
      if (data) {
        _.assign(state, data);
      }
      // console.log(state)
    },
    simple(state, data) {
      state.simple = data == true;
    },
    ready(state, data) {
      state.ready = data == true;
    },

    mute(state) {
      state.mute = state.mute !== true;
      lscache.set('app.mute', state.mute);
    },
    lang(state, lang) {
      state.locale = lang;
      lscache.set('app.locale', lang);
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

export {Vue, store};
