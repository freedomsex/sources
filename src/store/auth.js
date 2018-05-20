import _ from 'underscore';
import api from '~config/api';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    iss: '',
    exp: '',
    iat: '',
    sid: '',
    uid: '',
    auth: '',
    ip: '',
    login: '',
    pass: '',
    email: '',
    promt: '',
    subscr: false,
    last: '',
    error: '',
  },
  actions: {
    SYNC({commit}) {
      return api.user.syncAuth().then((response) => {
        commit('update', response.data);
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
    UPDATE_KEY({rootStore}) {
      return axios.get('/sync/sess/').then(({data}) => {
        if (data.uid || data.reg) {
          rootStore.dispatch('LOAD_API_TOKEN');

          const {
            uid, city, sex, age, name, contacts, apromt: promt,
          } = data; // User module
          // console.log('upUser', data);
          rootStore.commit('resetUser', {
            uid,
            city,
            sex,
            age,
            name,
            contacts,
            promt,
          });

          rootStore.commit('settings/restore', data);
        }
      });
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
