import CONFIG from '~config/';
import Api from '~config/rest-api/core';
import ApiUser from '~config/rest-api/user';

class ApiBun extends Api {
  constructor() {
    const key = '1234';
    const host = '/';
    super(host, key);
  }

  send(data) {
    return this.post(data, null, 'mess/bun/');
  }
}

class ApiMessages extends Api {
  constructor() {
    const key = '1234';
    const host = '/';
    super(host, key);
  }

  send(data) {
    return this.post(data, null, 'mailer/post/');
  }

  status() {
    return this.load(null, 'mailer/status');
  }

  bun(data) {
    return this.post(data, null, 'mess/bun');
  }

  delete(data) {
    return this.post(data, null, 'mess/delete');
  }

  check(list) {
    return this.load(null, `mailer/check_${list}`);
  }
}

class ApiModerator extends Api {
  constructor() {
    const key = '1234';
    const host = '/';
    super(host, key);
  }

  promt() {
    return this.post(null, null, 'moder/promt');
  }

  load() {
    return this.post(null, null, 'moder/auth');
  }

  press(data) {
    return this.post(data, null, 'moder/press');
  }
}

class ApiSearch extends Api {
  constructor() {
    const key = '1234';
    const host = `${CONFIG.API_SEARCH}/`;
    const routing = {
      route: 'users',
      get: '{uid}',
    };
    super(host, key, null, routing);
  }
}

class ApiContact extends Api {
  constructor(routing) {
    const key = 1234;
    const host = `${CONFIG.API_CONTACT}/api/v1/`;
    super(host, key, null, routing);
  }

  // refreshToken(token) {
  //   this.setAuthKey(token.apiToken);
  // }
}

class ApiInitial extends ApiContact {
  constructor() {
    const routing = {
      route: 'users/{uid}/initials',
    };
    super(routing);
  }
}

class ApiIntimate extends ApiContact {
  constructor() {
    const routing = {
      route: 'users/{uid}/intimates',
    };
    super(routing);
  }
}

class ApiSends extends ApiContact {
  constructor() {
    const routing = {
      route: 'users/{uid}/sends',
    };
    super(routing);
  }
}

export default {
  user: new ApiUser(),
  search: new ApiSearch(),
  bun: new ApiBun(),
  contacts: {
    initial: new ApiInitial(),
    intimate: new ApiIntimate(),
    sends: new ApiSends(),
  },
  messages: new ApiMessages(),
  moderator: new ApiModerator(),
  raw: new Api(),
};

// ApiMessages.send();
