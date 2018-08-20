import _ from 'underscore';
import lscache from 'lscache';
import api from '~config/api';

export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    age: 0,
    city: '',
    sex: 0,
    up: null,
    to: null,
    tags: [],
    em: 0,
    vk: 0,
    ok: 0,
    fb: 0,
    go: 0,
    sk: 0,
    ph: 0,
    last: null,
    reload: false,
    vip: {
      status: 0,
      credits: 0,
    },
  },
  actions: {
    load({commit}, tid) {
      const index = `human.data.${tid}`;
      commit('save', lscache.get(index));
      commit('reset', tid);
      console.log('HUMAN actions', tid);
      return api.search.get({tid}).then(({data}) => {
        commit('save', data);
        lscache.set(index, data, 1500);
      }).catch(error => error);
    },
  },
  mutations: {
    reset(state, tid) {
      if (state && state.id != tid) {
        // Сбросить предыдущие данные, если там что-то не то
        state.reload = true;
      }
    },
    save(state, data) {
      if (data) {
        _.assign(state, data);
        console.log('HUMAN', data);
      }
    },
  },
};
