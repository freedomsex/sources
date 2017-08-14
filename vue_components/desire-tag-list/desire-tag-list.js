Vue.component('desire-list', {
    props: ['tags'],
    computed: {
        desires() {
            return this.$store.getters['desires/tags'];
        },
    },
    methods: {
        add(tag) {
            if (!this.added(tag)) {
                this.$store.dispatch('desires/ADD', tag).then((response) => {});
            }
        },
        added(tag) {
            return _.contains(this.desires, tag);
        },
    },
    template: '#desire-list'
});