export default {
  tasks: {
    load({api, store}) {
      return api.res('tag/user', 'raw').load().then(({data}) => {
        store.commit('desires/update', data);
      });
    },
    save({api, store}, tag) {
      return api.res('tag/add', 'raw').save({tag}).then(({data}) => {
        const {id} = data;
        store.commit('desires/add', {id, tag});
      });
    },
    remove({api, store}, index) {
      const {id} = store.state.desires.list[index];
      store.commit('desires/remove', index);
      return api.res('tag/del', 'raw').post({id});
    },
  },
};
