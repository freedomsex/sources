var ls = storage;

const store = new Vuex.Store({
    state: {
        apiToken: '',
        photoServer: '127.0.0.1:8888',
        count: 0,
        photoView: {
            thumb:  null,
            photo:  null,
            height: null,
        },
        uploadView: {
            show: false
        },
        formMess: {
            sendTo: null,
            sendPhoto: {
                thumb:  null,
                photo:  null,
                height: null,
                width:  null,
            }
        }
    },
    actions: {
        LOAD_API_TOKEN({ commit }) {
            store.commit('setApiToken', { apiToken: get_cookie('jwt') });
        }
    },
    mutations: {
        setApiToken (state, data) {
            if (data) {
                Object.assign(state, data);
            }
            console.log(state)
        },
        viewPhoto(state, data) {
            Object.assign(state.photoView, data);
        },
        viewUpload(state, data) {
            state.uploadView.show = (data === true);
        },
        sendPhoto(state, data) {
            Object.assign(state.formMess.sendPhoto, data);
        },
    },
    getters: {

    }
});

store.dispatch('LOAD_API_TOKEN');
