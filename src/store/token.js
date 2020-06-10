import expunix from 'expires-unixtime';
import jwtDecode from 'jwt-decode';
// import Role2Level from '~assets/Role2Level';

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
    roles: [],
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

        const {uid, roles} = jwtDecode(state.access);
        state.uid = uid;
        state.roles = roles;
      }
      // state.expires = data.token.split('.', 2)[0];
    },
    refreshToken(state, data) {
      state.refresh = data;
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
    // level(state) {
    //   // const count = state.roles.length;
    //   // console.log('level roles', state.roles);
    //   // if (count) {
    //   //   const role = state.roles[count - 1];
    //   //   return Role2Level.indexOf(role);
    //   // }
    //   return null;
    // },

    // uid(state) {
    //   const {uid} = jwtDecode(state.access);
    //   return uid;
    // },
  },
};
