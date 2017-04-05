
Vue.component('photo-view', {
    props: [
        'photo',
        'thumb',
        'width',
        'height',
        'bypass'
    ],
    methods: {
        approve() {
            store.commit('approveViewPhoto');
        }
    },
    computed: Vuex.mapState({
        accept(state) {
            return (state.accepts.photo || this.bypass) ? true : false;
        }
    }),
    template: '#photo-view'
});
