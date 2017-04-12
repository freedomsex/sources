
moment.locale('ru');

var ls = lscache;

class Api {
    constructor(host, key) {
        this.root = host + '/';
        this.key = key;
        this.config = {
            baseURL: this.root,
            headers: {'Authorization': 'Bearer ' + key}
        }
    }
};

class ApiBun extends Api {
    send(data) {
        return axios.post('mess/bun/', data, this.config);
        console.log('ApiBun Bun-Bun');
    }
};

class ApiContact extends Api {
    remove(data, handler, error) {
        return axios.post('human/delete/', data, this.config).catch((error) => {
            this.error(error);
        });
        console.log('ApiContact removed');
    }

    ignore(data, handler, error) {
        return axios.post('human/ignore/', data, this.config).catch((error) => {
            this.error(error);
        });
        console.log('ApiContact ignored');
    }

    getList(url) {
        return axios.get(`/contact/list/${url}/`, this.config).catch((error) => {
            this.error(error);
        });
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
};

class ApiMessages extends Api {
    send(data) {
        console.log(this);
        return axios.post('mailer/post/', data, this.config);
        console.log('ApiMessages send !!!');
    }
};

class ApiUser extends Api {
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

var apiUser     = new ApiUser('', 1234);
var apiBun      = new ApiBun('', 1234);
var apiContact  = new ApiContact('', 1234);
var apiMessages = new ApiMessages('', 1234);
//  = _.create(Api.prototype, {
//     host: '/',
//     jwt: '1234',
// });


//ApiMessages.send();
