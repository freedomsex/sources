
const accepts = {
    namespaced: true,
    state: {
        photo: false,
        search: false,
        moderator: false,
    },
    actions: {
        LOAD({state}) {
            let data = ls.get('accepts');
            if (data) {
                _.assign(state, data);
            }
        },
    },
    mutations: {
        photo(state) {
            state.photo = true;
            ls.set('accepts', state);
        },
        search(state) {
            state.search = true;
            ls.set('accepts', state);
        },
        moderator(state) {
            state.moderator = true;
            ls.set('accepts', state);
        },
    }
};
