Vue.component('toast', {
    methods: {
        close() {
            this.$emit('close');
        },
    },
    mounted() {
        _.delay(this.close, 2000);
    },
    template: '#toast',
});
