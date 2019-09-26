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

    load({api, store}) {
      const {uid} = store.state.token;
      return api.res('search').get({id: uid}).then(({data}) => {
        store.commit('resetUser', data);
        store.commit('search/restore', data);
      });
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
        return api.res('option/name', 'raw').post({name}).then(() => {
          store.commit('loadUser', {name});
        });
      }
      return Promise.resolve();
    },

    about({api, store}, data) {
      api.res('option/anketa', 'raw').save({anketa: data}).then(() => {
        store.commit('about/update', data);
      });
    },

    anketa({api, store}) {
      return api.res('sync/anketa', 'raw').load().then(({data}) => {
        store.commit('about/update', data);
      });
    },

    search({api, store}, data) {
      store.commit('loadUser', data);
      store.commit('search/restore', data);
      api.res('msett/save', 'raw').save(data);
    },

    contacts({api, store}, data) {
      store.commit('loadUser', data);
      api.res('option/contact', 'raw').save({contact: data});
    },
  },
};
