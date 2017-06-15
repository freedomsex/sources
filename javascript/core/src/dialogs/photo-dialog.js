
Vue.component('photo-dialog', {
    methods: {
        close() {
            this.$emit('close');
            store.commit('viewPhoto', { photo: null });
        }
    },
    computed: Vuex.mapState({
        config: state => state.photoView
    }),
    template: '#photo-dialog'
})
