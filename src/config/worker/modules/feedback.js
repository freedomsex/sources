export default {
  tasks: {
    load({api, store}) {
      const {uid} = store.state.token;
      return api.res('feedback', 'notice').load({userId: uid}).then(({data}) => {
        store.commit('feedback/load', data);
      });
    },
    async add({api, store}, message) {
      const {uid} = store.state.token;
      const {data} = await api.res('feedback', 'notice').post({userId: uid, message});
      store.commit('feedback/add', data);
    },
  },
};
