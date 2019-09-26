export default {
  tasks: {
    load({api, store}) {
      const {uid} = store.state.token;
      return api.res('offers').cget({uid, offset: 0}).then(({data}) => {
        store.commit('offers/load', data);
      });
    },
    next({api, store}, offset) {
      const {uid} = store.state.token;
      return api.res('offers').cget({uid, offset}).then(({data}) => {
        store.commit('offers/add', data);
      });
    },
    delete({api, store}, index) {
      const {uid} = store.state.token;
      const {id} = store.state.offers.list[index];
      const result = api.res('offers').delete({uid, id});
      store.commit('offers/delete', index);
      return result;
    },
  },
};
