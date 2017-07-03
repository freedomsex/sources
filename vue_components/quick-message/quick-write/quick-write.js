Vue.component('quick-write', {
    props: ['humanId'],
    data() {
        return {
            account: false,
            open: false,
            sended: false
        }
    },
    template: '#quick-write',
});
