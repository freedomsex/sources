export default {
  tasks: {
    subscribe({api, store}, value) {
      return api.res('email/subscribe', 'mailer').post({value}).then(() => {
        store.commit('auth/update', {unsbcr: !value});
      });
    },

    save({api, store}, email) {
      return api.res('email/save', 'mailer').post({email}).then(() => {
        if (email) {
          store.commit('auth/update', {email});
        } else {
          store.commit('auth/clearEmail');
        }
      });
    },

    // Запросить данные емаил/почты
    check({api, store}) {
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
  },
};
