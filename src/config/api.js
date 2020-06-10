import Api from 'axios-rest-api';
import config from './index';

const resourses = [];

resourses.default = {
  delay: config.NET_DELAY,
  prefix: 'api',
  version: 'v1',
};

resourses.raw = {
  host: '',
  prefix: '',
  version: '',
  routing: {},
};

resourses.verify = {
  host: config.API_VIRIFY,
  prefix: '',
  version: '',
};

resourses.mailer = {
  host: config.API_MAILER,
  prefix: 'mailer/api',
};

resourses.auth = {
  host: config.API_AUTH,
};

resourses.search = {
  host: config.API_SEARCH,
  routing: {route: 'users'},
  prefix: '',
  version: '',
};

// resouses.messages = {
//   host: config.API_CONTACT,
//   routing: {route: 'users/{uid}/initials'},
// };

resourses.initials = {
  host: config.API_CONTACT,
  routing: {route: 'users/{uid}/initials'},
};

resourses.intimates = {
  host: config.API_CONTACT,
  routing: {route: 'users/{uid}/intimates'},
};

resourses.sends = {
  host: config.API_CONTACT,
  routing: {route: 'users/{uid}/sends'},
};

resourses.dialog = {
  host: config.API_DIALOG,
  routing: {route: 'users/{uid}/dialog',
    put: 'read'},
};

resourses.notice = {
  prefix: 'api',
  version: '',
  host: config.API_NOTICE,
};

resourses.a4sex = {
  prefix: 'api',
  version: '',
  host: config.API_A4SEX,
};


const api = new Api(resourses);
export default api;


// const retryAttempt = false;

// axios.interceptors.response.use(response => response, (error) => {
//   // retry the request that errored out
//   if (error.response.status === 401) {
//     if (retryAttempt) {
//       global.App.$root.unauthorized();
//     } else {
//       retryAttempt = true; // now it can be retried
//       return global.App.$root.refresh().then(() => axios(error.config));
//     }
//   }
//   return Promise.reject(error);
// });
