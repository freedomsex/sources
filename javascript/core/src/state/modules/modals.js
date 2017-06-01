const modals = {
    state: {
        initial: false,
        intimate: false,
        sends: false,
    },
    mutations: {
        showInitial(state, data) {
            store.commit('closeAll');
            state.initial = data == true;
        },
        showIntimate(state, data) {
            store.commit('closeAll');
            state.intimate = data == true;
        },
        showSends(state, data) {
            store.commit('closeAll');
            state.sends = data == true;
        },
        closeAll(state) {
            state.initial  = false;
            state.intimate = false;
            state.sends    = false;
        }
    }
}