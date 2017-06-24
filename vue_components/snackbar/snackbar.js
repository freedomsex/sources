Vue.component('snackbar', {
    methods: {
        close() {
            this.$emit('close');
        },
    },
    mounted() {
        _.delay(this.close, 3000);
    },
    template: '#snackbar',
});
