import _ from 'underscore';
import ls from 'lscache';

export default {
  namespaced: true,
  state: {
    photo: false,
    search: false,
    moderator: false,
    settings: false,
  },
  actions: {
    LOAD({state}) {
      const data = ls.get('accepts');
      if (data) {
        _.assign(state, data);
      }
    },
  },
  mutations: {
    photo(state) {
      state.photo = true;
      ls.set('accepts', state);
    },
    search(state) {
      state.search = true;
      ls.set('accepts', state);
    },
    moderator(state, value) {
      state.moderator = value == true;
      ls.set('accepts', state);
    },
    settings(state) {
      state.settings = true;
      ls.set('accepts', state);
    },
  },
};
