
Vue.component('other-settings', {
    props: [],
    data() {
        return {

        }
    },
    computed: Vuex.mapState({

    }),
    methods: {
        close() {
            this.$emit('close');
        },
    },
    template: '#other-settings',
});
