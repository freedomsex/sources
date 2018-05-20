import _ from 'underscore';
import api from '~config/api';
import Dexie from 'dexie';
import hasher from '~legacy/utils/simple-hash';

export default {
  namespaced: true,
  state: {
    db: null,
  },
  actions: {
    INIT({state, commit, rootState}) {
      api.raw.load(null, `static/json/notes/${rootState.locale}.json`).then(({data}) => {
        state.db.transaction('rw', state.db.writes, () => {
          _.each(data.reverse(), (element) => {
            commit('add', element);
          });
        });
      }).catch(() => {
        console.log('! Ошибка загрузки блокнота, инет есть?');
      });
    },
    LOAD({state, dispatch, rootState}) {
      const {uid} = rootState.user;
      state.db = new Dexie(`DataBaseFS__${uid}`);
      state.db.version(1).stores({
        writes: '++id, &text, count, updated',
      });
      state.db.on('ready', () => {
        state.db.writes.count((count) => {
          if (!count) {
            dispatch('INIT');
          }
        });
      });
      state.db.open();
    },
    WRITES({state}) {
      return state.db.writes
        .orderBy('updated')
        .reverse()
        .limit(100)
        .sortBy('count');
    },
    ITEM({state}, id) {
      return state.db.writes.get(id);
    },
    UPDATE({state, commit}, text) {
      const updated = hasher.random();
      state.db.writes.get({text}).then((item) => {
        if (item) {
          let count = item.count ? item.count : 0;
          count += 1; // console.log('UPDATE', [count, updated]);
          state.db.writes.update(item.id, {count, updated});
        } else {
          commit('add', text);
        }
      });
    },
  },
  mutations: {
    add(state, text) {
      const updated = hasher.random();
      state.db.writes.add({text, count: 0, updated});
    },
  },
};
