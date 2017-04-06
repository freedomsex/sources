
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

class ApiBun extends Api {
    send(data, handler, error) {
        axios.post('mess/bun/', data, this.config).then((response) => {
            //this.$emit('remove', this.index);
        }).catch((error) => {
            //console.log('error');
        });
        console.log('ApiBun Bun-Bun');
    }
};

class ApiContact extends Api {
    remove(data, handler, error) {
        axios.post('human/delete/', data, this.config).then((response) => {
            //this.$emit('remove', this.index);
        }).catch((error) => {
            //console.log('error');
        });
        console.log('ApiContact removed');
    }

    ignore(data, handler, error) {
        axios.post('human/ignore/', data, this.config).then((response) => {

        }).catch((e) => {
            error(e);
        });
        console.log('ApiContact ignored');
    }

    getList(url, handler, error) {
        axios.get(`/contact/list/${url}/`, this.config).then((response) => {
            handler(response.data);
        }).catch((error) => {
            error(error);
        });
    }

    initialList(handler, error) {
        this.getList('initial', handler, error);
    }

    intimateList(handler, error) {
        this.getList('intimate', handler, error);
    }

    sendsList(handler, error) {
        this.getList('sends', handler, error);
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

var apiUser     = new ApiUser('', 1234);
var apiBun      = new ApiBun('', 1234);
var apiContact  = new ApiContact('', 1234);
var apiMessages = new ApiMessages('', 1234);
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
        },
        contacts: {
            initial: [],
            intimate: [],
            sends: [],
        }
    },
    actions: {
        LOAD_USER({ commit }) {
            if (typeof user_sex != 'undefined') {
                commit('loadUser', {
                    sex: user_sex,
                    uid: uid
                });
            }
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
        },
        LOAD_INTIMATES({ commit }) {
            let contacts = ls.get('intimate-contacts');
            if (contacts && contacts.length > 0) {
                commit('addIntimate', contacts);
            }
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
        addIntimate(state, data) {
            _.extend(state.contacts.intimate, data);
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
