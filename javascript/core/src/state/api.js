
moment.locale('ru');

var ls = lscache;

class Api {
    constructor(host, key, version, routing) {
        // Delay requests msec
        this.wait = 5000; //

        let ver = version ? 'v' + version + '/' : '';
        this.root = host + ver;
        this.key = key;
        this.config = {
            baseURL: this.root,
            headers: {'Authorization': 'Bearer ' + key}
        }
        this.routing = {
            route: '',
            load: '',
            get: '',
            cget: '',
            send: '',
            post: '',
            save: '',
            remove: '',
            delete: '',
            put: '',
            patch: '',
            option: '',
        };
        _.extend(this.routing, routing);
    }
    setUrl(method, url) {
        let result = this.routing.route;
        if (url) {
            result = url;
        } else {
            let action = this.routing[method];
            result = action ? action : result;
        }
        //console.log('url: ', [this.root, result])
        return this.root + result;
    }
    setParams(params) {
        this.config.params = params ? params : {};
    }

    get(params, url) {
        this.setParams(params);
        return this.delay(axios.get(this.setUrl('get', url), this.config), 0);
    }
    load(params, url) {
        this.setParams(params);
        return this.delay(axios.get(this.setUrl('load', url), this.config), 0);
    }
    cget(params, url) {
        this.setParams(params);
        return this.delay(axios.get(this.setUrl('cget', url), this.config), 0);
    }
    send(params, url) {
        this.setParams(params);
        return this.delay(axios.get(this.setUrl('send', url), this.config), 0);
    }
    post(data, params, url) {
        this.setParams(params);
        return this.delay(axios.post(this.setUrl('post', url), data, this.config), 0);
    }
    save(data, params, url) {
        this.setParams(params);
        return this.delay(axios.post(this.setUrl('save', url), data, this.config), 0);
    }
    remove(data, params, url) {
        this.setParams(params);
        return this.delay(axios.post(this.setUrl('remove', url), data, this.config), 0);
    }
    delete(data, params, url) {
        this.setParams(params);
        return this.delay(axios.post(this.setUrl('delete', url), data, this.config), 0);
    }
    request(method, action, data, params, url) {
        // this.config.method = method;
        // this.config.url = this.setUrl(action, url);
        // this.config.data = data;
        // this.config.params = params;
        // return this.delay(axios.request(this.config), 0);
        if (data) {
            return this.delay(axios[method](this.setUrl(action, url), data, this.config), 0);
        } else {
            return this.delay(axios[method](this.setUrl(action, url), this.config), 0);
        }
    }

    put() {}
    patch() {}
    option() {}

    delay(result, wait) {
        let msec = wait ? wait : this.wait;
        if (msec < this.wait) {
            msec = this.wait;
        }
        if(msec == 0 || typeof Promise == "undefined") {
            return result;
        }
        return new Promise((resolve, reject) => {
            _.delay(resolve, msec, result);
        });
    }
};

class ApiBun extends Api {
    constructor() {
        let key = '1234';
        let host = '/';
        super(host, key);
    }
    send(data) {

        return axios.post('mess/bun/', data, this.config);
        console.log('ApiBun Bun-Bun');
    }
};


class ApiMessages extends Api {
    constructor() {
        let key = '1234';
        let host = '/';
        super(host, key);
    }
    send(data) {
        console.log(this);
        return axios.post('mailer/post/', data, this.config);
        console.log('ApiMessages send !!!');
    }
};

class ApiUser extends Api {
    constructor() {
        let key = '1234';
        let host = '/';
        super(host, key);
    }
    saveSex(data) {
        return axios.post('/option/sex/', data, this.config).then((response) => {
            if (response.data.sex) {
                store.commit('loadUser', { sex: response.data.sex });
                handler();
            }
        }).catch((e) => {
            console.log(e);
        });
    }
};




class ApiContact extends Api {
    constructor(routing) {
        let key = '1234';
        let host = '/';
        super(host, key, null, routing);
    }

    getList(url) {
        return axios.get(`/contact/list/${url}/`, this.config);
    }

    initialList() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.getList('initial'));
            }, 5000);
        });
    }

    intimateList() {
        return this.getList('intimate');
    }

    sendsList() {
        return this.getList('sends');
    }






    ignore(data) {
        console.log('contact ignored');
        return super.request('post', 'ignore', data);
        //return super.post(data);
    }

    remove(data) {
        console.log('contact removed');
        return super.remove(data);
    }
    cget(next) {
        return super.cget({next});
    }
};

class ApiInitial extends ApiContact {
    constructor() {
        let routing = {
            cget:   'contact/list/initial',
            remove: 'human/delete',
            post:   'human/ignore',
        };
        super(routing);
    }
}

class ApiIntimate extends ApiContact {
    constructor() {
        let routing = {
            cget:   'contact/list/initial',
            remove: 'human/delete',
            post:   'human/ignore',
        };
        super(routing);
    }
}

class ApiSends extends ApiContact {
    constructor() {
        let routing = {
            cget:   'contact/list/initial',
            remove: 'human/delete',
            ignore: 'human/ignore',
        };
        super(routing);
    }
}



var api = {
    user: new ApiUser(),
    bun: new ApiBun(),
    contacts: {
        initial: new ApiInitial(),
        intimate: new ApiIntimate(),
        sends: new ApiSends(),
    },
    messages: new ApiMessages(),
}



//ApiMessages.send();
