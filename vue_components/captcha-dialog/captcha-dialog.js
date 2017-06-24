
Vue.component('captcha-dialog', {
    data() {
        return {
            code: '',
            inc: 0
        }
    },
    computed: {
        src() {
            return '/secret_pic.php?inc=' + this.inc;
        }
    },
    methods: {
        close() {
            this.$emit('cancel');
        },
        send() {
            this.$emit('send', this.code);
            this.update();
            this.close();
        },
        update() {
            this.inc++;
        },
    },
    template: '#captcha-dialog',
});
