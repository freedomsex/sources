
const AccountActivity = Vue.component('account-activity', {
    props: ['humanId'],
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        human() {
            return this.$store.state.search.human;
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        loaded() {
            this.loading = false;
                console.log(this.human);
        },
        hope() {
            setTimeout(() => this.loading = false, 4 * 1000);
        },
        load() {
            this.loading = true;
            this.hope();
            store.dispatch('search/HUMAN', this.humanId).then((response) => {
                this.loaded();
            }).catch((error) => {
                console.log(error);
                this.loading = false;
            });
        }
    },
    template: '#account-activity',
});
