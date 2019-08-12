import Worker from '~legacy/service/worker';
import auth from './modules/auth';
import user from './modules/user';
import account from './modules/account';

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
  },
});

export default worker;
