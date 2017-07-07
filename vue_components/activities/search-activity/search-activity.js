
Vue.component('search-activity', {
    props: [],
    data() {
        return {
            loading: false,
            users: [],
        };
    },
    mounted() {
        this.load();
    },
    computed: {

    },
    methods: {
        close() {
            this.$emit('close');
        },
        load() {
            let {who, city, up, to} = this.$store.state.search.settings;
            let sex = this.$store.state.user.sex;
            up = up ? up : null;
            to = to ? to : null;
            api.search.load({sex, who, city, up, to}).then((response) => {
                this.users = response.data.users;
            });
        },
        reload() {
            this.load();
        }
    },
    template: '#search-activity',
});
