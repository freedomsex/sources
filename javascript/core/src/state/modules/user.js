const user = {
    state: {
        uid: 0,
        sex: 0,
    },
    actions: {
        LOAD_USER({ commit }) {
            if (typeof user_sex != 'undefined') {
                commit('loadUser', {
                    sex: user_sex,
                    uid: uid
                });
            }
            console.log('LOAD_USER');
        },
    },
    mutations: {
        loadUser(state, data) {
            _.extend(state, data);
            console.log(state);
        },
    }
}
