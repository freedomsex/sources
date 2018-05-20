import json from './json';

export default {
  enabled: 0,
  get_cookie(name) {
    const results = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    if (results) return unescape(results[2]);
    return null;
  },

  del_cookie(name) {
    const expires = new Date(); // получаем текущую дату
    expires.setTime(expires.getTime() - 1000);
    document.cookie = `${name}=; expires=${expires.toGMTString()}; path=/`;
  },

  set_cookie(name, val, time) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (1000 * 60 * time)); // минут
    document.cookie = `${name}=${val}; expires=${expires.toGMTString()}; path=/`;
  },

  get_data(name) {
    return json.parse(this.get_cookie(name));
  },
};
