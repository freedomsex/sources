export default {
  tasks: {
    check({api}, list) {
      return api.res(`mailer/check_${list}`, 'raw').load();
    },
  },
};
