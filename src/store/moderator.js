export default {
  namespaced: true,
  state: {
    promt: 0,
    rank: 0,
    resident: 0,
    action: 0,
    effect: 0,
    bun: 0,
    grade: 0,
    credits: 0,
    return: 0,
    arbitr: 0,
    lock: 0,
  },
  mutations: {
    sync(state, data) {
      state.promt = data.promt;
      state.rank = data.rank;
      state.resident = data.resident;
      state.action = data.action;
      state.effect = data.effect;
      state.bun = data.bun;
      state.lock = data.lock;
      state.grade = data.grade;
      state.return = data.return;
      state.arbitr = data.arbitr;
    },
  },
};
