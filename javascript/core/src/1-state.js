
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
    send(data) {
        return axios.post('mess/bun/', data, this.config);
        console.log('ApiBun Bun-Bun');
    }
};

class ApiContact extends Api {
    remove(data, handler, error) {
        return axios.post('human/delete/', data, this.config).catch((error) => {
            this.error(error);
        });
        console.log('ApiContact removed');
    }

    ignore(data, handler, error) {
        return axios.post('human/ignore/', data, this.config).catch((error) => {
            this.error(error);
        });
        console.log('ApiContact ignored');
    }

    getList(url) {
        return axios.get(`/contact/list/${url}/`, this.config).catch((error) => {
            this.error(error);
        });
    }

    initialList() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.getList('initial'));
            }, 5000);
        });
    }

    intimateList() {
        return this.getList('intimate');
    }

    sendsList() {
        return this.getList('sends');
    }
};

class ApiMessages extends Api {
    send(data) {
        console.log(this);
        return axios.post('mailer/post/', data, this.config);
        console.log('ApiMessages send !!!');
    }
};

class ApiUser extends Api {
    saveSex(data) {
        return axios.post('/option/sex/', data, this.config).then((response) => {
            if (response.data.sex) {
                store.commit('loadUser', { sex: response.data.sex });
                handler();
            }
        }).catch((e) => {
            console.log(e);
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


const mutations = {
    mutations: {
        load(state, data) {
            console.log('initial-contacts');
            console.log(data);
            if (data && data.length > 0) {
                state.list = data;
            }
        },
        add(state, data) {
            if (data && data.length > 0) {
                _.extend(state.list, data);
            }
        },
    }
}
// // //

const initial = _.extend({
    namespaced: true,
    state: {
        list: []
    },
    actions: {
        LOAD({ commit }) {
            //commit('load', ls.get('initial-contacts'));
            let promise = apiContact.initialList();
            promise.then((response) => {
                commit('load', response.data);
                ls.set('initial-contacts', response.data);
            });
            return promise;
        }
    }
}, mutations);

const intimate = _.extend({
    namespaced: true,
    state: {
        list: []
    },
    actions: {
        LOAD({ commit }) {
            commit('load', ls.get('intimate-contacts'));
            let promise = apiContact.intimateList();
            promise.then((response) => {
                commit('load', response.data);
                //ls.set('intimate-contacts', state.contacts.intimate);
            });
            return promise;
        }
    }
}, mutations);

const sends = _.extend({
    namespaced: true,
    state: {
        list: []
    },
    actions: {
        LOAD({ commit }) {
            commit('load', ls.get('sends-contacts'));
            let promise = apiContact.sendsList();
            promise.then((response) => {
                commit('load', response.data);
                //ls.set('intimate-contacts', state.contacts.intimate);
            });
            return promise;
        }
    }
}, mutations);


const contacts = {
    modules: {
        initial,
        intimate,
        sends
    }
}

const user = {
    state: {
        uid: 0,
        sex: 0,
    },
    actions: {
        LOAD_USER({ commit }) {
            if (typeof user_sex != 'undefined') {
                commit('loadUser', {
                    sex: user_sex,
                    uid: uid
                });
            }
            console.log('LOAD_USER');
        },
    },
    mutations: {
        loadUser(state, data) {
            _.extend(state, data);
            console.log(state);
        },
    }
}


const store = new Vuex.Store({
    modules: {
        user,
        contacts
    },
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
        },
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
