
const accepts = {
    namespaced: true,
    state: {
        photo: false,
        search: false,
    },
    actions: {
        LOAD() {
            let data = ls.get('accepts');
            if (data) {
                state = data.slice();
            } 
            console.log(state)
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
