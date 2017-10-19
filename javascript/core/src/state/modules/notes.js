
const notes = {
    namespaced: true,
    state: {
        db: null,
    },
    actions: {
        INIT({state, commit, rootState}) {
            api.raw.load(null, `static/json/notes/${rootState.locale}.json`).then(({ data }) => {
                state.db.transaction('rw', state.db.writes, function () {
                    _.each(data.reverse(), (element, index, list) => {
                        commit('add', element);
                    });
                });
            });
        },
        LOAD({state, dispatch, rootState}) {
            let uid = rootState.user.uid;
            state.db = new Dexie("DataBaseFS__"+uid);
            state.db.version(1).stores({
                writes: "++id, &text, count, updated",
            });
            state.db.on('ready', function () {
                state.db.writes.count((count) => {
                    if (!count) {
                        dispatch('INIT');
                    }
                });
            });
            state.db.open();
        },
        WRITES({state}) {
            return state.db.writes
            .orderBy('count')
            .reverse().limit(100)
            .sortBy('updated');
        },
        ITEM({state, commit}, id) {
            return state.db.writes.get(id);
        },
        UPDATE({state, commit}, text) {
            let updated = getTimestamp();
            state.db.writes.get({text}).then((item) => {
                if (item) {
                    count = item.count ? item.count : 0;
                    count += 1;// console.log('UPDATE', [count, updated]);
                    state.db.writes.update(item.id, {count, updated});
                } else {
                    commit('add', text);
                }
            });
        },
    },
    mutations: {
        add(state, text) {
            let updated = getTimestamp();
            state.db.writes.add({ text, count: 0, updated });
        },
    }
};
