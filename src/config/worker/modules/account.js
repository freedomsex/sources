export default {
  tasks: {
    // Обновить данные авторизации
    auth({api, store}) {
      if (store.state.authorized) {
        const {uid} = store.state.token;
        return api.res('user/{uid}/data', 'auth').load({uid}).then(({data}) => {
          store.commit('auth/update', data);
        });
      }
      return Promise.resolve();
    },

    registration({api, store, root}, params) {
      params.id = store.state.client.hash;
      params.data = store.state.client.data;
      params.tokenId = root.run('client/sess', params.tokenId);
      return api.res('registration/create', 'auth').post(params).then(({data}) => {
        root.run('auth/token', data);
        return data;
      });
    },

    fallback({api, store, root}, params) {
      params.id = store.state.client.hash;
      params.data = store.state.client.data;
      return api.res('registration/fallback', 'auth').post(params).then(({data}) => {
        root.run('auth/token', data);
        return data;
      });
    },

    logout({root, store}) {
      store.commit('token/logout');
      store.commit('userReset');
      store.commit('promted', false);
      store.commit('authorize', false);
      root.run('auth/flash');
      window.location = '/logout.php';
    },

    // finished({api, root}, data) {
    //   if (!data.error) {
    //     this.saveSex(data);
    //   } else {
    //     this.onError(data);
    //   }
    // },

    verify({api, store, root}) {
      const params = {};
      params.id = store.state.client.hash;
      params.data = store.state.client.data;
      params.tokenId = store.state.client.sess;

      if (1 || !store.state.verified) {
        api.res('verify', 'auth').post(params).then(({data}) => {
          root.run('client/sess', data.tokenId);
          store.commit('verify');
        });
      }
    },

  },
};
