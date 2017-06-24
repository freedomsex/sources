const user = {
    state: {
        uid: 0,
        sex: 0,
        age: '',
        name: '',
        city: '',
        status:  0,
        em: 0,
        vk: 0,
        ok: 0,
        fb: 0,
        go: 0,
        sk: 0,
        ph: 0,
        tags: {
            str: ''
        },
        last: '',
        anketa: {
            growth: '',
            weight: '',
            figure: ''
        }
    },
    actions: {
        LOAD_USER({ commit }) {
            // if (uid) {
            //     commit('loadUser', {uid});
            // }
            commit('loadUser', ls.get('user.data'));
        },
        SAVE_SEX({ state, commit }, sex) {
            if (sex && state.sex != sex) {
                api.user.saveSex(sex).then((response) => { });
                commit('loadUser', { sex });
            }
            commit('loadUser', {name: ''});
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
    },
    mutations: {
        loadUser(state, data) {
            state = _.assign(state, data);
            ls.set('user.data', state, 23456);
        },
    }
}
