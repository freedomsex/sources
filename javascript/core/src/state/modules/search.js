
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
                console.log('HUMAN actions', tid);
            api.search.get({tid}).then(({data}) => {
                commit('setHuman', data);
                ls.set(index, data, 1500);
            });
            commit('setHuman', ls.get(index));
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
                console.log('HUMAN', data);
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
