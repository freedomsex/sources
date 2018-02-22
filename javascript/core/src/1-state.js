
const about = {
    namespaced: true,
    state: {
        growth: 0,
        weight: 0,
        figure: 0
    },
    actions: {
        SYNC({rootState, commit, getters}) {
            return api.user.syncAbout().then((response) => {
                commit('update', response.data);
            });
        },
        SAVE({state, commit}, data) {
            api.user.saveAbout({anketa: data}).then((response) => {
                commit('update', data);
            });
        }
    },
    mutations: {
        update(state, data) {
            if (data) {
                _.assign(state, data);
            }
        },
    }
};


const accepts = {
    namespaced: true,
    state: {
        photo: false,
        search: false,
        moderator: false,
        settings: false,
    },
    actions: {
        LOAD({state}) {
            let data = ls.get('accepts');
            if (data) {
                _.assign(state, data);
            }
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
        moderator(state, value) {
            state.moderator = (value == true);
            ls.set('accepts', state);
        },
        settings(state) {
            state.settings = true;
            ls.set('accepts', state);
        },
    }
};


const auth = {
    namespaced: true,
    state: {
        iss: '',
        exp: '',
        iat: '',
        sid: '',
        uid: '',
        auth: '',
        ip:  '',
            login: '',
            pass:  '',
            email: '',
            promt: '',
            subscr: false,
        last:  '',
        error: ''
    },
    actions: {
        SYNC({commit}) {
            return api.user.syncAuth().then((response) => {
                commit('update', response.data);
            });
        },
        SAVE_LOGIN({commit}, data) {
            return api.user.saveLogin(data);
        },
        SAVE_PASSWD({commit}, data) {
            return api.user.savePasswd(data);
        },
        SAVE_EMAIL({commit}, data) {
            return api.user.saveEmail(data);
        },
        REMOVE_EMAIL({commit}) {
            return api.user.removeEmail();
        },
        SAVE_SUSCRIBE({store, commit}, data) {
            commit('subscr');
            return api.user.saveSubscribe();
        },
        UPDATE_KEY({store, commit}) {
            return axios.get('/sync/sess/');
        }
    },
    mutations: {
        update(state, data) {
            if (data) {
                _.assign(state, data);
            }
        },
        subscr(state) {
            state.subscr = state.subscr ? false : true;
        }
    }
};


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
    },
    status(state, status) {
        state.status = status;
    },
    notifi(state, status) {
        state.notified = status == true;
    }
}
// // //

const initial = _.extend({
    namespaced: true,
    state: {
        status: 8,
        notified: false,
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
        CHECK({commit}) {
            axios.get('/mailer/check_contact').then(() => {
                commit('status', 8);
                commit('notifi', false);
            });
        }
    },
    mutations: _.extend({
        delete(state, index) {
            state.list.splice(index, 1);
            ls.set('initial-contacts', state.list);
        },
        read(state, index) {
            if (state.list[index].message) {
                state.list[index].message.unread = 0;
                ls.set('initial-contacts', state.list);
            }
        }
    }, mutations)
});

const intimate = _.extend({
    namespaced: true,
    state: {
        status: 8,
        notified: false,
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
            let result = api.contacts.intimate.put(null, {
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('read', index);
            return result;
        },
        CHECK({commit}) {
            axios.get('/mailer/check_message').then(() => {
                commit('status', 8);
                commit('notifi', false);
            });
        }
    },
    mutations: _.extend({
        delete(state, index) {
            state.list.splice(index, 1);
            ls.set('intimate-contacts', state.list);
        },
        read(state, index) {
            if (state.list[index].message) {
                state.list[index].message.unread = 0;
                ls.set('intimate-contacts', state.list);
            }
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


const credits = {
    state: {
        count: 0,
        info: ''
    },
    actions: {

    },
    mutations: {

    }
};


const desires = {
    namespaced: true,
    state: {
        list: [],
        limit: 20,
    },
    actions: {
        PICK({commit}) {
            commit('update', ls.get('desires'));
        },
        SYNC({state, commit}) {
            commit('update', ls.get('desires'));
            return api.user.desireList().then((response) => {
                commit('update', response.data);
                ls.set('desires', state.list);
            });
        },
        ADD({state, commit}, tag) {
            //commit('add', tag);
            return api.user.desireAdd(tag).then((response) => {
                let id = response.data.id;
                commit('add', {id, tag});
            });
        },
        DELETE({state, commit}, index) {
            let result = api.user.desireDelete(state.list[index].id);
            commit('delete', index);
            return result;
        }
    },
    mutations: {
        update(state, data) {
            if (data && data.length) {
                state.list = data.slice();
            }
        },
        add(state, data) {
            state.list.unshift(data);
            state.list = state.list.slice(0, state.limit);
            ls.set('desires', state.list);
        },
        delete(state, index) {
            state.list.splice(index, 1);
            ls.set('desires', state.list);
        },
    },
    getters: {
        tags(state) {
            return _.pluck(state.list, 'tag');
        }
    }
};

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

const moderator = {
    state: {
        promt: 0,
        rank:  0,
        resident: 0,
        action: 0,
        effect: 0,
        bunn: 0,
        rang: ''
    },
    actions: {

    },
    mutations: {

    }
};


const notes = {
    namespaced: true,
    state: {
        db: null,
    },
    actions: {
        INIT({state, commit, rootState}) {
            api.raw.load(null, `static/json/notes/${rootState.locale}.json`).then(({ data }) => {
                state.db.transaction('rw', state.db.writes, function () {
                    _.each(data.reverse(), (element, index, list) => {
                        commit('add', element);
                    });
                });
            });
        },
        LOAD({state, dispatch, rootState}) {
            let uid = rootState.user.uid;
            state.db = new Dexie("DataBaseFS__"+uid);
            state.db.version(1).stores({
                writes: "++id, &text, count, updated",
            });
            state.db.on('ready', function () {
                state.db.writes.count((count) => {
                    if (!count) {
                        dispatch('INIT');
                    }
                });
            });
            state.db.open();
        },
        WRITES({state}) {
            return state.db.writes
            .orderBy('updated')
            .reverse().limit(100)
            .sortBy('count');
        },
        ITEM({state, commit}, id) {
            return state.db.writes.get(id);
        },
        UPDATE({state, commit}, text) {
            let updated = getTimestamp();
            state.db.writes.get({text}).then((item) => {
                if (item) {
                    count = item.count ? item.count : 0;
                    count += 1;// console.log('UPDATE', [count, updated]);
                    state.db.writes.update(item.id, {count, updated});
                } else {
                    commit('add', text);
                }
            });
        },
    },
    mutations: {
        add(state, text) {
            let updated = getTimestamp();
            state.db.writes.add({ text, count: 0, updated });
        },
    }
};


var search = {
    namespaced: true,
    state: {
        list: [],
        last: [],
        received: 0,
        next: null,
        batch: 15,
        url: '',
        human: {
            name: '',
            age: 0,
            city: '',
        },
    },
    actions: {
        HUMAN({ commit }, tid) {
            let index = 'human.data.'+tid;
            commit('resetHuman', tid);
            commit('setHuman', ls.get(index));
                console.log('HUMAN', tid);
            return api.search.get({tid}).then((response) => {
                commit('setHuman', response.data);
                ls.set(index, response.data, 1500);
            });
        },
        LOAD({state, rootState, commit}, params) {
            store.dispatch('LOAD_USER'); // КОСТЫЛЬ [!!!]
            let {sex, any, virt} = rootState.user;
            let {who, city, up, to} = params;
            if (sex) {
                who = (sex == 2) ? 1 : 2;
            }
            if (!city || any) {
                city = null;
            }
            console.log('SRCH-LOAD', {who, sex, city, up, to, any, virt});
            console.log('User.data', ls.get('user.data'));
            return api.search.load({who, city, up, to, next: state.next}).then(({data}) => {
                commit('results', data);
                commit('last', data);
                commit('next');
            });
        },
    },
    mutations: {
        reset(state) {
            state.next = 0;
            state.list = [];
            state.received = 0;
        },
        // Сбросить предыдущие данные, если там что-то не то
        resetHuman(state, tid) {
            if (state.human && state.human.id != tid) {
                state.human = {};
            }
        },
        setHuman(state, data) {
            if (data) {
                state.human = data;
            }
        },
        results(state, {users}) {
            state.received = users ? users.length : 0;
            if (users && state.received) {
                state.list = _.union(state.list, users);
            }
            //state.next += state.batch;
        },
        last(state, {users}) {
            if (users && !state.last) {
                state.last = users;
                ls.set('last-search', users, 31*24*60*60);
            }
        },
        next(state, reset) {
            if (reset) {
                state.next = 0;
            } else {
                state.next += state.batch;
            }
        },
    },
    getters: {
        virgin(state, getters, rootState) {
            let {city, up, to} = rootState.user;
            return (!city && !up && !to);
        },
        more(state) {
            return (state.received && state.received == state.batch) ? true : false;
        },
        tags(state) {
            return _.compact(_.union(_.flatten(_.pluck(state.list, 'tags'))));
        }
    }
};

const user = {
    state: {
        uid: 0,
        sex: 0,
        age: 0,
        name: '',
        city: '',
        up: null,
        to: null,
        any: 0,
        virt: 0,
        contacts: {
            em: 0,
            vk: 0,
            ok: 0,
            fb: 0,
            go: 0,
            sk: 0,
            ph: 0,
        },
        tags: {
            str: ''
        },
        status: 0,
        promt: null,
        last: ''
    },
    actions: {
        LOAD_USER({ commit }) {
            // if (uid) {
            //     commit('loadUser', {uid});
            // }
            commit('loadUser', ls.get('user.data'));
        },

        REGISTRATION({ state, commit }, token) {
            if (token) {
                api.user.regnow(token).then(({data}) => {
                    location.reload();
                });
            }
        },

        SAVE_SEX({ state, commit }, { sex, token }) {
            commit('loadUser', { sex, name: '' });
            return api.user.saveSex(sex, token);
        },
        SAVE_AGE({ state, commit }, age) {
            if (age && state.age != age) {
                api.user.saveAge(age).then((response) => { });
                commit('loadUser', {age});
            }
        },
        SAVE_NAME({ state, commit }, name) {
            if (name && state.name != name) {
                api.user.saveName(name).then((response) => { });
                commit('loadUser', {name});
            }
        },
        SAVE_CITY({ state, commit }, city) {
            if (city && state.city != city) {
                api.user.saveCity(city).then((response) => { });
                commit('loadUser', {city});
            }
        },
        SAVE_CONTACTS({ state, commit }, contacts) {
            api.user.saveContacts(contacts).then((response) => { });
            commit('loadUser', {contacts});
        },
        SAVE_SEARCH({state, commit}, data) {
            commit('loadUser', data);
            return api.user.saveSearch(data).then((response) => { });
        },
    },
    mutations: {
        loadUser(state, data) {
            _.assign(state, data);
            ls.set('user.data', state, 23456);
        },
        resetUser(state, data) {
            _.assign(state, data);
            ls.set('user.data', state, 23456);
        },
        settings(state, data) {
            _.assign(state, data);
            ls.set('user.data', state, 23456);
        },
    }
}


const visited = {
    namespaced: true,
    state: {
        list: [],
    },
    actions: {
        SYNC({rootState, state, commit}) {
            let index = 'visited-' + rootState.user.uid;
            commit('update', ls.get(index));
            return api.user.visitedList().then((response) => {
                let {data} = response;
                commit('update', data);
                ls.set(index, state.list, 31*24*60*60);
            });
        },
        ADD({rootState, state, commit}, tid) {
            let uid = rootState.user.uid;
            let index = 'visited-' + uid;
            commit('add', tid);
            ls.set(index, state.list, 31*24*60*60);
            return api.user.visitedAdd(uid, tid).then((response) => {

            });
        }
    },
    mutations: {
        update(state, data) {
            if (data && data.length) {
                state.list = _.union(state.list, data);
            }
        },
        add(state, data) {
            state.list.unshift(data);
        },
    }
};


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
        modals,
        notes,
    },
    state: {
        ready: false,
        locale: 'ru',
        apiToken: '',
        grecaptchaToken: null,
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
        grecaptchaTokenUpdate(state, token) {
            state.grecaptchaToken = token;
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



class Api {
    constructor(host, key, version, routing) {
        host = host ? host : '/';
        // Delay requests sec
        this.setDelay('@@NET-DELAY');
        // [!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]
        this.setRoot(host, version);
        this.setConfig(this.root, key);
        this.setRouting(routing);
    }

    setDelay(sec) {
        this.wait = sec * 1000; //
    }
    setRouting(routing) {
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
    setRoot(host, version) {
        let ver = version ? 'v' + version + '/' : '';
        this.root = host + ver;
    }

    setConfig(url, key) {
        this.config = {
            baseURL: url,
            headers: {
                'Authorization': 'Bearer ' + key
            }
        };
    }

    setBaseURL(url) {
        _.extend(this.config, {
            baseURL: url
        });
    }

    setAuthKey(key) {
        _.extend(this.config.headers, {
            'Authorization': 'Bearer ' + key
        });
        this.key = key;
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
        this.refresh();
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

    refresh() {
        store.dispatch('LOAD_API_TOKEN');
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

class ApiModerator extends Api {
    constructor() {
        let key = '1234';
        let host = '/';
        super(host, key);
    }
    promt() {
        return this.post(null, null, 'moder/promt');
    }
    load() {
        return this.post(null, null, 'moder/auth');
    }
    press(data) {
        return this.post(data, null, 'moder/press');
    }
}

class ApiUser extends Api {
    constructor() {
        let key = '1234';
        let host = '/';
        super(host, key, null, null);
    }
    regnow(token) {
        return this.save({token}, null, 'user/regnow');
    }
    saveSex(sex, token) {
        return this.save({sex, token}, null, 'option/sex');
    }
    saveAge(age) {
        return super.save({age}, null, 'option/age');
    }
    saveName(name) {
        return super.save({name}, null, 'option/name');
    }
    saveCity(city) {
        return super.save({city}, null, 'option/city');
    }
    saveContacts(data) {
        return super.save({contact: data}, null, 'option/contact');
    }

    saveSearch(data) {
        return super.save(data, null, 'msett/save');
    }

    syncAbout() {
        return super.load(null, 'sync/anketa');
    }
    saveAbout(data) {
        return super.save(data, null, 'option/anketa');
    }

    syncAuth() {
        return super.load(null, 'sync/authdata');
    }
    saveLogin(login) {
        return super.save({login}, null, 'option/login');
    }
    savePasswd(pass) {
        return super.save({pass}, null, 'option/passwd');
    }
    saveEmail(email) {
        return super.save({email}, null, 'option/email');
    }
    removeEmail() {
        return super.remove(null, null, 'option/demail');
    }
    saveSubscribe() {
        return super.save(null, null, 'option/subscr');
    }


    desireList() {
        return super.load(null, 'tag/user');
    }
    desireAdd(tag) {
        return super.save({tag}, null, 'tag/add');
    }
    desireDelete(id) {
        return super.remove({id}, null, 'tag/del');
    }

    visitedList() {
        return super.load(null, 'contact/visited');
    }
    visitedAdd(uid, tid) {
        return super.send({tid,uid}, 'contact/addvisit/{uid}');
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

    refresh() {
        store.dispatch('LOAD_API_TOKEN');
        this.setAuthKey(store.state.apiToken);
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
    moderator: new ApiModerator(),
    raw: new Api(),
};



//ApiMessages.send();


// window.onbeforeunload = function(e) {
//   var dialogText = 'Вы действительно хотите покинуть приложение?';
//   e.returnValue = dialogText;
//   return dialogText;
// };

////
// РОУТЕР ==========================================================
////

// const routes = [
//     { path: '/sends-contacts', name: 'sends', component: SendsDialog, props: { quick: false } },
//     { path: '/initial-contacts', name: 'initial', component: InitialDialog, props: { quick: true } },
//     { path: '/intimate-contacts',  name: 'intimate', component: IntimateDialog, props: { quick: false },
//         // children: [
//         //     {
//         //         path: 'quick-reply',
//         //         component: HumanDialog,
//         //         props: {
//         //             show : true
//         //         }
//         //     },
//         // ]
//     }
// ];

var routes = [
    { path: '/write/:humanId(\\d+)/(.*)?', name: 'quickWrite', component: QuickMessage, props: true,
            beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/message')
    },
    // { path: '/', name: 'search', component: SearchActivity,
    //     beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/search'),
    //     children: [
    //         { path: ':humanId(\\d+)/(.*)?', name: 'quickMessage', meta: {back: '/search'}, component: QuickMessage, props: true },
    //     ]
    // },
    { path: '/initial/(.*)?', name: 'initial', component: InitialDialog, props: {reply: true},
        //beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/messages'),
        children: [
            { path: ':humanId(\\d+)/(.*)?', name: 'quickReply', meta: {back: '/initial'}, component: QuickReply, props: true },
        ]
    },
    { path: '/intimate/(.*)?', name: 'intimate', component: IntimateDialog, props: true,
        //beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/messages'),
        children: [
            { path: ':humanId(\\d+)/(.*)?', name: 'dialog', meta: {back: '/intimate'}, component: MessagesActivity, props: true,
                children: [
                    { path: 'uploads', name: 'uploads', meta: {back: '.'}, component: PhotoSettings, props: true },
                    { path: 'incoming', name: 'incoming', meta: {back: '.'}, component: IncomingPhoto, props: true },
                    // { path: 'preview', name: 'preview', component: PhotoViewer, props: true },
                ]
            },
        ]
    },
    { path: '/confirm-sex/:show?', component: SexConfirm, props: true },
    { path: '/protect', component: ModeratorActivity },

    { path: '/content/deal/:link/:locale?', component: DealContentPage, props: true },
    { path: '/content/rules/:locale?', component: RulesContentPage, props: true },
    { path: '/content/careers/:locale?', component: СareersContentPage, props: true },
    { path: '/help/:link/:locale?', component: HelpContentPage, props: true },
    { path: '/releases/:link/:locale?', component: ReleaseContentPage, props: true },
    // { path: '/promo/:link', component: ContentModal, props: true },

    { path: '(.*)?/settings/search', meta: {back: '/'}, component: SearchSettings,
        beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/search')
    },
    { path: '(.*)?/settings/account', component: AccountSettings,
        beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/account')
    },
    { path: '(.*)?/settings/other', component: OtherSettings },
    { path: '(.*)?/settings/about', meta: {back: 'other'}, component: AboutSettings },
    { path: '(.*)?/settings/social', meta: {back: 'other'}, component: SocialSettings },
    { path: '(.*)?/settings/desires', meta: {back: 'other'}, component: DesiresSettings ,
            beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/search')
    },
    { path: '(.*)?/settings/security', meta: {back: 'other'}, component: SecuritySettings },
    { path: '(.*)?/settings/reviews', meta: {back: 'other'}, component: ReviewSettings },
    { path: '(.*)?/settings/question', meta: {back: 'other'}, component: QuestionActivity },
    { path: '(.*)?/settings/envelop', meta: {back: 'other'}, component: EnvelopSettings },
    { path: '(.*)?/wizard/city', meta: {back: '/settings/account'}, component: CityWizard,
        beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/city')
    },

];

var router = new VueRouter({
  //mode: 'history',
  routes
});

// router.beforeEach((to, from, next) => {
//     console.log('router:', [to, from]);
//     next();
// });

// =================================================================
//
// =================================================================

var settingsRouter = new VueRouter({
    //mode: 'history',
    routes: [
        { path: '/search/settings/account', meta: {back: 'search'}, component: AccountSettings },

        { path: '(.*)?/:humanId(\\d+)/detail', component: AccountActivity, props: true },
        { path: '(.*)?/notepad', component: Notepad, props: true },
        // { path: '(.*)?/uploads', component: PhotoSettings },
        // { path: '(.*)?/preview', name: 'preview', component: PhotoViewer, props: true },

        { path: '/login', name: 'login', component: LoginAccount },
    ]
});

settingsRouter.beforeEach((to, from, next) => {
    // console.log('sRouter:', [to, from]);
    if (!to.meta.back) {
        to.meta.back = from.fullPath;
    }
    next();
});