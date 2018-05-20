import json from './json';

export default {
  enable: 0,

  init() {
    if (this.is_enable()) {
      this.enable = 1;
    }
  },

  is_enable() {
    try {
      return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
      return false;
    }
  },

  save(key, val) {
    if (this.enable) {
      localStorage.setItem(key, val);
    }
  },

  load(key, def) {
    let result = def || null;

    if (this.enable && localStorage.getItem(key)) {
      result = localStorage.getItem(key);
    }

    return result;
  },

  array: {
    load(key) {
      let result = [];
      let value = null;

      value = this.load(key);
      value = json.parse(value);
      if (value) result = value;

      return result;
    },

    save(key, val) {
      this.save(key, json.encode(val));
    },
  },
};
