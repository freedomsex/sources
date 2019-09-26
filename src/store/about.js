import _ from 'underscore';

export default {
  namespaced: true,
  state: {
    growth: 0,
    weight: 0,
    figure: 0,
  },
  mutations: {
    update(state, data) {
      if (data) {
        _.assign(state, data);
      }
    },
  },
};
