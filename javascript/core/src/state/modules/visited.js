
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
