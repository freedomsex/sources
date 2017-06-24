Vue.component('quick-write', {
    props: ['humanId'],
    data() {
        return {
            open: false,
            sended: false
        }
    },
    template: '#quick-write',
});
