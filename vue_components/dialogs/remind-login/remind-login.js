Vue.component('remind-login', {
    data() {
        return {
            email: '',
            hint: 'Введите ваш емайл',
            confirm: false
        }
    },
    computed: {

    },
    methods: {
        close() {
            this.$emit('close');
        },
        send() {
            if (!this.email) {
                return;
            }
            this.hint = 'Отправляю...';
            api.user.post({email: this.email}, null, 'sync/remind').then((response) => {
                this.hint = response.data.say;
                this.error = response.data.err;
                this.sended();
            });
        },
        sended() {
            if (!this.error) {
                this.hint = 'Успешно. Подождите.';
                this.confirm = true;
            }
        },
    },
    template: '#remind-login'
});