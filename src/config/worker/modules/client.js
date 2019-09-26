import _ from 'underscore';
import ClientId from 'fingerprintjs2';

export default {
  hash(data) {
    const items = data.map(item => item.value);
    return ClientId.x64hash128(items.join(''), 31);
  },
  generate() {
    return ClientId.getPromise();
  },
  parse(data) {
    const items = {};
    data.map((item) => {
      items[item.key] = item.value;
      return null;
    });
    return _.pick(items, ['userAgent', 'webdriver', 'language', 'colorDepth', 'deviceMemory', 'hardwareConcurrency', 'screenResolution', 'availableScreenResolution', 'timezoneOffset', 'timezone', 'sessionStorage', 'localStorage', 'indexedDb', 'addBehavior', 'openDatabase', 'cpuClass', 'platform', 'plugins', 'webglVendorAndRenderer', 'adBlock', 'hasLiedLanguages', 'hasLiedResolution', 'hasLiedOs', 'hasLiedBrowser', 'touchSupport', 'fonts', 'audio']);
  },
  handle(store, data) {
    const hash = this.hash(data);
    store.commit('client/hash', hash);
    const items = this.parse(data);
    store.commit('client/data', items);
  },

  tasks: {
    start({store}) {
      if (global.requestIdleCallback) {
        global.requestIdleCallback(() => {
          this.generate().then(data => this.handle(store, data));
        });
      } else {
        setTimeout(() => {
          this.generate().then(data => this.handle(store, data));
        }, 500);
      }
    },
  },
};
