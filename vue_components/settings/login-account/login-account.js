
const LoginAccount = Vue.component('login-account', {
    props: [],
    data() {
        return {
            login: '',
            password: '',
            captcha: false,
            code: '',
            error: false,
            remind: false,
            hint: 'Введите данные',
        }
    },
    computed: Vuex.mapState({
        city(state) {
            return state.user.city;
        },
    }),
    mounted() {
    },
    methods: {
        close() {
            this.$emit('close');
        },
        send() {
            let data = {
                login: this.login,
                pass: this.password,
                captcha: this.code
            };
            api.user.post(data, null, 'sync/login').then((response) => {
                this.hint = response.data.say;
                this.error = response.data.err;
                this.captcha = response.data.captcha;
                this.onLogin();
            });
        },
        onLogin() {
            this.$refs.captcha.update();
            if (!this.error) {
                this.hint = 'Успешно. Подождите.';
                location.href = location.href;
            }
        },
        setCode(code) {
            this.code = code;
        }
    },
    template: '#login-account',
});
