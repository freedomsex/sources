Vue.component('auth-board', {
    data() {
        return {
            confirmSend: false,
            hint: 'Введите ваш емаил.',
            process: false,
            email: ''
        }
    },
    mounted() {
        _.delay(() => {
            this.$store.dispatch('auth/SYNC').then(() => {
                this.email = this.$store.state.auth.email;
            });
        }, 2500);
    },
    computed: {
        login() {
            return this.$store.state.auth.login;
        },
        password() {
            return this.$store.state.auth.pass;
        },
        loaded() {
            return this.login && this.password;
        },
    },
    methods: {
        send() {
            if (!this.email) {
                return;
            }
            this.process = true;
            this.hint = 'Отправляю...';
            this.$store.dispatch('auth/SAVE_EMAIL', this.email).then((response) => {
                this.hint = response.data.say;
                this.error = response.data.err;
                this.sended();
            });
        },
        sended() {
            this.process = false;
            if (!this.error) {
                this.emit('close');
            }
        },
    },
    template: '#auth-board'
});