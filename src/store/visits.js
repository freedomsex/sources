import _ from 'underscore';

export default {
  namespaced: true,
  state: {
    list: [],
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
