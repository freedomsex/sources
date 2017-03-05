
moment.locale('ru');

var ls = lscache;

class Api {
    constructor(host, key) {
        this.root = host + '/';
        this.key = key;
        this.config = {
            baseURL: this.root,
            headers: {'Authorization': 'Bearer ' + key}
        }
    }
};

class ApiMessages extends Api {
    send(data, handler, error) {
        console.log(this);
        axios.post('mailer/post/', data, this.config).then((response) => {
            handler(response.data);
        }).catch((error) => {
            console.log(error);
        });
        console.log('ApiMessages send !!!');
    }
};

class ApiUser extends Api {
    saveSex(data, handler, error) {
        axios.post('/option/sex/', data, this.config).then((response) => {
            if (response.data.sex) {
                store.commit('loadUser', { sex: response.data.sex });
                handler();
            }
        }).catch((e) => {
            console.log(e);
            error();
        });
    }
};

var apiMessages = new ApiMessages('', 1234);
var apiUser = new ApiUser('', 1234);
//  = _.create(Api.prototype, {
//     host: '/',
//     jwt: '1234',
// });


//ApiMessages.send();

const store = new Vuex.Store({
    state: {
        apiToken: '',
        //photoServer: '127.0.0.1:8888',
        photoServer: '195.154.54.70',
        count: 0,
        optionStatic: {
            view: null
        },
        photoView: {
            thumb:  null,
            photo:  null,
            height: null,
        },
        uploadView: {
            show: false
        },
        contactView: {
            show: false
        },
        formMess: {
            sendTo: null,
            sendPhoto: {
                thumb:  null,
                photo:  null,
                height: null,
                width:  null,
            },
            intimate: true,
        },
        accepts: {
            photo: false
        },
        user: {
            uid: 0,
            sex: 0,
        }
    },
    actions: {
        LOAD_USER({ commit }) {
            commit('loadUser', {
                sex: user_sex,
                uid: uid
            });
        },
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
        loadUser(state, data) {
            _.extend(state.user, data);
        },
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
        },
        intimated(state, data) {
            state.formMess.intimate = (data === true);
        },
        optionDialog(state, data) {
            state.optionStatic.view = data ? data : null;
        },
    },
    getters: {
        accept() {

        }
    }
});

store.dispatch('LOAD_API_TOKEN');
store.dispatch('LOAD_ACCEPTS');
store.dispatch('LOAD_USER');
