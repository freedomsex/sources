import api from '../config/api-rest-config';

export default {
  install(Vue) {
    Vue.prototype.$api = api;
  },
};
