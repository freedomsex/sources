const user = {
    state: {
        uid: 0,
        sex: 0,
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
        },
    }
}
