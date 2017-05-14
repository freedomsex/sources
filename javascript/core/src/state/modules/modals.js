const modals = {
    state: {
        initial: false,
        intimate: false,
        sends: false,
    },
    mutations: {
        showInitial(state, data) {
            state.initial = data == true;
        },
        showIntimate(state, data) {
            state.intimate = data == true;
        },
        showSends(state, data) {
            state.sends = data == true;
        },
    }
}