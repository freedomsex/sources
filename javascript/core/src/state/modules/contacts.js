const contacts = {
    state: {
        initial: [],
        intimate: [],
        sends: [],
    },
    actions: {
        LOAD_INTIMATES({ commit }) {
            let contacts = ls.get('intimate-contacts');
            if (contacts && contacts.length > 0) {
                commit('addIntimate', contacts);
            }
        }
    },
    mutations: {
        addIntimate(state, data) {
            _.extend(state.contacts.intimate, data);
        },
    }
}
