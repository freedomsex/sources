Vue.component('snackbar', {
    props: ['callback', 'action'],
    computed: {
        time() {
            return this.callback ? 5000 : 3000;
        },
        title() {
            return this.action ? this.action : 'Ok';
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        approve() {
            this.callback();
        }
    },
    mounted() {
        _.delay(this.close, this.time);
    },
    template: '#snackbar',
});
