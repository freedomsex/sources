import _ from 'underscore';
import api from '~config/api';

export default {
  namespaced: true,
  state: {
    growth: 0,
    weight: 0,
    figure: 0,
  },
  actions: {
    SYNC({commit}) {
      return api.user.syncAbout().then((response) => {
        commit('update', response.data);
      });
    },
    SAVE({commit}, data) {
      api.user.saveAbout({anketa: data}).then(() => {
        commit('update', data);
      });
    },
  },
  mutations: {
    update(state, data) {
      if (data) {
        _.assign(state, data);
      }
    },
  },
};
