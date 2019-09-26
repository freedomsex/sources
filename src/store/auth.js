import _ from 'underscore';

export default {
  namespaced: true,
  state: {
    id: '',
    username: '',
    password: '',
    email: '',
    promt: false,
    unsbcr: false,
  },
  mutations: {
    update(state, data) {
      if (data) {
        _.assign(state, data);
      }
    },
    subscr(state) {
      state.subscr = !state.subscr;
    },
    clearEmail(state) {
      _.assign(state, {
        email: '',
        promt: false,
        unsbcr: false,
      });
    },
  },
  getters: {
    login(state) {
      const {id, username} = state;
      return username || id;
    },
  },
};
