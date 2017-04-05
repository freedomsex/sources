
Vue.component('quick-reply', {
    props: ['show', 'data'],
    data() {
        return {
            message: 'eeeee',
            captcha: false,
            process: false,
            confirm: false,
            code: null
        }
    },
    computed: {
        desire() {
            let d = this.data.desire;
            return (d && d.length > 1) ? true : false;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        bun() {
            this.$emit('bun');
        },
        remove() {
            this.$emit('remove');
        },
        cancel() {
            this.captcha = false;
            this.confirm = false;
            console.log('cancel');
        },
        send() {
            let data = {
                id: tid,
                mess: this.message,
                captcha_code: this.code
            };
            //apiMessages.send(data, this.handler, null);
            this.process = true;
            console.log('send');
        },
        setCode(code) {
            this.code = code;
            this.send();
        },
        handler(response) {
            if (!response.saved && response.error) {
                if (response.error == 'need_captcha') {
                    this.captcha();
                }
                this.error();
            } else {
                this.sended(response);
            }
            this.process = false;
        },
        sended(response) {

        },
        captcha() {
            this.captcha = true;
        },
        error() {
            this.process = false;
        }
    },
    template: '#quick-reply',
});

