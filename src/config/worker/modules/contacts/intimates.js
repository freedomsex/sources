export default {
  tasks: {
    load({api, store}) {
      const {uid} = store.state.token;
      return api.res('intimates').cget({uid, offset: 0}).then(({data}) => {
        store.commit('intimates/load', data);
      });
    },
    next({api, store}, offset) {
      const {uid} = store.state.token;
      return api.res('intimates').cget({uid, offset}).then(({data}) => {
        store.commit('intimates/add', data);
      });
    },
    delete({api, store}, index) {
      const {uid} = store.state.token;
      const {id} = store.state.intimates.list[index];
      const result = api.res('intimates').delete({uid, id});
      store.commit('intimates/delete', index);
      return result;
    },
    read({api, store}, index) {
      const {uid} = store.state.token;
      const {id} = store.state.intimates.list[index];
      const result = api.res('intimates').put(null, {id, uid});
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
