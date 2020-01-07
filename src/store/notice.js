// import _ from 'underscore';

export default {
  namespaced: true,
  state: {
    list: [],
    texts: [],
  },
  mutations: {
    update(state, data) {
      if (data && data.length) {
        state.list = data;
      }
    },
    read(state, index) {
      state.list[index].readed = true;
    },
    delete(state, index) {
      state.list[index].deleted = true;
    },
    storeTexts(state, data) {
      if (data && data.length) {
        state.texts = data;
      }
    },
  },
  getters: {
    unread(state) {
      let filtered = state.list.filter(item => !item.deleted && !item.readed);
      return filtered.length;
    },
  },
};
