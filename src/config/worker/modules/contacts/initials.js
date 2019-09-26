export default {
  tasks: {
    load({api, store}) {
      const {uid} = store.state.token;
      return api.res('initials').cget({uid, offset: 0}).then(({data}) => {
        store.commit('initials/load', data);
      });
    },
    next({api, store}, offset) {
      const {uid} = store.state.token;
      return api.res('initials').cget({uid, offset}).then(({data}) => {
        store.commit('initials/add', data);
      });
    },
    delete({api, store}, index) {
      const {uid} = store.state.token;
      const {id} = store.state.initials.list[index];
      const result = api.res('initials').delete({uid, id});
      store.commit('initials/delete', index);
      return result;
    },
    read({api, store}, index) {
      const {uid} = store.state.token;
      const {id} = store.state.initials.list[index];
      const result = api.res('initials').put(null, {id, uid});
      store.commit('initials/read', index);
      return result;
    },

    check({store, root}) {
      root.run('messages/check', 'contact').then(() => {
        store.commit('initials/status', 8);
        store.commit('initials/notifi', false);
      });
    },
  },
};
