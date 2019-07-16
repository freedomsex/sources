import _ from 'underscore';
import api from '~config/api';

export default {
  namespaced: true,
  state: {
    list: [],
    limit: 20,
  },
  actions: {
    SYNC({commit}) {
      return api.user.desireList().then((response) => {
        commit('update', response.data);
      });
    },
    ADD({commit}, tag) {
      // commit('add', tag);
      return api.user.desireAdd(tag).then((response) => {
        const {id} = response.data;
        commit('add', {id, tag});
      });
    },
    DELETE({state, commit}, index) {
      const result = api.user.desireDelete(state.list[index].id);
      commit('delete', index);
      return result;
    },
  },
  mutations: {
    update(state, data) {
      if (data && data.length) {
        state.list = data.slice();
      }
    },
    add(state, data) {
      state.list.unshift(data);
      state.list = state.list.slice(0, state.limit);
    },
    delete(state, index) {
      state.list.splice(index, 1);
    },
  },
  getters: {
    tags(state) {
      return _.pluck(state.list, 'tag');
    },
  },
};
