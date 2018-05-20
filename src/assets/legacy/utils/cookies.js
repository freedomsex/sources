export default {
  get(name) {
    const results = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    if (results) {
      return unescape(results[2]);
    }
    return null;
  },
  set(name, val, time) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (1000 * 60 * time)); // минут
    document.cookie = `${name}=${val}; expires=${expires.toGMTString()}; path=/`;
  },
  remove(name) {
    this.set(name, null, -10);
  },
};
