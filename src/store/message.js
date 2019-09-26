export default {
  namespaced: true,
  state: {
    first: '',
    reply: '',
    preview: '',
    human: null,
  },
  mutations: {
    first(state, message) {
      state.first = message;
    },
    reply(state, message) {
      state.reply = message;
    },
    preview(state, {id, message}) {
      state.human = id;
      state.preview = message;
    },
  },
};
