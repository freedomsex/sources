import _ from 'underscore';
import api from '~config/api';

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

const initial = _.extend({
  namespaced: true,
  state: {
    status: 8,
    notified: false,
    list: [],
  },
  actions: {
    LOAD({commit, rootState}) {
      return api.contacts.initial
        .cget({
          uid: rootState.token.uid,
          offset: 0,
        })
        .then((response) => {
          commit('load', response.data);
        });
    },
    NEXT({commit, rootState}, offset) {
      return api.contacts.initial
        .cget({
          uid: rootState.token.uid,
          offset,
        })
        .then((response) => {
          commit('add', response.data);
        });
    },
    DELETE({state, commit, rootState}, index) {
      const result = api.contacts.initial.delete({
        uid: rootState.token.uid,
        resource_id: state.list[index].id,
      });
      commit('delete', index);
      return result;
    },
    READ({state, commit, rootState}, index) {
      const result = api.contacts.initial.put(null, {
        uid: rootState.token.uid,
        resource_id: state.list[index].id,
      });
      commit('read', index);
      return result;
    },
    CHECK({commit}) {
      api.messages.check('contact').then(() => {
        commit('status', 8);
        commit('notifi', false);
      });
    },
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

const intimate = _.extend({
  namespaced: true,
  state: {
    status: 8,
    notified: false,
    list: [],
  },
  actions: {
    LOAD({commit, rootState}) {
      return api.contacts.intimate
        .cget({
          uid: rootState.token.uid,
          offset: 0,
        })
        .then((response) => {
          commit('load', response.data);
        });
    },
    NEXT({commit, rootState}, offset) {
      return api.contacts.intimate
        .cget({
          uid: rootState.token.uid,
          offset,
        })
        .then((response) => {
          commit('add', response.data);
        });
    },
    DELETE({state, commit, rootState}, index) {
      const result = api.contacts.intimate.delete({
        uid: rootState.token.uid,
        resource_id: state.list[index].id,
      });
      commit('delete', index);
      return result;
    },
    READ({state, commit, rootState}, index) {
      const result = api.contacts.intimate.put(null, {
        uid: rootState.token.uid,
        resource_id: state.list[index].id,
      });
      commit('read', index);
      return result;
    },
    CHECK({commit}) {
      api.messages.check('message').then(() => {
        commit('status', 8);
        commit('notifi', false);
      });
    },
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

const sends = _.extend({
  namespaced: true,
  state: {
    list: [],
  },
  actions: {
    LOAD({commit, rootState}) {
      return api.contacts.sends
        .cget({
          uid: rootState.token.uid,
          offset: 0,
        })
        .then((response) => {
          commit('load', response.data);
        });
    },
    NEXT({commit, rootState}, offset) {
      return api.contacts.sends
        .cget({
          uid: rootState.token.uid,
          offset,
        })
        .then((response) => {
          commit('add', response.data);
        });
    },
    DELETE({state, commit, rootState}, index) {
      const result = api.contacts.sends.delete({
        uid: rootState.token.uid,
        resource_id: state.list[index].id,
      });
      commit('delete', index);
      return result;
    },
  },
  mutations: _.extend({
    delete(state, index) {
      state.list.splice(index, 1);
    },
  },
  mutations),
});

export default {
  modules: {
    initial,
    intimate,
    sends,
  },
};
