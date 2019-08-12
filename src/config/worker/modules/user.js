export default {
  tasks: {
    autoCity({root, store}) {
      if (!store.state.user.city) {
        const {city} = global.defaultSettings;
        root.run('user/city', city);
      }
    },
    autoAge({root, store}) {
      if (!store.state.user.age) {
        let {up, to} = global.defaultSettings;
        up = store.state.search.up || up;
        to = store.state.search.to || to;
        let age;
        if (up && to) {
          age = Math.round((up + to) / 2);
        } else {
          age = Math.max(up, to);
        }
        root.run('user/age', age);
      }
    },

    sex({api, store, root}, {sex, token}) {
      store.commit('loadUser', {sex, name: ''});
      return api.res('option/sex', 'raw').post({sex, token}).then(() => {
        root.run('user/autoAge');
        root.run('user/autoCity');
      });
    },

    age({api, store}, age) {
      if (age && store.state.age != age) {
        store.commit('loadUser', {age});
        api.res('option/age', 'raw').post({age});
      }
    },

    city({api, store}, city) {
      if (city && store.state.city != city) {
        store.commit('loadUser', {city});
        api.res('option/city', 'raw').post({city});
      }
    },

    name({api, store}, name) {
      if (name && store.state.name != name) {
        api.res('option/name', 'raw').post({name}).then(() => {
          store.commit('loadUser', {name});
        });
      }
    },

  },
};
