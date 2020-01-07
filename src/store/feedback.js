export default {
  namespaced: true,
  state: {
    list: [],
  },
  mutations: {
    load(state, data) {
      if (data && data.length) {
        state.list = data;
      }
    },
    add(state, data) {
      if (data && data.userId) {
        state.list.push(data);
      }
    },
  },
};
