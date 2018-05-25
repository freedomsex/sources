const config = {
  development: {
    NET_DELAY: 0,
    API_PHOTO: '127.0.0.1:8008',
    API_SEARCH: '127.0.0.1:9000',
    API_CONTACT: '127.0.0.1:8000',
  },
  production: {
    NET_DELAY: 0,
    API_PHOTO: 'photo.a4sex.net',
    API_SEARCH: 'search.a4sex.net',
    API_CONTACT: 'contact.a4sex.net',
  },
  get(env) {
    return this[env];
  },
};

export default config[process.env.NODE_ENV];
