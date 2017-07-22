
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
            state.list[index].message.unread = 0;
            ls.set('initial-contacts', state.list);
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
    },
    actions: {
        SYNC({rootState, commit, getters}) {
            return api.user.desireList().then((response) => {
                commit('update', response.data);
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
        },
        delete(state, index) {
            state.list.splice(index, 1);
        },
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


var search = {
    state: {
        list: [],
        url: '',
        human: {
            name: '',
            age: 0,
            city: '',
        },
        settings: {
            who: 0,
            city: '',
            up: null,
            to: null,
            town: false,
            virt: false,
            any: false,
        }
    },
    actions: {
        HUMAN({ commit }, tid) {
            let index = 'human.data.'+tid;
            commit('resetHuman', tid);
            commit('setHuman', ls.get(index));
            return api.search.get({tid}).then((response) => {
                commit('setHuman', response.data);
                ls.set(index, response.data, 1500);
            });
        },
        SETTINGS({ commit }) {
            commit('settingsCookies');
            commit('settings', ls.get('search.settings'));
            //let index = 'search.settings';
        },
        SAVE_SEARCH({state, commit}, data) {
                commit('settings', data);
                ls.set('search.settings', data);
                return api.user.saveSearch(data).then((response) => { });
        },
    },
    mutations: {
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
        settings(state, data) {
            if (data) {
                //console.log('settings:', data);
                _.assign(state.settings, data);
            }
        },
        settingsCookies(state) {
            var data = get_cookie('mail_sett');
            if (data) {
                try {
                  data = JSON.parse(data);
                }
                catch(e) { }
                state.settings.city = data.city;
                state.settings.who = Number(data.who);
                state.settings.up = Number(data.up);
                state.settings.to = Number(data.to);
                state.settings.town = Boolean(data.town);
                state.settings.virt = Boolean(data.virt);
                //console.log('dataCookies:', data);
            }
        }
    },
    getters: {
        searchURL(state, getters, rootState) {
            let settings = state.settings;
            let result = '/index.php?view=simple&town=' + rootState.user.city +
                '&years_up=' + settings.up + '&years_to=' + settings.to +
                '&who=' + settings.who +'';
            return result;
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
        last: ''
    },
    actions: {
        LOAD_USER({ commit }) {
            // if (uid) {
            //     commit('loadUser', {uid});
            // }
            commit('loadUser', ls.get('user.data'));
        },
        SAVE_SEX({ state, commit }, sex) {
            commit('loadUser', { sex, name: '' });
            if (sex) {
                api.user.saveSex(sex).then((response) => { });
                commit('loadUser', { sex });
            }
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
    },
    mutations: {
        loadUser(state, data) {
            _.assign(state, data);
            ls.set('user.data', state, 23456);
        },
        resetUser(state, data) {
            _.assign(state, data);
            ls.set('user.data', data, 23456);
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
        viewPhoto(state, data) {
            _.assign(state.photoView, data);
        },
        viewUpload(state, data) {
            state.uploadView.show = (data === true);
        },
        sendPhoto(state, data) {
            console.log('sendPhoto');
            _.assign(state.formMess.sendPhoto, data);
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
store.dispatch('accepts/LOAD');
store.dispatch('LOAD_USER');
store.dispatch('SETTINGS');


class Api {
    constructor(host, key, version, routing) {
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

class ApiUser extends Api {
    constructor() {
        let key = '1234';
        let host = '/';
        super(host, key, null, null);
    }
    saveSex(sex) {
        return this.save({sex}, null, 'option/sex');
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
        data = {
            search_sex: data.who,
            years_up: data.up,
            years_to: data.to,
            option_mess_town: data.town,
            option_virt_accept: data.virt,
        };
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
    { path: '/search/(.*)?', name: 'search', component: SearchActivity,
        beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/search'),
        children: [
            { path: ':humanId(\\d+)/(.*)?', name: 'quickMessage', meta: {back: '/search'}, component: QuickMessage, props: true },
        ]
    },
    { path: '/initial/(.*)?', name: 'initial', component: InitialDialog, props: true,
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
    { path: '(.*)?/write/:humanId(\\d+)/(.*)?', meta: {back: '.'}, component: QuickMessage, props: true },
    { path: '/confirm-sex/:show?', component: SexConfirm, props: true },

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
        { path: '(.*)?/settings/search', meta: {back: '/search'}, component: SearchSettings,
            beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/search')
        },
        { path: '(.*)?/settings/account', component: AccountSettings,
            beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/account')
        },
        { path: '(.*)?/settings/other', meta: {back: 'account'}, component: OtherSettings },
        { path: '(.*)?/settings/about', meta: {back: 'other'}, component: AboutSettings },
        { path: '(.*)?/settings/social', meta: {back: 'other'}, component: SocialSettings },
        { path: '(.*)?/settings/desires', meta: {back: 'other'}, component: DesiresSettings },
        { path: '(.*)?/settings/security', meta: {back: 'other'}, component: SecuritySettings },

        { path: '(.*)?/:humanId(\\d+)/detail', component: AccountActivity, props: true },
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