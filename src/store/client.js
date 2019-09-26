export default {
  namespaced: true,
  state: {
    data: '',
    hash: '',
  },
  mutations: {
    data(state, value) {
      state.data = value;
    },
    hash(state, value) {
      state.hash = value;
    },
  },
};
