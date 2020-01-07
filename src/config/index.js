const config = {
  development: {
    NET_DELAY: 3,
    API_PHOTO: 'http://127.0.0.1:8001',
    API_SEARCH: 'http://127.0.0.1:8007',
    API_CONTACT: 'http://127.0.0.1:8000',
    API_VIRIFY: 'http://127.0.0.1:8010',
    API_AUTH: 'http://127.0.0.1:8009',
    API_DIALOG: 'http://127.0.0.1:8011',
    API_MAILER: 'http://127.0.0.1:8000',
    API_NOTICE: 'http://127.0.0.1:8000',
    PROTECT_LINK: 'http://adb.me',
  },
  production: {
    NET_DELAY: 0,
    API_PHOTO: 'https://photo.a4sex.net',
    API_SEARCH: 'https://search.a4sex.net',
    API_CONTACT: 'https://contact.a4sex.net',
    API_VIRIFY: 'https://verify.a4sex.net',
    API_AUTH: 'https://auth.a4sex.net',
    API_DIALOG: 'https://dialog.a4sex.net',
    API_MAILER: 'https://mailer.a4sex.net',
    API_NOTICE: 'https://notice.a4sex.net',
    PROTECT_LINK: 'http://admin4sex.com',
  },
  get(env) {
    return this[env];
  },
};

export default config[process.env.NODE_ENV];
