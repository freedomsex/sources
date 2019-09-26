export default {
  tasks: {
    load({api, store}, params) {
      const {sex, any} = store.state.user;
      let {who, city} = params;
      const {up, to} = params;
      if (sex) {
        who = sex == 2 ? 1 : 2;
      }
      if (!city || any) {
        city = null;
      }
      // console.log('search', {who, sex, city, up, to, any, virt});
      return api.res('search').load({who, city, up, to, next: store.state.results.next})
        .then(({data}) => {
          store.commit('results/results', data);
          store.commit('results/last', data);
          store.commit('results/next');
        });
    },

  },
};
