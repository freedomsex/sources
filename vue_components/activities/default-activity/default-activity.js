
var DefaultActivity = Vue.component('default-activity', {
    props: ['show'],
    methods: {
        close() {
            this.$emit('close');
        },
    },
    template: '#default-activity',
});
