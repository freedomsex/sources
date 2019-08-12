import expunix from 'expires-unixtime';
import oldAPI from '~config/api'; // TODO: remove

export default {
  tasks: {
    // Обновить данные авторизации
    syncData({api, store}) {
      if (store.state.authorized) {
        const {uid} = store.state.token;
        return api.res('user/{uid}/data', 'auth').load({uid}).then(({data}) => {
          store.commit('auth/update', data);
        });
      }
      return Promise.resolve();
    },

    // Запросить данные емаил/почты
    checkEmail({api, store}) {
      if (store.state.authorized) {
        return api.res('email/data', 'mailer').load().then(({data}) => {
          if (data) {
            store.commit('auth/update', data);
          } else {
            store.commit('auth/clearEmail');
          }
        });
      }
      return Promise.resolve();
    },

    saveEmail({api, store}, email) {
      return api.res('email/save', 'mailer').post({email}).then(() => {
        if (email) {
          store.commit('auth/update', {email});
        } else {
          store.commit('auth/clearEmail');
        }
      });
    },

    subscribe({api, store}, value) {
      return api.res('email/subscribe', 'mailer').post({value}).then(() => {
        store.commit('auth/update', {unsbcr: !value});
      });
    },

    fix({store}) { // TODO: Переписать API
      const {access, refresh} = store.state.token;

      oldAPI.contacts.initial.setAuthKey(access); // TODO: Переписать API
      oldAPI.contacts.intimate.setAuthKey(access);// TODO: Переписать API

      oldAPI.user.setAuthKey(refresh);// TODO: Переписать API
      oldAPI.search.setAuthKey(refresh);// TODO: Переписать API
      oldAPI.bun.setAuthKey(refresh);// TODO: Переписать API
      oldAPI.messages.setAuthKey(refresh);// TODO: Переписать API
      oldAPI.moderator.setAuthKey(refresh);// TODO: Переписать API
      oldAPI.raw.setAuthKey(refresh);// TODO: Переписать API
    },

    refresh({api, store, root, cookies}) {
      const token = store.state.token.refresh || cookies.get('sid') || null;
      if (!token) {
        console.log('EMPTY_REFRESH_TOKEN [ !!! ]');
        return Promise.resolve();
      }
      return api.res('refresh', 'auth').post({token}).then(({data}) => {
        root.run('auth/token', data);
        root.run('auth/fix'); // TODO: Переписать API
        return data;
      }).catch(({response}) => {
        if (response) {
          console.log(response.status);
          if ([401, 400].indexOf(response.status) >= 0) {
            // store.commit('token/logout');
            // store.commit('authorize', false);
            root.run('auth/logout');
          }
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
        root.run('auth/flash');
      }
    },

    logout({root, store}) {
      store.commit('token/logout');
      store.commit('userReset');
      store.commit('promted', false);
      store.commit('authorize', false);
      root.run('auth/flash');
      window.location = '/logout.php';
    },
  },
};
