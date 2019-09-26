import expunix from 'expires-unixtime';

export default {
  tasks: {

    refresh({api, store, root, cookies}) {
      const token = store.state.token.refresh || cookies.get('sid') || null;
      if (!token) {
        console.log('EMPTY_REFRESH_TOKEN [ !!! ]');
        return Promise.reject();
      }
      return api.res('refresh', 'auth').post({token}).then(({data}) => {
        root.run('auth/token', data);
        return data;
      }).catch(({response}) => {
        if (response) {
          console.log(response.status);
          // if ([401, 400].indexOf(response.status) >= 0) {
          //   // store.commit('token/logout');
          //   // store.commit('authorize', false);
          //   root.run('auth/logout');
          // }
        }
      });
    },

    flash({api, store}) {
      const {access, refresh} = store.state.token;
      api.saveAuthKey(access, 'default');
      api.saveAuthKey(refresh, 'raw');
    },

    tick({root, store}) {
      const {access, expires} = store.state.token;
      if (!access || !expires) {
        store.commit('authorize', false);
      } else {
        const expired = expunix.expired(expires);
        store.commit('authorize', !expired); // 3600
        if (!expired) {
          root.run('auth/flash');
        }
      }
    },

    token({root, store}, data) {
      if (data && data.token) {
        store.commit('token/save', data);
        store.commit('authorize', true);
        root.run('auth/flash');
      }
    },
  },
};
