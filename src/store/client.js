export default {
  namespaced: true,
  state: {
    data: '',
    hash: '',
    sess: '',
  },
  mutations: {
    data(state, value) {
      state.data = value;
    },
    hash(state, value) {
      state.hash = value;
    },
    sess(state, value) {
      state.sess = value;
    },
  },
};
