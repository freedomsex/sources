import _ from 'underscore';
import lscache from 'lscache';

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
      commit('restore', lscache.get('user.search'));
    },
  },
  mutations: {
    restore(state, {up, to, any, virt}) {
      _.assign(state, {up, to, any, virt});
      lscache.set('user.search', state, 234567);
    },
  },
  getters: {
    virgin(state, getters, rootState) {
      const {city} = rootState.user;
      return !city && !state.up && !state.to;
    },
  },
};
