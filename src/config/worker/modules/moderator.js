export default {
  tasks: {
    async sync({api, store}) {
      const {uid} = store.state.token;
      const {data} = await api.res('admin/sync', 'a4sex').load({uid});
      store.commit('moderator/sync', data);
    },
  },
};
