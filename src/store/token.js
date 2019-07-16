import expunix from 'expires-unixtime';

export default {
  namespaced: true,
  state: {
    access: null,
    refresh: null,
    expires: null,
    created: null,
    access_ttl: 3600,
    lifetime: 2592000,
  },
  actions: {},
  mutations: {
    save(state, data) {
      if (data) {
        state.access = data.token;
        state.expires = data.expires;
        state.refresh = data.refresh;
        state.lifetime = data.lifetime;
        state.created = data.refresh.split('.', 2)[1];
        state.access_ttl = expunix.left(data.expires);
      }
      // state.expires = data.token.split('.', 2)[0];
    },
    logout(state) {
      state.access = null;
      state.refresh = null;
      state.created = null;
    },
  },
  getters: {
    auth: state => () => {
      if (!state.access || !state.expires) {
        return false;
      }
      return !expunix.expired(state.expires); // 3600
    },
  },
};
