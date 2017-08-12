Vue.component('quick-write', {
    // extends: QuickMessage,
    props: ['humanId'],
    data() {
        return {
            account: false,
            open: false,
            sended: false
        }
    },
    methods: {
        write() {
            this.$router.push('write/' + this.humanId);
        },
    },
    template: '#quick-write',
});
