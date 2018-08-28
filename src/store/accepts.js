import _ from 'underscore';
import lscache from 'lscache';

export default {
  namespaced: true,
  state: {
    photo: false,
    search: false,
    moderator: false,
    freeCredits: false,
    settings: false,
    removeContacts: false,
    removeMessages: false,
  },
  actions: {
    LOAD({state}) {
      const data = lscache.get('accepts');
      if (data) {
        _.assign(state, data);
      }
    },
  },
  mutations: {
    confirm(state, name) {
      state[name] = true;
      lscache.set('accepts', state);
    },
    photo(state) {
      state.photo = true;
      lscache.set('accepts', state);
    },
    search(state) {
      state.search = true;
      lscache.set('accepts', state);
    },
    moderator(state, value) {
      state.moderator = value == true;
      lscache.set('accepts', state);
    },
    settings(state) {
      state.settings = true;
      lscache.set('accepts', state);
    },
  },
};
