export default {
  namespaced: true,
  state: {
    photo: false,
    search: false,
    moderator: false,
    freeCredits: false,
    settings: false,
    removeContacts: false,
    removeMessages: false,
  },
  actions: {
    //
  },
  mutations: {
    confirm(state, name) {
      state[name] = true;
    },
    photo(state) {
      state.photo = true;
    },
    search(state) {
      state.search = true;
    },
    moderator(state, value) {
      state.moderator = value == true;
    },
    settings(state) {
      state.settings = true;
    },
  },
};
