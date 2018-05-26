import _ from 'underscore';
import lscache from 'lscache';
import api from '~config/api';

import search from './search';
// import contacts from './contacts';

export default {
  modules: {search},
  state: {
    uid: 0,
    sex: 0,
    age: 0,
    name: '',
    city: '',
    up: null,
    to: null,
    any: 0,
    virt: 0,
    contacts: {
      em: 0,
      vk: 0,
      ok: 0,
      fb: 0,
      go: 0,
      sk: 0,
      ph: 0,
    },
    tags: {
      str: '',
    },
    status: 0,
    promt: null,
    last: '',
  },
  actions: {
    LOAD_USER({commit}) {
      // if (uid) {
      //     commit('loadUser', {uid});
      // }
      commit('loadUser', lscache.get('user.data'));
    },

    REGISTRATION(context, token) {
      if (token) {
        api.user.regnow(token).then(() => {
          window.location.reload();
        });
      }
    },

    SAVE_SEX({commit}, {sex, token}) {
      commit('loadUser', {sex, name: ''});
      return api.user.saveSex(sex, token);
    },
    SAVE_AGE({state, commit}, age) {
      if (age && state.age != age) {
        api.user.saveAge(age).then(() => {});
        commit('loadUser', {age});
      }
    },
    SAVE_NAME({state, commit}, name) {
      if (name && state.name != name) {
        return api.user.saveName(name).then(() => {
          commit('loadUser', {name});
        });
      }
      return null;
    },
    SAVE_CITY({state, commit}, city) {
      if (city && state.city != city) {
        api.user.saveCity(city).then(() => {});
        commit('loadUser', {city});
      }
    },
    SAVE_CONTACTS({commit}, contacts) {
      api.user.saveContacts(contacts).then(() => {});
      commit('loadUser', {contacts});
    },
    SAVE_SEARCH({commit}, data) {
      commit('loadUser', data);
      return api.user.saveSearch(data).then(() => {});
    },
  },
  mutations: {
    loadUser(state, data) {
      _.assign(state, data);
      lscache.set('user.data', state, 23456);
    },
    resetUser(state, data) {
      const {uid, city, sex, age, name, contacts, apromt: promt} = data; // User module

      _.assign(state, {uid, city, sex, age, name, contacts, promt});
      lscache.set('user.data', state, 23456);
    },
    settings(state, data) {
      _.assign(state, data);
      lscache.set('user.data', state, 23456);
    },
    personal(state, {city, sex, age, name}) {
      _.assign(state, {city, sex, age, name});
      lscache.set('user.data', state, 23456);
    },
  },
};
