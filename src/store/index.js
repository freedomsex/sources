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
import desires from './desires';
import visits from './visits';
import accepts from './accepts';
import modals from './modals';
import notes from './notes';
import message from './message';
import client from './client';
import notice from './notice';
import feedback from './feedback';
import moderator from './moderator';

import {initials, intimates, offers} from './contacts';

Vue.use(Vuex);

// const vuexLocal = new VuexPersist({
//
// })
const VuexLocalStorage = new VuexPersist({
  reducer(state) {
    return _.omit(state, [
      'back',
      'auth',
      'visits',
      'notes',
      'human',
      'message',
      'search',
    ]);
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
    desires,
    visits,
    accepts,
    modals,
    notes,
    message,
    client,

    initials,
    intimates,
    offers,
    notice,
    feedback,
    moderator,
  },
  state: {
    back: null,
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
    trustCheck: true,
    clientId: null,
    verified: false,
  },
  mutations: {
    navigate(state, name) {
      state.back = name;
    },
    authorize(state, value) {
      state.authorized = (value === true);
    },
    simple(state, data) {
      state.simple = data === true;
    },
    ready(state, data) {
      state.ready = data === true;
    },
    verify(state) {
      state.verified = true;
    },

    showLine(state, data) {
      state.hideLine = data !== true;
    },

    pasting(state, data) {
      state.autoPaste = data === true;
    },

    trusting(state) {
      state.trustCheck = state.trustCheck === false;
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
      state.promt = data === true;
    },
    // stopScrolling(state, value) {
    //   state.scrolling = (value === true);
    // },
    updateAvailable(state, value) {
      state.update = (value === true);
    },
  },
  getters: {
    registered(state) {
      return !!state.apiToken;
    },
  },
});

export {Vue, store};
