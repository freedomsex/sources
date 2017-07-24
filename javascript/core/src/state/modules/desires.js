
const desires = {
    namespaced: true,
    state: {
        list: [],
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
            ls.set('desires', state.list);
        },
        delete(state, index) {
            state.list.splice(index, 1);
            ls.set('desires', state.list);
        },
    }
};
