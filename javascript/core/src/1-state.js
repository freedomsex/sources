
moment.locale('ru');

var ls = lscache;

const store = new Vuex.Store({
    state: {
        apiToken: '',
        //photoServer: '127.0.0.1:8888',
        photoServer: '195.154.54.70',
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
        },
        accepts: {
            photo: false
        }
    },
    actions: {
        LOAD_API_TOKEN({ commit }) {
            commit('setApiToken', { apiToken: get_cookie('jwt') });
        },
        LOAD_ACCEPTS({ commit }) {
            let accepts = ls.get('accepts');
            if (accepts && accepts.photo) {
                commit('approveViewPhoto');
            }
            //console.log(ls.get('accepts'));
        }
    },
    mutations: {
        setApiToken (state, data) {
            if (data) {
                _.extend(state, data);
            }
            //console.log(state)
        },
        viewPhoto(state, data) {
            _.extend(state.photoView, data);
        },
        viewUpload(state, data) {
            state.uploadView.show = (data === true);
        },
        sendPhoto(state, data) {
            _.extend(state.formMess.sendPhoto, data);
        },
        approveViewPhoto(state) {
            state.accepts.photo = true;
            ls.set('accepts', _.extend(state.accepts, {photo: true}));
        }
    },
    getters: {
        accept() {

        }
    }
});

store.dispatch('LOAD_API_TOKEN');
store.dispatch('LOAD_ACCEPTS');
