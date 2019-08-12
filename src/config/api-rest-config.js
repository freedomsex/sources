import Api from 'axios-rest-api';
import config from './index';

const resouses = [];

resouses.default = {
  delay: config.NET_DELAY,
  prefix: 'api',
  version: 'v1',
};

resouses.raw = {
  host: '',
  prefix: '',
  version: '',
  routing: {},
};

resouses.mailer = {
  host: config.API_MAILER,
  prefix: 'mailer/api',
};

resouses.auth = {
  host: config.API_AUTH,
};


const api = new Api(resouses);
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
