import _ from 'underscore';

const humanState = {
  id: 0,
  message: '',
  userpic: null,
  name: '',
  age: 0,
  city: '',
  sex: 0,
  up: null,
  to: null,
  tags: [],
  em: 0,
  vk: 0,
  ok: 0,
  fb: 0,
  go: 0,
  sk: 0,
  ph: 0,
  last: null,
  reload: false,
  vip: {
    status: 0,
    credits: 0,
  },
};

export default {
  namespaced: true,
  state: humanState,
  mutations: {
    reset(state) {
      _.assign(state, humanState);
      state.reload = true;
    },
    update(state, data) {
      if (data) {
        _.assign(state, data);
      }
    },
  },
};
