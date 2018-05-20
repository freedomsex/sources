import ls from 'lscache';
import _ from 'underscore';

export default {
  namespaced: true,
  state: {
    up: null,
    to: null,
    any: 0,
    virt: 0,
  },
  actions: {
    load({commit}) {
      commit('loadUser', ls.get('user.search'));
    },
  },
  mutations: {
    restore(state, {up, to, any, virt}) {
      _.assign(state, {up, to, any, virt});
      ls.set('user.search', state, 234567);
    },
  },
};
