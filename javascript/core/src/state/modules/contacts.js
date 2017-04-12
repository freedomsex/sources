
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
