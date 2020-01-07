export default {
  localStorage(name, value) {
    try {
      const localStore = window.localStorage;
      if (localStore) {
        if (value !== undefined) {
          localStore.setItem(name, value);
        } else {
          return localStore.getItem(name);
        }
      }
    } catch (e) {
      //
    }
    return null;
  },

  sessionStorage(name, value) {
    try {
      const {sessionStorage} = window;
      if (sessionStorage) {
        if (value !== undefined) {
          sessionStorage.setItem(name, value);
        } else {
          return sessionStorage.getItem(name);
        }
      }
    } catch (e) {
      //
    }
    return null;
  },

};
