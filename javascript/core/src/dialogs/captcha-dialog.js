
Vue.component('captcha-dialog', {
    props: ['show', 'data'],
    data() {
        return {
            code: ''
        }
    },
    methods: {
        close() {
            this.$emit('cancel');
        },
        send() {
            this.$emit('code', this.code);
        },
    },
    template: '#captcha-dialog',
});
