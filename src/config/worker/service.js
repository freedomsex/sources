import Worker from '~legacy/service/worker';
import auth from './modules/auth';
import user from './modules/user';
import account from './modules/account';
import visits from './modules/visits';
import desires from './modules/desires';
import email from './modules/email';
import search from './modules/search';
import messages from './modules/messages';
import human from './modules/human';
import client from './modules/client';
import security from './modules/security';
import notice from './modules/notice';
import feedback from './modules/feedback';

import initials from './modules/contacts/initials';
import intimates from './modules/contacts/intimates';
import offers from './modules/contacts/offers';

const worker = new Worker({
  // created() {
  //
  // },
  // destroyed() {
  //
  // },
  tasks: {
    rootTask(data) {
      console.log('global task', data);
    },
  },
  modules: {
    auth,
    user,
    account,
    security,
    visits,
    desires,
    email,
    search,
    messages,
    initials,
    intimates,
    offers,
    human,
    client,
    notice,
    feedback,
  },
});

export default worker;
