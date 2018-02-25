Vue.component('recaptcha', {
    data() {
        return {
            sitekey: '6LdxP0YUAAAAAMzR_XFTV_G5VVOhyPnXLjdudFoe',
            widgetId: null,
        }
    },
    methods: {
        execute () {
          window.grecaptcha.execute(this.widgetId)
        },
        reset () {
          window.grecaptcha.reset(this.widgetId)
        },
        verify(token) {
            this.$store.commit('grecaptchaTokenUpdate', token);
            this.$emit('verify');
            this.reset();
        },
        render(callback) {
            if (this.widgetId === null && window.grecaptcha) {
                this.widgetId = window.grecaptcha.render('g-recaptcha', {
                    'sitekey': this.sitekey,
                    'size': 'invisible',
                    //'expired-callback': this.$emit('cancel'),
                    //'error-callback': this.$emit('cancel'),
                    callback
                });
                console.log('recaptcha ready', this.widgetId );
            }
        },
    },
    template: '#recaptcha'
});
