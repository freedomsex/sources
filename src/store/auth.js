import _ from 'underscore';
import api from '~config/api';

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
  actions: {
    SAVE_LOGIN(context, data) {
      return api.user.saveLogin(data);
    },
    SAVE_PASSWD(context, data) {
      return api.user.savePasswd(data);
    },
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
