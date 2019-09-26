import api from '../config/api';

export default {
  install(Vue) {
    Vue.prototype.$api = api;
  },
};
