
var ContactLists = new Vue({
    computed: {
        initial() {
            return this.$store.state.modals.initial;
        },
        intimate() {
            return this.$store.state.modals.intimate;
        },
        sends() {
            return this.$store.state.modals.sends;
        }
    },
    methods: {
        close() {
            this.$store.commit('closeAll');
        },
    },
    store,
    el: '#contact-lists',
});
