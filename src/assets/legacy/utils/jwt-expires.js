import timexp from 'expires-unixtime';

export default {
  expired(token) {
    const time = this.expires(token);
    return time ? timexp.expired(time) : true;
  },
  expires(token) {
    if (token) {
      const data = token.split('.', 3)[1];
      const pyload = JSON.parse(global.atob(data));
      return pyload.exp;
    }
    return false;
  },
  left(token) {
    const time = this.expires(token);
    return time ? timexp.left(time) : 0;
  },
};
