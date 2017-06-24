
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
            commit('settingsCookies'); console.log('search.settings');
            commit('settings', ls.get('search.settings'));
            //let index = 'search.settings';
        },
        SAVE_SEARCH({state, commit}, data) {
                commit('settings', data);
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
                state.settings.city = '';
                state.settings.who = data.who;
                state.settings.up = data.up;
                state.settings.to = data.to;
                state.settings.town = data.town;
                state.settings.virt = data.virt;
            }
        }
    },
    getters: {
        searchURL(state) {
            let settings = state.settings;
            let result = '/index.php?view=simple&town=' + settings.city +
                '&years_up=' + settings.up + '&years_to=' + settings.to +
                '&who=' + settings.who +'';
            return result;
        }
    }
};
