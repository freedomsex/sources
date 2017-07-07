
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
