import _ from 'underscore';

const mutations = {
  load(state, data) {
    if (data && data instanceof Array) {
      state.list = data;
    }
  },
  add(state, data) {
    if (data && data instanceof Array && data.length > 0) {
      state.list = _.union(state.list, data);
    }
  },
  status(state, status) {
    state.status = status;
  },
  notifi(state, status) {
    state.notified = status == true;
  },
};
// // //

const initials = _.extend({
  namespaced: true,
  state: {
    status: 8,
    notified: false,
    list: [],
  },
  mutations: _.extend({
    delete(state, index) {
      state.list.splice(index, 1);
    },
    read(state, index) {
      if (state.list[index].message) {
        state.list[index].message.unread = 0;
      }
    },
  },
  mutations),
});

const intimates = _.extend({
  namespaced: true,
  state: {
    status: 8,
    notified: false,
    list: [],
  },
  mutations: _.extend({
    delete(state, index) {
      state.list.splice(index, 1);
    },
    read(state, index) {
      if (state.list[index].message) {
        state.list[index].message.unread = 0;
      }
    },
  },
  mutations),
});

const offers = _.extend({
  namespaced: true,
  state: {
    list: [],
  },
  mutations: _.extend({
    delete(state, index) {
      state.list.splice(index, 1);
    },
  },
  mutations),
});

export {
  initials,
  intimates,
  offers,
};
