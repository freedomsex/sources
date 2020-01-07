export default {
  tasks: {
    read({api, store}, id) {
      const index = store.state.notice.list.findIndex(item => item.id === id);
      store.commit('notice/read', index);
      api.res('notifications', 'notice').put({readed: true}, {id});
    },
    delete({api, store}, id) {
      const index = store.state.notice.list.findIndex(item => item.id === id);
      store.commit('notice/delete', index);
      api.res('notifications', 'notice').put({deleted: true, readed: true}, {id});
    },
    load({api, store}) {
      const {uid} = store.state.token;
      return api.res('notifications', 'notice').load({userId: uid}).then(({data}) => {
        store.commit('notice/update', data);
      }).catch(() => {
        console.error('Ошибка загрузки уведомлений!');
      });
    },
    async texts({api, store}) {
      const {data} = await api.res('notice_texts', 'notice').load();
      store.commit('notice/storeTexts', data);
    },
  },
};
