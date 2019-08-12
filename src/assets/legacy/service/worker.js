import _ from 'underscore';
import lscache from 'lscache';
import cookies from '~assets/legacy/utils/cookies'; // TODO: remove

export default class Worker {
  constructor(config) {
    // super();
    this.$api = {};
    this.$store = {};
    this.$session = {};
    this.$cache = lscache;
    this.defaults = {
      expire: 86400 * 30 * 3,
    };
    this.tasks = config.tasks || {};
    this.loadModules(config.modules);
    // this.created();
  }

  api(api) {
    if (api) {
      this.$api = api;
    }
    return this.$api;
  }

  store(store) {
    if (store) {
      this.$store = store;
    }
    return this.$store;
  }

  loadModules(modules) {
    _.each(modules, (module, namespace) => {
      _.each(module.tasks, (task, name) => {
        this.tasks[`${namespace}/${name}`] = task;
      });
    });
  }

  saveCache(key, value, expire) {
    return this.$cache.set(key, value, expire || this.defaults.expire);
  }

  loadCache(key, defaults) {
    return this.$cache.get(key) || defaults || null;
  }

  flush(key, expire, exclude) {
    const data = this.$store.state[key];
    this.save(key, data, expire, exclude);
  }

  load(key, defaults) {
    const data = this.loadCache(key, defaults);
    this.$store.commit(key, data);
  }

  save(key, value, expire, exclude) {
    this.$store.commit(key, value);
    let data = value;
    if (_.isObject(value) && exclude) {
      data = _.omit(value, exclude);
    }
    this.saveCache(key, data, expire);
  }


  session(key) {
    this.$session[key] = true;
  }

  run(task, args) {
    return this.tasks[task]({
      run: this.run,
      api: this.$api,
      store: this.$store,
      root: this,
      cookies,
    }, args);
  }
}
