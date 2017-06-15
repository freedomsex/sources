
Vue.component('messages-activity', {
    props: ['humanId','show'],
    data() {
        return {
            account: false,
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        accountOpen() {
            this.account = this.humanId;
        },
        accountClose() {
            this.account = false;
        },
    },
    template: '#messages-activity',
});
