import _ from 'underscore';
import axios from 'axios';

let retryAttempt = false;

axios.interceptors.response.use(response => response,
  (error) => {
    // retry the request that errored out
    if (error.response && error.response.status === 401) {
      if (retryAttempt) {
        global.App.$root.unauthorized();
      } else {
        retryAttempt = true; // now it can be retried
        return global.App.$root.refresh().then(() => axios(error.config));
      }
    }
    return Promise.reject(error);
  });

export default class requests {
  get(params, url) {
    return this.delay(axios.get(this.setUrl('get', params, url), this.config), 0);
  }

  load(params, url) {
    return this.delay(axios.get(this.setUrl('load', params, url), this.config), 0);
  }

  cget(params, url) {
    return this.delay(axios.get(this.setUrl('cget', params, url), this.config), 0);
  }

  send(params, url) {
    return this.delay(axios.get(this.setUrl('send', params, url), this.config), 0);
  }

  post(data, params, url) {
    return this.delay(axios.post(this.setUrl('post', params, url), data, this.config), 0);
  }

  save(data, params, url) {
    return this.delay(axios.post(this.setUrl('save', params, url), data, this.config), 0);
  }

  remove(data, params, url) {
    return this.delay(axios.post(this.setUrl('remove', params, url), data, this.config), 0);
  }

  delete(params, url) {
    return this.delay(axios.delete(this.setUrl('delete', params, url), this.config), 0);
  }

  put(data, params, url) {
    return this.delay(axios.put(this.setUrl('put', params, url), data, this.config), 0);
  }

  patch(data, params, url) {
    return this.delay(axios.patch(this.setUrl('patch', params, url), data, this.config), 0);
  }

  request(method, action, data, params, url) {
    // this.config.method = method;
    // this.config.url = this.setUrl(action, url);
    // this.config.data = data;
    // this.config.params = params;
    // return this.delay(axios.request(this.config), 0);
    if (data) {
      return this.delay(axios[method](this.setUrl(action, params, url), data, this.config), 0);
    }
    return this.delay(axios[method](this.setUrl(action, params, url), this.config), 0);
  }
  // option() {}

  delay(result, wait) {
    let msec = wait || this.wait;
    if (msec < this.wait) {
      msec = this.wait;
    }
    if (msec == 0 || typeof Promise === 'undefined') {
      return result;
    }
    return new Promise((resolve) => {
      // result.catch((error) => {
      //   global.App.$root.requestError(error);
      // });
      _.delay(resolve, msec, result);
    });
  }
}
