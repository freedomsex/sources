
const MenuUser = Vue.component('menu-user', {
    data() {
        return {

        }
    },
    computed: {
        authorized() {
            return (this.$store.state.user.uid > 0) ? 1 : 0;
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
        initial() {
            this.$router.push({ name: 'initial' });
        },
        intimate() {
            this.$router.push({ name: 'intimate' });
        },
        loadStatus() {
            axios.get('/mailer/status').then((response) => {
                this.onIntimate(response.data.message);
                this.onInitial(response.data.contact);
            });
        },
        onIntimate(status) {
            let {notified, status: current} = this.$store.state.contacts.intimate;
            this.$store.commit('intimate/status', status);

            notified = (!notified || status != current) ? false : true;
            if (status == 1 && !notified && this.newMessage) {
                let callback = () => this.$router.push({ name: 'intimate' });
                this.$store.commit('intimate/notifi', true);
                this.$emit('snackbar', 'Новое сообщение', callback, 'Смотреть');
            }
        },
        onInitial(status) {
            let {notified, status: current} = this.$store.state.contacts.initial;
            this.$store.commit('initial/status', status);

            notified = (!notified || status != current) ? false : true;
            if (status == 1 && !notified && this.newContact && !this.newMessage) {
                let callback = () => this.$router.push({ name: 'initial' });
                this.$store.commit('initial/notifi', true);
                this.$emit('snackbar', 'Новое знакомство', callback, 'Смотреть');
            }
        },

        regmy() {
            window.location = '/?regmy';
        },
    },
    mounted() {
        let delay = 15;
        this.loadStatus();
        setInterval(() => {
            this.loadStatus();
        }, delay * 1000);
    },
});
