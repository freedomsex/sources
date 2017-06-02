
const mutations = {
    load(state, data) {
        if (data && data instanceof Array && data.length > 0) {
            state.list = data;
        }
    },
    add(state, data) {
        if (data && data instanceof Array && data.length > 0) {
            state.list = _.union(state.list, data);
        }
    }
}
// // //

const initial = _.extend({
    namespaced: true,
    state: {
        list: []
    },
    actions: {
        LOAD({ state, commit, rootState }) {
            commit('load', ls.get('initial-contacts'));
            return api.contacts.initial.cget({
                uid: rootState.user.uid,
                offset: 0
            }).then((response) => {
                commit('load', response.data);
                ls.set('initial-contacts', state.list);
            });
        },
        NEXT({ state, commit, rootState }, offset) {
            return api.contacts.initial.cget({
                uid: rootState.user.uid,
                offset
            }).then((response) => {
                commit('add', response.data);
            });
        },
        DELETE({ state, commit, rootState }, index) {
            let result = api.contacts.initial.delete({
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('delete', index);
            return result;
        },
        READ({ state, commit, rootState }, index) {
            let result = api.contacts.initial.put(null, {
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('read', index);
            return result;
        },
    },
    mutations: _.extend({
        delete(state, index) {
            state.list.splice(index, 1);
            ls.set('initial-contacts', state.list);
        },
        read(state, index) {
            state.list[index].message.unread = 0;
            ls.set('initial-contacts', state.list);
        }
    }, mutations)
});

const intimate = _.extend({
    namespaced: true,
    state: {
        list: []
    },
    actions: {
        LOAD({ state, commit, rootState }) {
            commit('load', ls.get('intimate-contacts'));
            return api.contacts.intimate.cget({
                uid: rootState.user.uid,
                offset: 0
            }).then((response) => {
                commit('load', response.data);
                ls.set('intimate-contacts', state.list);
            });
        },
        NEXT({ state, commit, rootState }, offset) {
            return api.contacts.intimate.cget({
                uid: rootState.user.uid,
                offset
            }).then((response) => {
                commit('add', response.data);
            });
        },
        DELETE({ state, commit, rootState }, index) {
            let result = api.contacts.intimate.delete({
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('delete', index);
            return result;
        },
        READ({ state, commit, rootState }, index) {
            let result = api.contacts.initial.put(null, {
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('read', index);
            return result;
        },
    },
    mutations: _.extend({
        delete(state, index) {
            state.list.splice(index, 1);
            ls.set('intimate-contacts', state.list);
        },
        read(state, index) {
            state.list[index].message.unread = 0;
            ls.set('intimate-contacts', state.list);
        }
    }, mutations)
});

const sends = _.extend({
    namespaced: true,
    state: {
        list: []
    },
    actions: {
        LOAD({ state, commit, rootState }) {
            commit('load', ls.get('sends-contacts'));
            return api.contacts.sends.cget({
                uid: rootState.user.uid,
                offset: 0
            }).then((response) => {
                commit('load', response.data);
                ls.set('sends-contacts', state.list);
            });
        },
        NEXT({ state, commit, rootState }, offset) {
            return api.contacts.sends.cget({
                uid: rootState.user.uid,
                offset
            }).then((response) => {
                commit('add', response.data);
            });
        },
        DELETE({ state, commit, rootState }, index) {
            let result = api.contacts.sends.delete({
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('delete', index);
            return result;
        },
    },
    mutations: _.extend({
        delete(state, index) {
            state.list.splice(index, 1);
            ls.set('sends-contacts', state.list);
        }
    }, mutations)
});


const contacts = {
    modules: {
        initial,
        intimate,
        sends
    }
}

const modals = {
    state: {
        initial: false,
        intimate: false,
        sends: false,
    },
    mutations: {
        showInitial(state, data) {
            store.commit('closeAll');
            state.initial = data == true;
        },
        showIntimate(state, data) {
            store.commit('closeAll');
            state.intimate = data == true;
        },
        showSends(state, data) {
            store.commit('closeAll');
            state.sends = data == true;
        },
        closeAll(state) {
            state.initial  = false;
            state.intimate = false;
            state.sends    = false;
        }
    }
}

const search = {
    state: {
        list: [],
        human: {}
    },
    actions: {
        human({ commit }, tid) {
            //commit('load', ls.get('initial-contacts'));
            commit('resetHuman', tid);
            let promise = api.search.get({tid});
            promise.then((response) => {
                commit('setHuman', response.data);
                //ls.set('initial-contacts', response.data);
            });
            return promise;
        },
    },
    mutations: {
        resetHuman(state, tid) {
            if (state.human && state.human.id != tid) {
                state.human = {};
            }
        },
        setHuman(state, data) {
            //console.log(data);
            state.human = data;
        },
    }
};

const user = {
    state: {
        uid: 0,
        sex: 0,
    },
    actions: {
        LOAD_USER({ commit }) {
            if (uid) {
                commit('loadUser', {uid});
            }
            if (typeof user_sex != 'undefined') {
                commit('loadUser', {sex: user_sex});
            }
        },
        SAVE_SEX({ commit }, sex) {
            let promise = api.user.saveSex(sex);
            promise.then((response) => {
                if (response.data.sex) {
                    store.commit('loadUser', { sex: response.data.sex });
                }
            });
            return promise;
        },
    },
    mutations: {
        loadUser(state, data) {
            _.extend(state, data);
        },
    }
}


moment.locale('ru');

var ls = lscache;

const store = new Vuex.Store({
    modules: {
        user,
        search,
        contacts,
        modals
    },
    state: {
        apiToken: '',
        //photoServer: '127.0.0.1:8888',
        photoServer: '@@API-PHOTO',
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
            console.log('sendPhoto');
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


class Api {
    constructor(host, key, version, routing) {
        // Delay requests sec
        let delay = '@@NET-DELAY';         // [!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]

        let ver = version ? 'v' + version + '/' : '';
        this.root = host + ver;
        this.key = key;
        this.config = {
            baseURL: this.root,
            headers: {'Authorization': 'Bearer ' + key}
        }
        this.wait = delay * 1000; //
        this.routing = {
            route: '',
            load: '',
            get: '{resource_id}',
            cget: '',
            send: '',
            post: '',
            save: '',
            remove: '',
            delete: '{resource_id}',
            put: '{resource_id}',
            patch: '{resource_id}',
            option: '{resource_id}'
        };
        _.extend(this.routing, routing);
    }
    setParams(params, url) {
        let result = url.replace(/\{(.*?)\}/ig, (match, token) => {
            let slug = params[token];
            delete params[token];
            return slug;
        });
        //console.log('url: ', [this.root, result, params]);
        this.config.params = params ? params : {};
        return result;
    }
    setUrl(method, params, url) {
        let route = this.routing.route;
        if (url) {
            result = url;
        } else {
            let action = this.routing[method];
            result = route ? route : '';
            if (result && action) {
                result = result + '/' + action;
            } else if(action) {
                result = action;
            }
        }
        result = this.setParams(params, result);
        return this.root + result;
    }

    get(params, url) {
        return this.delay(axios.get(this.setUrl('get', params, url), this.config), 0);
    }
    load(params, url) {
        return this.delay(axios.get(this.setUrl('load', params, url), this.config), 0);
    }
    cget(params, url) {
        return this.delay(axios.get(this.setUrl('cget', params, url), this.config), 0);
    }
    send(params, url) {
        return this.delay(axios.get(this.setUrl('send', params, url), this.config), 0);
    }
    post(data, params, url) {
        return this.delay(axios.post(this.setUrl('post', params, url), data, this.config), 0);
    }
    save(data, params, url) {
        return this.delay(axios.post(this.setUrl('save', params, url), data, this.config), 0);
    }
    remove(data, params, url) {
        return this.delay(axios.post(this.setUrl('remove', params, url), data, this.config), 0);
    }
    delete(params, url) {
        return this.delay(axios.delete(this.setUrl('delete', params, url), this.config), 0);
    }
    put(data, params, url) {
        return this.delay(axios.put(this.setUrl('put', params, url), data, this.config), 0);
    }
    patch(data, params, url) {
        return this.delay(axios.patch(this.setUrl('patch', params, url), data, this.config), 0);
    }
    request(method, action, data, params, url) {
        // this.config.method = method;
        // this.config.url = this.setUrl(action, url);
        // this.config.data = data;
        // this.config.params = params;
        // return this.delay(axios.request(this.config), 0);
        if (data) {
            return this.delay(axios[method](this.setUrl(action, params, url), data, this.config), 0);
        } else {
            return this.delay(axios[method](this.setUrl(action, params, url), this.config), 0);
        }
    }
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
}

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
}


class ApiMessages extends Api {
    constructor() {
        let key = '1234';
        let host = '/';
        super(host, key);
    }
    send(data) {
        return this.post(data, null, 'mailer/post/');
    }
}

class ApiUser extends Api {
    constructor() {
        let key = '1234';
        let host = '/';
        let routing = {
            post: 'option/sex',
        };
        super(host, key, null, routing);
    }
    saveSex(sex) {
        return this.post({sex});
    }
}

class ApiSearch extends Api {
    constructor() {
        let key = '1234';
        let host = 'http://@@API-SEARCH/';
        let routing = {
            route: 'users',
            get: '{tid}',
        };
        super(host, key, null, routing);
    }
}




class ApiContact extends Api {
    constructor(routing) {
        let key = store.state.apiToken;
        let host = 'http://@@API-CONTACT/';
        super(host, key, null, routing);
    }
}

class ApiInitial extends ApiContact {
    constructor() {
        let routing = {
            route:  'users/{uid}/initials',
        };
        super(routing);
    }
}

class ApiIntimate extends ApiContact {
    constructor() {
        let routing = {
            route: 'users/{uid}/intimates',
        };
        super(routing);
    }
}

class ApiSends extends ApiContact {
    constructor() {
        let routing = {
            route: 'users/{uid}/sends',
        };
        super(routing);
    }
}



var api = {
    user: new ApiUser(),
    search: new ApiSearch(),
    bun: new ApiBun(),
    contacts: {
        initial: new ApiInitial(),
        intimate: new ApiIntimate(),
        sends: new ApiSends(),
    },
    messages: new ApiMessages(),
};



//ApiMessages.send();
