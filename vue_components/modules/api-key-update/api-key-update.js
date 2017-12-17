Vue.component('api-key-update', {
    props: [
      'item',
    ],
    data() {
        return {
            attempt: 0,
        }
    },
    mounted() {
        this.load();
    },
    methods: {
        tick(delay) {
            setTimeout(() => {
                this.load();
            }, 1000 * delay);
        },
        reload() {
            let delay = 1;
            if (this.attempt >= 10) {
                delay = 300;
            } else
            if (this.attempt >= 5) {
                delay = 5;
            } else
            if (this.attempt >= 2) {
                delay = 3;
            }
            this.attempt++;
            this.tick(delay);
        },
        load() {
            this.$store.dispatch('auth/UPDATE_KEY').then(({data}) => {
                if (data.uid) {
                    this.upKey(data);
                } else
                if (data.reg) {
                    this.noReg(data);
                } else {
                    this.reload();
                }
            });
        },
        noReg(data) {
            // зарегистрирован / не авторизован
            this.upKey(data);
        },
        upKey(data) {
            this.$store.dispatch('LOAD_API_TOKEN');
            this.upUser(data);
            this.upSettings(data);
            this.attempt = 0;
            this.tick(600);
        },
        upUser(data) {
            let {uid, city, sex, age, name, contacts, apromt: promt} = data;
            //console.log('upUser', data);
            this.$store.commit('resetUser', {uid, city, sex, age, name, contacts, promt});
            //store.commit('loadUser', data.contacts);
        },
        upSettings(data) {
            let {up, to, any, virt} = data;
            this.$store.commit('settings', {up, to, virt, any});
        }
    },
    template: '#api-key-update'
});
