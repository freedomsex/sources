import _ from 'underscore';
import lscache from 'lscache';
import api from '~config/api';

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
  actions: {
    load({state, rootState, commit, dispatch}, params) {
      dispatch('LOAD_USER', null, {root: true}); // КОСТЫЛЬ [!!!]
      const {sex, any, virt} = rootState.user;
      let {who, city} = params;
      const {up, to} = params;
      if (sex) {
        who = sex == 2 ? 1 : 2;
      }
      if (!city || any) {
        city = null;
      }
      console.log('SRCH-LOAD', {who, sex, city, up, to, any, virt});
      return api.search
        .load({who, city, up, to, next: state.next})
        .then(({data}) => {
          commit('results', data);
          commit('last', data);
          commit('next');
        });
    },
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
        lscache.set('last-search', users, 31 * 24 * 60 * 60);
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
