import _ from 'underscore';
import lscache from 'lscache';
import api from '~config/api';

const humanState = {
  id: 0,
  message: '',
  userpic: null,
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
};

export default {
  namespaced: true,
  state: humanState,
  actions: {
    load({commit}, uid) {
      const index = `human.data.${uid}`;
      commit('save', lscache.get(index));
      commit('reset', uid);
      return api.search.get({uid}).then(({data}) => {
        commit('save', data);
        lscache.set(index, data, 1500);
      }).catch(() => {
        commit('reset', null);
      });
    },
  },
  mutations: {
    reset(state, uid) {
      if (state && state.id != uid) {
        // Сбросить предыдущие данные, если там что-то не то
        _.assign(state, humanState);
        state.reload = true;
      }
    },
    save(state, data) {
      if (data) {
        _.assign(state, data);
      }
    },
  },
};
