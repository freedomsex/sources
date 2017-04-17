
moment.locale('ru');

var ls = lscache;

class Api {
    constructor(host, key, version, routing) {
        // Delay requests msec
        this.wait = 5000; //

        let ver = version ? 'v' + version + '/' : '';
        this.root = host + ver;
        this.key = key;
        this.config = {
            baseURL: this.root,
            headers: {'Authorization': 'Bearer ' + key}
        }
        this.routing = {
            route: '',
            load: '',
            get: '',
            cget: '',
            send: '',
            post: '',
            save: '',
            remove: '',
            delete: '',
            put: '',
            patch: '',
            option: '',
        };
        _.extend(this.routing, routing);
    }
    setUrl(method, url) {
        let result = this.routing.route;
        if (url) {
            result = url;
        } else {
            let action = this.routing[method];
            result = action ? action : result;
        }
        //console.log('url: ', [this.root, result])
        return this.root + result;
    }
    setParams(params) {
        this.config.params = params ? params : {};
    }

    get(params, url) {
        this.setParams(params);
        return this.delay(axios.get(this.setUrl('get', url), this.config), 0);
    }
    load(params, url) {
        this.setParams(params);
        return this.delay(axios.get(this.setUrl('load', url), this.config), 0);
    }
    cget(params, url) {
        this.setParams(params);
        return this.delay(axios.get(this.setUrl('cget', url), this.config), 0);
    }
    send(params, url) {
        this.setParams(params);
        return this.delay(axios.get(this.setUrl('send', url), this.config), 0);
    }
    post(data, params, url) {
        this.setParams(params);
        return this.delay(axios.post(this.setUrl('post', url), data, this.config), 0);
    }
    save(data, params, url) {
        this.setParams(params);
        return this.delay(axios.post(this.setUrl('save', url), data, this.config), 0);
    }
    remove(data, params, url) {
        this.setParams(params);
        return this.delay(axios.post(this.setUrl('remove', url), data, this.config), 0);
    }
    delete(data, params, url) {
        this.setParams(params);
        return this.delay(axios.post(this.setUrl('delete', url), data, this.config), 0);
    }
    request(method, action, data, params, url) {
        // this.config.method = method;
        // this.config.url = this.setUrl(action, url);
        // this.config.data = data;
        // this.config.params = params;
        // return this.delay(axios.request(this.config), 0);
        if (data) {
            return this.delay(axios[method](this.setUrl(action, url), data, this.config), 0);
        } else {
            return this.delay(axios[method](this.setUrl(action, url), this.config), 0);
        }
    }

    put() {}
    patch() {}
    option() {}

    delay(result, wait) {
        let msec = wait ? wait : this.wait;
        if (msec < this.wait) {
            msec = this.wait;
        }
        if(msec == 0 || typeof Promise == "undefined") {
            return result;
        }
        return new Promise((resolve, reject) => {
            _.delay(resolve, msec, result);
        });
    }
};

class ApiBun extends Api {
    constructor() {
        let key = '1234';
        let host = '/';
        super(host, key);
    }
    send(data) {

        return axios.post('mess/bun/', data, this.config);
        console.log('ApiBun Bun-Bun');
    }
};


class ApiMessages extends Api {
    constructor() {
        let key = '1234';
        let host = '/';
        super(host, key);
    }
    send(data) {
        console.log(this);
        return axios.post('mailer/post/', data, this.config);
        console.log('ApiMessages send !!!');
    }
};

class ApiUser extends Api {
    constructor() {
        let key = '1234';
        let host = '/';
        super(host, key);
    }
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




class ApiContact extends Api {
    constructor(routing) {
        let key = '1234';
        let host = '/';
        super(host, key, null, routing);
    }

    getList(url) {
        return axios.get(`/contact/list/${url}/`, this.config);
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






    ignore(data) {
        console.log('contact ignored');
        return super.request('post', 'ignore', data);
        //return super.post(data);
    }

    remove(data) {
        console.log('contact removed');
        return super.remove(data);
    }
    cget(next) {
        return super.cget({next});
    }
};

class ApiInitial extends ApiContact {
    constructor() {
        let routing = {
            cget:   'contact/list/initial',
            remove: 'human/delete',
            post:   'human/ignore',
        };
        super(routing);
    }
}

class ApiIntimate extends ApiContact {
    constructor() {
        let routing = {
            cget:   'contact/list/initial',
            remove: 'human/delete',
            post:   'human/ignore',
        };
        super(routing);
    }
}

class ApiSends extends ApiContact {
    constructor() {
        let routing = {
            cget:   'contact/list/initial',
            remove: 'human/delete',
            ignore: 'human/ignore',
        };
        super(routing);
    }
}



var api = {
    user: new ApiUser(),
    bun: new ApiBun(),
    contacts: {
        initial: new ApiInitial(),
        intimate: new ApiIntimate(),
        sends: new ApiSends(),
    },
    messages: new ApiMessages(),
}



//ApiMessages.send();


const mutations = {
    mutations: {
        load(state, data) {
            console.log('initial-contacts');
            // console.log('!!! 8888 !!!');
            console.log(data);
            if (data && data.length > 0) {
                state.list = data;
            }
        },
        add(state, data) {
            if (data && data instanceof Array && data.length > 0) {
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
            commit('load', ls.get('initial-contacts'));
            let promise = api.contacts.initial.cget();
            promise.then((response) => {
                commit('load', response.data);
                ls.set('initial-contacts', response.data);
            });
            return promise;
        },
        DELETE({ commit }) {
            let promise = api.contacts.initial.remove();
            promise.then((response) => {
                commit('load', response.data);
                ls.set('initial-contacts', response.data);
            });
            return promise;
        },
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
            let promise = api.contacts.intimate.cget();
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
            let promise = api.contacts.sends.cget();
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
