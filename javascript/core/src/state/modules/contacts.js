
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
        LOAD({ commit }, next) {
            commit('load', ls.get('initial-contacts'));
            let promise = api.contacts.initial.cget('10336', next);
            promise.then((response) => {
                commit('load', response.data);
                ls.set('initial-contacts', response.data);
            });
            return promise;
        },
        DELETE({ commit }, params) {
            let promise = api.contacts.initial.delete(params);
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
        LOAD({ commit }, next) {
            commit('load', ls.get('intimate-contacts'));
            let promise = api.contacts.intimate.cget('10336', next);
            promise.then((response) => {
                commit('load', response.data);
                ls.set('intimate-contacts', response.data);
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
        LOAD({ commit }, next) {
            commit('load', ls.get('sends-contacts'));
            let promise = api.contacts.sends.cget('10336', next);
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
