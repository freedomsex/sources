
Vue.component('other-settings', {
    props: [],
    data() {
        return {

        }
    },
    computed: Vuex.mapState({
        uid() {
            return this.$store.state.user.uid;
        }
    }),
    methods: {
        close() {
            this.$emit('close');
        },
        logout() {
            window.location = '/logout.php';
        }
    },
    template: '#other-settings',
});
