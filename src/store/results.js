import _ from 'underscore';

export default {
  namespaced: true,
  state: {
    list: [],
    last: [],
    received: 0,
    next: null,
    batch: 15,
    url: '',
  },
  mutations: {
    reset(state) {
      state.next = 0;
      state.list = [];
      state.received = 0;
    },
    results(state, {users}) {
      state.received = users ? users.length : 0;
      if (users && state.received) {
        const ids = _.pluck(state.list, 'id');
        const results = _.reject(users, item => (ids.indexOf(item.id) >= 0));
        state.list = _.union(state.list, results);
      }
      // state.next += state.batch;
    },
    last(state, {users}) {
      if (users && !state.last) {
        state.last = users;
        // lscache.set('last-search', users, 31 * 24 * 60 * 60);
      }
    },
    next(state, reset) {
      if (reset) {
        state.next = 0;
      } else {
        state.next += state.batch;
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
