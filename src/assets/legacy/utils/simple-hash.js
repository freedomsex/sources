export default {
  hash: null,
  generate() {
    const now = new Date();
    return now.getTime();
  },
  getHash() {
    return this.hash;
  },
  setHash() {
    this.hash = this.generate();
  },
  reset() {
    this.setHash();
  },
  random() {
    return this.generate();
  },
};
