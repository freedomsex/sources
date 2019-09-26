import _ from 'underscore';
import Dexie from 'dexie';

import api from '~config/api';
import hasher from '~legacy/utils/simple-hash';

export default {
  namespaced: true,
  state: {
    db: null,
    list: [],
  },
  actions: {
    INIT({state, dispatch, rootState}) {
      const uri = `static/json/notes/${rootState.locale}.json`;
      return api.res(uri, 'raw').load().then(({data}) => {
        state.db.transaction('rw', state.db.writes, () => {
          _.each(data.reverse(), (text) => {
            dispatch('UPDATE', text);
          });
        });
      }).catch(() => {
        console.log('! Ошибка загрузки блокнота, инет есть?');
      });
    },
    CREATE({state, rootState}) {
      if (!state.db) {
        const {uid} = rootState.token;
        state.db = new Dexie(`DataBaseFS__${uid}`);
        state.db.version(1).stores({
          writes: '++id, &text, count, updated',
        });
      }
    },
    LOAD({state, dispatch}) {
      dispatch('CREATE');
      return state.db.writes.count().then((count) => {
        if (!count || (count && count < 10)) {
          dispatch('INIT').then(() => {
            dispatch('WRITES');
          });
        } else {
          dispatch('WRITES');
        }
      }).catch(() => {
      // console.log('Dexie::: ', state.db.writes.count());
        console.log('пустая база');
      });
    },
    WRITES({state, commit}) {
      return state.db.writes
        .orderBy('updated')
        .reverse()
        .limit(100)
        .sortBy('count')
        .then((data) => {
          commit('load', data);
        });
    },
    ITEM({state}, id) {
      return state.db.writes.get(id);
    },
    UPDATE({state, commit}, text) {
      const updated = hasher.random();
      state.db.writes.get({text}).then((item) => {
        if (item) {
          let count = item.count ? item.count : 0;
          count += 1;
          state.db.writes.update(item.id, {count, updated});
        } else {
          commit('add', text);
        }
      });
    },
    DELETE({state}, id) {
      state.db.writes.delete(id);
    },
  },
  mutations: {
    add(state, text) {
      const updated = hasher.random();
      state.db.writes.add({text, count: 0, updated});
    },
    load(state, list) {
      const sorted = _.sortBy(list, item => item.updated + item.count + item.text);
      state.list = sorted.reverse();
    },
  },
};
