
moment.locale('ru');

var ls = lscache;

const store = new Vuex.Store({
    modules: {
        user,
        auth,
        about,
        search,
        contacts,
        desires,
        visited,
        accepts,
        modals
    },
    state: {
        ready: false,
        apiToken: '',
        photoServer: '@@API-PHOTO',
        simple: false
    },
    actions: {
        LOAD_API_TOKEN({ commit }) {
            commit('setApiToken', { apiToken: get_cookie('jwt') });
        },
    },
    mutations: {
        setApiToken (state, data) {
            if (data) {
                _.assign(state, data);
            }
            //console.log(state)
        },
        simple(state, data) {
            state.simple = (data == true);
        },
        ready(state, data) {
            state.ready = (data == true);
        },
    },
    getters: {
        registered(state) {
            return state.apiToken ? true : false;
        }
    }
});

store.dispatch('LOAD_API_TOKEN');
store.dispatch('accepts/LOAD');
store.dispatch('LOAD_USER');
store.dispatch('search/SETTINGS');
