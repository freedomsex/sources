
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
