
Vue.component('photo-view', {
    props: [
        'photo',
        'thumb',
        'maxWidth',
        'bypass'
    ],
    methods: {
        approve() {
            this.$store.commit('accepts/photo');
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
