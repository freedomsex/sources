
Vue.component('simple-captcha', {
    props: [],
    data() {
        return {
            code: '',
            inc: 0
        }
    },
    computed: {
        src() {
            return '/capcha_pic.php?inc=' + this.inc;
        }
    },
    mounted() {

    },
    methods: {
        close() {
            this.$emit('close');
        },
        update() {
            this.inc++;
        },
        input() {
            this.$emit('input', this.code);
        },
    },
    template: '#simple-captcha',
});
