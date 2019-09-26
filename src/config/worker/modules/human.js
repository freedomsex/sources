export default {
  data: {

  },
  index(id) {
    return `human.data.${id}`;
  },

  tasks: {
    restore({root}, id) {
      const data = root.loadCache(this.index(id));
      root.run('human/save', data);
    },
    reload({root}, id) {
      root.run('human/restore', id);
      root.run('human/load', id);
    },
    load({api, store, root}, id) {
      return api.res('search').get({id}).then(({data}) => {
        root.run('human/save', data);
        root.saveCache(this.index(id), data, 60 * 60 * 24 * 7);
      }).catch(() => {
        store.commit('human/reset');
      });
    },
    save({store}, data) {
      store.commit('human/reset');
      store.commit('human/update', data);
    },
    update({store}, data) {
      store.commit('human/update', data);
    },
  },
};
