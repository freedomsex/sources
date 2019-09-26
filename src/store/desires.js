import _ from 'underscore';

export default {
  namespaced: true,
  state: {
    list: [],
    limit: 20,
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
    remove(state, index) {
      state.list.splice(index, 1);
    },
  },
  getters: {
    tags(state) {
      return _.pluck(state.list, 'tag');
    },
  },
};
