
const auth = {
    namespaced: true,
    state: {
        iss: '',
        exp: '',
        iat: '',
        sid: '',
        uid: '',
        auth: '',
        ip:  '',
            login: '',
            pass:  '',
            email: '',
            promt: '',
            subscr: false,
        last:  '',
        error: ''
    },
    actions: {
        SYNC({commit}) {
            return api.user.syncAuth().then((response) => {
                commit('update', response.data);
            });
        },
        SAVE_LOGIN({commit}, data) {
            return api.user.saveLogin(data);
        },
        SAVE_PASSWD({commit}, data) {
            return api.user.savePasswd(data);
        },
        SAVE_EMAIL({commit}, data) {
            return api.user.saveEmail(data);
        },
        REMOVE_EMAIL({commit}) {
            return api.user.removeEmail();
        },
        SAVE_SUSCRIBE({store, commit}, data) {
            commit('subscr');
            return api.user.saveSubscribe();
        }
    },
    mutations: {
        update(state, data) {
            if (data) {
                _.assign(state, data);
            }
        },
        subscr(state) {
            state.subscr = state.subscr ? false : true;
        }
    }
};
