import _ from 'underscore';
import lscache from 'lscache';
import api from '~config/api';

export default {
  namespaced: true,
  state: {
    list: [],
  },
  actions: {
    sync({rootState, state, commit}) {
      const index = `visited-${rootState.user.uid}`;
      commit('update', lscache.get(index));
      return api.user.visitedList().then((response) => {
        const {data} = response;
        commit('update', data);
        lscache.set(index, state.list, 31 * 24 * 60 * 60);
      });
    },
    ADD({rootState, state, commit}, tid) {
      const {uid} = rootState.user;
      const index = `visited-${uid}`;
      commit('add', tid);
      lscache.set(index, state.list, 31 * 24 * 60 * 60);
      return api.user.visitedAdd(uid, tid).then(() => {});
    },
  },
  mutations: {
    update(state, data) {
      if (data && data.length) {
        state.list = _.union(state.list, data);
      }
    },
    add(state, data) {
      state.list.unshift(data);
    },
  },
};
