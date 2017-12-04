Vue.component('snackbar', {
    props: ['callback', 'action', 'play'],
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
        },
        autoplay(event) {
            if (this.play) {
                this.$refs.autoplay.play();
            }
        }
    },
    mounted() {
        _.delay(this.close, this.time);
        this.autoplay();
    },
    template: '#snackbar',
});
