
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
