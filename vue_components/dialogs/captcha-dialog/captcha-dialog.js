Vue.component('captcha-dialog', {
    data() {
        return {
            code: '',
            inc: 0
        }
    },
    computed: {
        src() {
          simple_hash();
          return '/secret_pic.php?inc=' + this.inc + '&hash=' + hash;
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
