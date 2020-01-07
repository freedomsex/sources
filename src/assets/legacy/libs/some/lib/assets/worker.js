import _ from 'underscore';
// import utils from './utils';

import storage from './storage';
import dbase from './dbase';
// import base from './base';
// import hsts from './hsts';
// import image from './image';
// import navigate from './navigate';
// import requests from './requests';
// import style from './style';


// function idb() {
//   if ('indexedDB' in window) {
//     return true;
//   } if (window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB) {
//     return true;
//   }
//   return false;
// }

export default class {
  constructor() {
    this.data = {};
    this.first = true;
  }

  async persist(name, value) {
    if (this.first) {
      this.data.localData = storage.localStorage(name, value);
      this.data.sessionData = storage.sessionStorage(name, value);
      this.data.indexedDb = await dbase.indexedDb(name, value);
      // this.database_storage(name, value);

      /*
      if (this.config.idb) {
        self._indexdb_storage(name, value);
      }
      if (this.config.pngCookieName) {
        self._png(name, value);
      }
      if (this.config.etagCookieName) {
        self._etag(name, value);
      }
      if (this.config.cacheCookieName) {
        self._cache(name, value);
      }
      if (this.config.authPath) {
        self._auth(name, value);
      }

      this.data.userData = self._userdata(name, value);
      this.data.cookieData = self._cookie(name, value);
      this.data.windowData = self._window(name, value);

      if (this.config.history) {
        this.data.historyData = self._history(name, value);
      }

      ////
      // HSTS_Cookie отключено
      ////

      if (_ec_hsts) {
        this.data.hstsData = undefined;
        if (value === undefined) {
          self.hsts_cookie.get_hsts_as_int((int_val) => {
            this.data.hstsData = int_val;
          });
        } else {
          self.hsts_cookie.set_hsts_as_int(value, (val) => {
            this.data.hstsData = self.hsts_cookie.bools_to_int(val);
          });
        }
      }
*/
    }
  }

  load(name) {
    const pool = {};
    // figure out which is the best candidate
    this.persist(name);
    _.each(this.data, (element) => {
      if (element && element !== 'null' && element !== 'undefined') {
        const value = pool[element];
        if (value === undefined) {
          pool[element] = 1;
        } else {
          pool[element] += 1;
        }
      }
    });

    let bestnum = 0;
    let candidate;

    _.each(pool, (element, index) => {
      if (element > bestnum) {
        bestnum = element;
        candidate = index;
      }
    });
    return candidate;
  }

  // reset cookie everywhere
  reset(name, value) {
    if (value !== undefined) {
      this.persist(name, value);
    }
  }

  /*
  // Rewrite to Promises
  restore() {
      (
      // we support local db and haven't read data in yet
        (opts.db && window.openDatabase && typeof self._ec.dbData === 'undefined')
              || (opts.idb && idb() && (typeof self._ec.idbData === 'undefined' || self._ec.idbData === ''))
              || (opts.lso && typeof _global_lso === 'undefined')
              || (opts.etagCookieName && typeof self._ec.etagData === 'undefined')
              || (opts.cacheCookieName && typeof self._ec.cacheData === 'undefined')
              || (opts.java && typeof self._ec.javaData === 'undefined')
              || (opts.hsts && (self._ec.hstsData === undefined || self.hsts_cookie.is_working()))
              || (opts.pngCookieName && document.createElement('canvas').getContext && (typeof self._ec.pngData === 'undefined' || self._ec.pngData === ''))
              || (opts.silverlight && typeof _global_isolated === 'undefined')
      )
            && i++ < _ec_tests
    ) {
      setTimeout(() => {
        self._***(name, cb, value, i, dont_reset);
      }, 300);
    }
  },
*/
}
