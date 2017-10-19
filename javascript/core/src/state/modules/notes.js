
const notes = {
    namespaced: true,
    state: {
        db: null,
    },
    actions: {
        INIT({dispatch, rootState}) {
            api.raw.load(null, `static/json/notes/${rootState.locale}.json`).then(({ data }) => {
                _.each(data.reverse(), (element, index, list) => {
                    dispatch('ADD', element);
                });
            });
        },
        LOAD({state, dispatch}) {
            state.db = new Dexie("Notepad");
            state.db.version(1).stores({
                writes: "++id, &text, count, updated",
            });
            state.db.on("populate", dispatch('INIT'));
            state.db.open();
        },
        WRITES({state}) {
            return state.db.writes.orderBy('updated').reverse().sortBy('count');
        },
        ITEM({state, commit}, id) {
            return state.db.writes.get(id);
        },
        UPDATE({state, dispatch}, text) {
            let updated = getTimestamp();
            state.db.writes.get({text}).then((item) => {
                if (item) {
                    count = item.count ? item.count : 0;
                    count += 1; console.log('UPDATE', [count, updated]);
                    state.db.writes.update(item.id, {count, updated});
                } else {
                    dispatch('ADD', text);
                }
            });
        },
        ADD({state}, text) {
            let updated = getTimestamp();
            state.db.writes.add({ text, count: 0, updated });
        },
    },
};
