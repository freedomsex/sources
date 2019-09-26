export default {
  tasks: {
    password({api}, pass) {
      return api.res('option/passwd', 'raw').save({pass});
    },
    login({api}, login) {
      return api.res('option/login', 'raw').save({login});
    },
  },
};
