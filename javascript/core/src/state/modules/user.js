const user = {
    state: {
        uid: 0,
        sex: 0,
        age: '',
        name: '',
        city: '',
        up: '',
        to: '',
        who: 0,
        close:   0,
        virt:    0,
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
            if (uid) {
                commit('loadUser', {uid});
            }
            if (typeof user_sex != 'undefined') {
                commit('loadUser', {sex: user_sex});
            }
        },
        SAVE_SEX({ commit }, sex) {
            let promise = api.user.saveSex(sex);
            promise.then((response) => {
                if (response.data.sex) {
                    store.commit('loadUser', { sex: response.data.sex });
                }
            });
            return promise;
        },
    },
    mutations: {
        loadUser(state, data) {
            _.extend(state, data);
            ls.set('user.data', data, 23456);
        },
    }
}
