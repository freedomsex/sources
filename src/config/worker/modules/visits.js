export default {
  tasks: {
    save({api, store}, tid) {
      const {uid} = store.state.token;
      store.commit('visits/add', tid);
      api.res('contact/addvisit/{uid}', 'raw').send({uid, tid});
    },
    load({api, store}) {
      return api.res('contact/visited', 'raw').load().then(({data}) => {
        store.commit('visits/update', data);
      }).catch(() => {
        console.log('! Ошибка загрузки визитов !');
      });
    },
  },
};
