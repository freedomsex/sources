export default {
  tasks: {
    registration({api, root}, token) {
      return api.res('registration/create', 'auth').post({token}).then(({data}) => {
        root.run('auth/token', data);
        return data;
      });
    },

    fallback({api, root}, captcha) {
      return api.res('registration/fallback', 'auth').post(captcha).then(({data}) => {
        root.run('auth/token', data);
        return data;
      });
    },

    // finished({api, root}, data) {
    //   if (!data.error) {
    //     this.saveSex(data);
    //   } else {
    //     this.onError(data);
    //   }
    // },

  },
};
