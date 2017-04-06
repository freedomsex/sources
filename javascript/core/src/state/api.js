
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
    send(data, handler, error) {
        axios.post('mess/bun/', data, this.config).then((response) => {
            //this.$emit('remove', this.index);
        }).catch((error) => {
            //console.log('error');
        });
        console.log('ApiBun Bun-Bun');
    }
};

class ApiContact extends Api {
    remove(data, handler, error) {
        axios.post('human/delete/', data, this.config).then((response) => {
            //this.$emit('remove', this.index);
        }).catch((error) => {
            //console.log('error');
        });
        console.log('ApiContact removed');
    }

    ignore(data, handler, error) {
        axios.post('human/ignore/', data, this.config).then((response) => {

        }).catch((e) => {
            error(e);
        });
        console.log('ApiContact ignored');
    }

    getList(url, handler, error) {
        axios.get(`/contact/list/${url}/`, this.config).then((response) => {
            handler(response.data);
        }).catch((error) => {
            error(error);
        });
    }

    initialList(handler, error) {
        this.getList('initial', handler, error);
    }

    intimateList(handler, error) {
        this.getList('intimate', handler, error);
    }

    sendsList(handler, error) {
        this.getList('sends', handler, error);
    }
};

class ApiMessages extends Api {
    send(data, handler, error) {
        console.log(this);
        axios.post('mailer/post/', data, this.config).then((response) => {
            handler(response.data);
        }).catch((error) => {
            console.log(error);
        });
        console.log('ApiMessages send !!!');
    }
};

class ApiUser extends Api {
    saveSex(data, handler, error) {
        axios.post('/option/sex/', data, this.config).then((response) => {
            if (response.data.sex) {
                store.commit('loadUser', { sex: response.data.sex });
                handler();
            }
        }).catch((e) => {
            console.log(e);
            error();
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
