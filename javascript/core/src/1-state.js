var ls = storage;

const store = new Vuex.Store({
    state: {
        count: 0,
        photoView: {
            thumb:  null,
            photo:  null,
            height: null,
        },
        uploadView: {
            show: false
        },
        formMess: {
            sendTo: null,
            sendPhoto: {
                thumb:  null,
                photo:  null,
                height: null,
                width:  null,
            }
        }
    },
    actions: {
        // LOAD_USER_DATA({ commit }) {
        //     console.log('load');
        //     store.commit('setUserData', lscache.get('user'));
        //     axios.get('/users/10336.json').then((response) => {
        //         //this.response(data.body);
        //         store.commit('setUserData', response.data.user);
        //         //console.log(response.data.user);
        //     }).catch((response) => {
        //         console.log('error user data');
        //     });
        // }
    },
    mutations: {
        // setUserData (state, data) {
        //     if (data) {
        //         Object.assign(state.user.data, data);
        //         lscache.set('user', data, 23456);
        //     }
        //     //ls.set('auth', 2);
        // },
        viewPhoto(state, data) {
            Object.assign(state.photoView, data);
        },
        viewUpload(state, data) {
            state.uploadView.show = (data === true);
        },
        sendPhoto(state, data) {
            Object.assign(state.formMess.sendPhoto, data);
        },
    },
    getters: {

    }
});

//store.dispatch('LOAD_USER_DATA');
