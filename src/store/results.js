import _ from 'underscore';

export default {
  namespaced: true,
  state: {
    list: [],
    last: [],
    received: 0,
    next: null,
    url: '',
  },
  mutations: {
    reset(state) {
      state.next = 0;
      state.list = [];
      state.received = 0;
    },
    results(state, list) {
      state.received = list ? list.length : 0;
      if (list && state.received) {
        const ids = _.pluck(state.list, 'id');
        const results = _.reject(list, item => ids.indexOf(item.id) >= 0);
        state.list = _.union(state.list, results);
      }
      // state.next += state.batch;
    },
    last(state, list) {
      if (list && !state.last) {
        state.last = list;
        // lscache.set('last-search', users, 31 * 24 * 60 * 60);
      }
    },
    next(state, reset) {
      if (reset) {
        state.next = 0;
      } else {
        state.next += 1;
      }
    },
  },
  getters: {
    more(state) {
      return !!(state.received && state.received == state.batch);
    },
    tags(state) {
      return _.compact(_.union(_.flatten(_.pluck(state.list, 'tags'))));
    },
  },
};
