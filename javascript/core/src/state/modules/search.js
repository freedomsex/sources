
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
                console.log('HUMAN', tid);
            return api.search.get({tid}).then((response) => {
                commit('setHuman', response.data);
                ls.set(index, response.data, 1500);
            });
        },
        LOAD({state, rootState, commit}) {
            let {who, city, up, to, any} = state.settings;
            let sex = rootState.user.sex;
            up = up ? up : 0;
            to = to ? to : 0;
            if (!city || any) {
                city = null;
            }
            return api.search.load({sex, who, city, up, to, next: state.next}).then(({data}) => {
                commit('results', data);
                commit('last', data);
                commit('next');
            });
        },
        RESET_SEARCH() {

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
            state.next += state.batch;
        },
        last(state, {users}) {
            if (users && !state.last) {
                state.last = users;
                ls.set('last-search', users, 31*24*60*60);
            }
        },
        settings(state, data) {
            if (data) {
                //console.log('settings:', data);
                _.assign(state.settings, data);
            }
        },
        next(state, reset) {
            if (reset) {
                state.next = 0;
            } else {
                state.next += state.batch;
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
        virgin(state, getters, rootState) {
            let {who, up, to} = state.settings;
            return (!who && !rootState.user.city && !up && !to);
        },
        more(state) {
            return (state.received && state.received == state.batch) ? true : false;
        },
        tags(state) {
            return _.compact(_.union(_.flatten(_.pluck(state.list, 'tags'))));
        }
    }
};
