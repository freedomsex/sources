export default {
  tasks: {
    load({api, store}) {
      const {uid} = store.state.token;
      return api
        .res('contact_initials', 'initials')
        .load({userId: uid})
        .then(({data}) => {
          store.commit('initials/load', data);
        });
      // return api.res('initials').cget({uid, offset: 0}).then(({data}) => {
      //   store.commit('initials/load', data);
      // });
    },
    next({api, store}, page) {
      const {uid} = store.state.token;
      return api
        .res('contact_initials', 'initials')
        .cget({userId: uid, page})
        .then(({data}) => {
          store.commit('initials/add', data);
        });
    },
    delete({api, store}, index) {
      const {id} = store.state.initials.list[index];
      const result = api.res('contact_initials', 'initials').delete({id});
      store.commit('initials/delete', index);
      return result;
    },
    read({api, store}, index) {
      const {id} = store.state.initials.list[index];
      const result = api.res('contact_initials', 'initials').put(null, {id});
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
