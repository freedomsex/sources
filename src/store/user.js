import _ from 'underscore';
// import lscache from 'lscache';
import api from '~config/api';

// import contacts from './contacts';

const userState = {
  uid: 0,
  sex: 0,
  age: 0,
  name: '',
  city: '',
  up: null,
  to: null,
  any: 0,
  virt: 0,
  vip: {
    status: 0,
    credits: 0,
  },

  em: 0,
  vk: 0,
  ok: 0,
  fb: 0,
  go: 0,
  sk: 0,
  ph: 0,

  tags: {
    str: '',
  },
  status: 0,
  last: '',
  userpic: '',
};

export default {
  state: userState,
  actions: {
    SYNC_USER({commit}, uid) {
      return api.search.get({uid}).then(({data}) => {
        commit('resetUser', data);
        return data;
      });
    },

    SAVE_CONTACTS({commit}, contacts) {
      api.user.saveContacts(contacts).then(() => {});
      commit('loadUser', contacts);
    },

    SAVE_SEARCH({commit}, data) {
      commit('loadUser', data);
      return api.user.saveSearch(data).then(() => {});
    },
  },
  mutations: {
    userReset(state) {
      _.assign(state, userState);
    },
    loadUser(state, data) {
      _.assign(state, data);
    },
    resetUser(state, data) {
      _.assign(state, data);
      state.uid = data.id;
      state.any = (data.close == false);
    },
    settings(state, data) {
      _.assign(state, data);
    },
    personal(state, {city, sex, age, name}) {
      _.assign(state, {city, sex, age, name});
    },
  },
};
