import _ from 'underscore';
import config from './assets/default';
import Worker from './assets/worker';

export default class Lib extends Worker {
  constructor(options) {
    super(options);
    this.config = _.assign({}, options, config);
  }

  get(name, skip) {
    const value = this.load(name);
    if (value && !skip) {
      this.reset(name, value);
    }
    return value;
  }

  set(name, value) {
    return this.persist(name, value);
  }

  let(name, reserve) {
    const value = this.get(name);
    if (!value) {
      this.set(name, reserve);
      return reserve;
    }
    return value;
  }
}
