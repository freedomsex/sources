export default {
  state: {
    initial: false,
    intimate: false,
    sends: false,
  },
  mutations: {
    showInitial({state, commit}, data) {
      commit('closeAll');
      state.initial = data == true;
    },
    showIntimate({state, commit}, data) {
      commit('closeAll');
      state.intimate = data == true;
    },
    showSends({state, commit}, data) {
      commit('closeAll');
      state.sends = data == true;
    },
    closeAll({state}) {
      state.initial = false;
      state.intimate = false;
      state.sends = false;
    },
  },
};
