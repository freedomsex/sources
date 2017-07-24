
const SearchActivity = Vue.component('search-activity', {
    extends: DefaultActivity,
    data() {
        return {

        };
    },
    beforeRouteUpdate(to, from, next) {
        if (to.fullPath == '/search' && from.fullPath == '/search/settings/search') {
            this.$refs.results.reload();
        }
        next();
    },
    computed: {

    },
    methods: {
        close() {
            this.back();
        },
    },
    template: '#search-activity',
});
