import _ from 'underscore';
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
// import cookies from '~assets/legacy/utils/cookies'; // TODO: remove
// import CONFIG from '~config/';
// import api from '~config/api';

import user from './user';
import token from './token';
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
import message from './message';

Vue.use(Vuex);

// const vuexLocal = new VuexPersist({
//
// })
const VuexLocalStorage = new VuexPersist({
  reducer(state) {
    return _.omit(state, ['auth']);
  },
});

const store = new Vuex.Store({
  plugins: [
    VuexLocalStorage.plugin,
  ],
  modules: {
    user,
    token,
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
    message,
  },
  state: {
    ready: false,
    authorized: false,
    locale: 'ru',
    apiToken: '',
    grecaptchaToken: null,
    simple: false,
    mute: false,
    update: false,
    hideLine: false,
    promt: false,
    // scrolling: false,
    autoPaste: true,
  },
  mutations: {
    authorize(state, value) {
      state.authorized = (value === true);
    },
    simple(state, data) {
      state.simple = data == true;
    },
    ready(state, data) {
      state.ready = data == true;
    },

    showLine(state, data) {
      state.hideLine = data !== true;
    },

    pasting(state, data) {
      console.log('pasting', [state.autoPaste, data]);
      state.autoPaste = data == true;
    },
    mute(state) {
      state.mute = state.mute !== true;
    },
    lang(state, lang) {
      state.locale = lang;
    },
    grecaptchaTokenUpdate(state, data) {
      if (data) {
        state.grecaptchaToken = data;
      }
    },
    promted(state, data) {
      state.promt = data == true;
    },
    // stopScrolling(state, value) {
    //   state.scrolling = (value === true);
    // },
    updateAvailable(state, value) {
      state.update = (value == true);
    },
  },
  getters: {
    registered(state) {
      return !!state.apiToken;
    },
  },
});

export {Vue, store};
