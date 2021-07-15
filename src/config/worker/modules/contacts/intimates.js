export default {
  tasks: {
    load({api, store}) {
      const {uid} = store.state.token;
      return api
        .res('contact_intimates', 'intimates')
        .load({userId: uid})
        .then(({data}) => {
          store.commit('intimates/load', data);
        });
    },
    next({api, store}, page) {
      const {uid} = store.state.token;
      return api
        .res('contact_intimates', 'intimates')
        .cget({userId: uid, page})
        .then(({data}) => {
          store.commit('intimates/add', data);
        });
    },
    delete({api, store}, index) {
      const {id} = store.state.intimates.list[index];
      const result = api.res('contact_intimates', 'intimates').delete({id});
      store.commit('intimates/delete', index);
      return result;
    },
    read({api, store}, index) {
      const {id} = store.state.intimates.list[index];
      const result = api.res('contact_intimates', 'intimates').put(null, {id});
      store.commit('intimates/read', index);
      return result;
    },

    check({store, root}) {
      root.run('messages/check', 'message').then(() => {
        store.commit('intimates/status', 8);
        store.commit('intimates/notifi', false);
      });
    },
  },
};
