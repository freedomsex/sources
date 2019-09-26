import service from '../config/worker/service';
import api from '../config/api';
import {store} from '~store';

export default {
  install(Vue) {
    service.api(api);
    service.store(store);
    Vue.prototype.$service = service;
  },
};
