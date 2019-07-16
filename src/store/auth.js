import _ from 'underscore';
import api from '~config/api';

export default {
  namespaced: true,
  state: {
    uid: '',
    login: '',
    pass: '',
    email: '',
    promt: '',
    subscr: false,
  },
  actions: {
    sync({commit}) {
      return api.user.syncAuth().then(({data}) => {
        commit('update', data);
      }).catch(() => {
        console.log('! Синхронизация авторизации провалена');
      });
    },
    SAVE_LOGIN(context, data) {
      return api.user.saveLogin(data);
    },
    SAVE_PASSWD(context, data) {
      return api.user.savePasswd(data);
    },
    SAVE_EMAIL(context, data) {
      return api.user.saveEmail(data);
    },
    REMOVE_EMAIL() {
      return api.user.removeEmail();
    },
    SAVE_SUSCRIBE({commit}) {
      commit('subscr');
      return api.user.saveSubscribe();
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
  },
};
