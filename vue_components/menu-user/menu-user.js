
const MenuUser = Vue.component('menu-user', {
    data() {
        return {
            attempt: 0
        }
    },
    mounted() {
        this.loadStatus();
    },
    computed: {
        authorized() {
            let uid = this.$store.state.user.uid;
            let reg = this.$store.getters.registered;
            return (uid > 0) ? 1 : 0;
        },
        newMessage() {
            let {status} = this.$store.state.contacts.intimate;
            return (status == false) || status < 8;
        },
        newContact() {
            let {status} = this.$store.state.contacts.initial;
            return (status == false) || status < 8;
        },
        signature() {
            var results = 'Кто вы?';
            let {name, city, age, sex} = this.$store.state.user;
            if (sex) {
                results = sex == 1 ? 'Парень' : 'Девушка';
                results = name ? name : results;
                return results + ' ' + (age ? age : '') + ' ' + (city ? city : '');
            }
            return results;
        }
    },
    methods: {
        search() {
            this.$store.commit('simple', true);
            this.$root.reload();
            this.$router.push('/');
        },
        initial() {
            this.$router.push({ name: 'initial' });
        },
        intimate() {
            this.$router.push({ name: 'intimate' });
        },
        check() {
            axios.get('/mailer/status').then((response) => {
                this.onIntimate(response.data.message);
                this.onInitial(response.data.contact);
                this.attempt = 0;
            }).catch(() => {
                this.attempt++;
            });
        },
        loadStatus() {
            let {auth} = this.$store.state.auth;
            let delay = !auth ? 1 : 15;
            if (auth) {
                this.check();
            }
            if (this.attempt > 4) {
                delay = 5;
            } else
            if (this.attempt > 2) {
                delay = 3;
            }
            setTimeout(() => {
                this.loadStatus();
            }, delay * 1000);
        },
        onIntimate(status) {
            let {notified, status: current} = this.$store.state.contacts.intimate;
            this.$store.commit('intimate/status', status);

            notified = (!notified || status != current) ? false : true;
            if (status == 1 && !notified && this.newMessage) {
                let callback = () => this.$router.push({ name: 'intimate' });
                this.$store.commit('intimate/notifi', true);
                this.$emit('snackbar', 'Новое сообщение', callback, 'Смотреть', true);
            }
        },
        onInitial(status) {
            let {notified, status: current} = this.$store.state.contacts.initial;
            this.$store.commit('initial/status', status);

            notified = (!notified || status != current) ? false : true;
            if (status == 1 && !notified && this.newContact && !this.newMessage) {
                let callback = () => this.$router.push({ name: 'initial' });
                this.$store.commit('initial/notifi', true);
                this.$emit('snackbar', 'Новое знакомство', callback, 'Смотреть', true);
            }
        },

        regmy() {
            window.location = '/user/regnow';
        },
    },
});
