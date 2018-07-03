export default {
  namespaced: true,
  state: {
    first: '',
    reply: '',
  },
  actions: {},
  mutations: {
    saveFirst(state, message) {
      state.first = message;
    },
    saveReply(state, message) {
      state.reply = message;
    },
  },
};
