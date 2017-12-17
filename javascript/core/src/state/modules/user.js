const user = {
    state: {
        uid: 0,
        sex: 0,
        age: 0,
        name: '',
        city: '',
        any: 0,
        virt: 0,
        contacts: {
            em: 0,
            vk: 0,
            ok: 0,
            fb: 0,
            go: 0,
            sk: 0,
            ph: 0,
        },
        tags: {
            str: ''
        },
        status: 0,
        promt: null,
        last: ''
    },
    actions: {
        LOAD_USER({ commit }) {
            // if (uid) {
            //     commit('loadUser', {uid});
            // }
            commit('loadUser', ls.get('user.data'));
        },
        SAVE_SEX({ state, commit }, sex) {
            commit('loadUser', { sex, name: '' });
            if (sex) {
                api.user.saveSex(sex).then((response) => { });
                commit('loadUser', { sex });
            }
        },
        SAVE_AGE({ state, commit }, age) {
            if (age && state.age != age) {
                api.user.saveAge(age).then((response) => { });
                commit('loadUser', {age});
            }
        },
        SAVE_NAME({ state, commit }, name) {
            if (name && state.name != name) {
                api.user.saveName(name).then((response) => { });
                commit('loadUser', {name});
            }
        },
        SAVE_CITY({ state, commit }, city) {
            if (city && state.city != city) {
                api.user.saveCity(city).then((response) => { });
                commit('loadUser', {city});
            }
        },
        SAVE_CONTACTS({ state, commit }, contacts) {
            api.user.saveContacts(contacts).then((response) => { });
            commit('loadUser', {contacts});
        },
        SAVE_SEARCH({state, commit}, data) {
            commit('loadUser', data);
            return api.user.saveSearch(data).then((response) => { });
        },
    },
    mutations: {
        loadUser(state, data) {
            _.assign(state, data);
            ls.set('user.data', state, 23456);
        },
        resetUser(state, data) {
            _.assign(state, data);
            ls.set('user.data', data, 23456);
        },
        settings(state, data) {
            _.assign(state, data);
            ls.set('user.data', data, 23456);
        },
    }
}
