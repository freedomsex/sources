
Vue.component('photo-view', {
    props: [
        'show',
        'photo',
        'thumb',
        'width',
        'height',
        'bypass'
    ],
    methods: {
        approve() {
            this.$store.commit('approveViewPhoto');
        },
        close() {
            this.$emit('close');
        }
    },
    computed: {
        accept() {
            return (this.$store.state.accepts.photo || this.bypass) ? true : false;
        }
    },
    template: '#photo-view'
});
