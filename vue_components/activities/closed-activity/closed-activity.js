
var DefaultActivity = Vue.component('closed-activity', {
    props: ['show'],
    methods: {
        close() {
            this.$emit('close');
        },
    },
    template: '#closed-activity',
});
