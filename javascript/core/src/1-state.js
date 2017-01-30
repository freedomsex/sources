var ls = storage;

const store = new Vuex.Store({
    state: {
        count: 0,
        user: {
            data: {
                id: 0,
                sex: 0,
                age: '',
                name: '',
                city: '',
                up: '',
                to: '',
                who: 0,
                close:   0,
                virt:    0,
                status:  0,
                em: 0,
                vk: 0,
                ok: 0,
                fb: 0,
                go: 0,
                sk: 0,
                ph: 0,
                tags: {
                    str: ''
                },
                last: '',
                anketa: {
                    growth: '',
                    weight: '',
                    figure: ''
                }
            },
            auth: {
                iss: '',
                exp: '',
                iat: '',
                sid: '',
                uis: '',
                auth: '',
                ip:  ''
            },
            login: {
                login: '',
                pass:  '',
                email: '',
                promt: '',
                last:  '',
                error: '',
                subsc: 0
            },
            moderator: {
                promt: 0,
                rank:  0,
                resident: 0,
                action: 0,
                data: {
                    action: 0,
                    effect: 0,
                    bunn: 0,
                    rang: ''
                }
            },
            credits: {
                count: 0,
                info: ''
            }
        }
    },
    actions: {
        LOAD_USER_DATA({ commit }) {
            console.log('load');
            store.commit('setUserData', lscache.get('user'));
            axios.get('/users/10336.json').then((response) => {
                //this.response(data.body);
                store.commit('setUserData', response.data.user);
                //console.log(response.data.user);
            }).catch((response) => {
                console.log('error user data');
            });
        }
    },
    mutations: {
        setUserData (state, data) {
            if (data) {
                Object.assign(state.user.data, data);
                lscache.set('user', data, 23456);
            }
            //ls.set('auth', 2);
        }
    },
    getters: {

    }
});

store.dispatch('LOAD_USER_DATA');