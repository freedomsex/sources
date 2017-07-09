
const accepts = {
    namespaced: true,
    state: {
        photo: false,
        search: false,
    },
    actions: {
        LOAD() {
            state = ls.get('accepts');
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
    }
};
