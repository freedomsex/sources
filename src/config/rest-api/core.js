import _ from 'underscore';
import {store} from '~store';

import CONFIG from '~config/';
import requests from '~config/rest-api/requests';

export default class Api extends requests {
  constructor(host, key, version, routing) {
    /* eslint-disable-next-line */
    const defHost = host || '/';
    super();
    this.store = store;
    // Delay requests sec
    this.setDelay(CONFIG.NET_DELAY);
    // [!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]
    this.setRoot(defHost, version);
    this.setConfig(this.root, key);
    this.setRouting(routing);
  }

  setDelay(sec) {
    this.wait = sec * 1000; //
  }
  setRouting(routing) {
    this.routing = {
      route: '',
      load: '',
      get: '{resource_id}',
      cget: '',
      send: '',
      post: '',
      save: '',
      remove: '',
      delete: '{resource_id}',
      put: '{resource_id}',
      patch: '{resource_id}',
      option: '{resource_id}',
    };
    _.extend(this.routing, routing);
  }
  setRoot(host, version) {
    const ver = version ? `v${version}/` : '';
    this.root = host + ver;
  }

  setConfig(url, key) {
    this.config = {
      baseURL: url,
      headers: {
        Authorization: `Bearer ${key}`,
      },
    };
  }

  setBaseURL(url) {
    _.extend(this.config, {
      baseURL: url,
    });
  }

  setAuthKey(key) {
    _.extend(this.config.headers, {
      Authorization: `Bearer ${key}`,
    });
    this.key = key;
  }

  setParams(params, url) {
    const result = url.replace(/\{(.*?)\}/gi, (match, token) => {
      const slug = params[token];
      delete params[token];
      return slug;
    });
    // console.log('url: ', [this.root, result, params]);
    this.config.params = params || {};
    return result;
  }
  setUrl(method, params, url) {
    this.refresh();
    const {route} = this.routing;
    let result;
    if (url) {
      result = url;
    } else {
      const action = this.routing[method];
      result = route || '';
      if (result && action) {
        result = `${result}/${action}`;
      } else if (action) {
        result = action;
      }
    }
    result = this.setParams(params, result);
    return this.root + result;
  }

  refresh() {
    // store.dispatch('LOAD_API_TOKEN');
    // TODO: remove old hack
    console.log('!!!!!!! refresh LOAD_API_TOKEN disabled !!!!!!!!');
    return this;
  }
}
