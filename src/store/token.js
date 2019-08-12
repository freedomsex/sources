import expunix from 'expires-unixtime';
import jwtDecode from 'jwt-decode';

export default {
  namespaced: true,
  state: {
    uid: null,
    access: null,
    refresh: null,
    expires: null,
    created: null,
    access_ttl: 3600,
    lifetime: 2592000,
  },
  mutations: {
    save(state, data) {
      if (data) {
        state.access = data.token;
        state.expires = data.expires;
        state.refresh = data.refresh;
        state.lifetime = data.lifetime;
        state.created = data.refresh.split('.', 2)[1];
        state.access_ttl = expunix.left(data.expires);

        const {uid} = jwtDecode(state.access);
        state.uid = uid;
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
    // uid(state) {
    //   const {uid} = jwtDecode(state.access);
    //   return uid;
    // },
  },
};
