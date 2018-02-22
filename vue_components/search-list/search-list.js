
Vue.component('search-list', {
    data() {
        return {
            loading: false,
            users: [],
            response: true,
            error: 0,
            newCount: 0,
            attention: false,
            toSlow: false,
            humanId: null,
            account: null,
            sended: false,
            ignore: false,
        };
    },
    mounted() {
        this.load();
        this.visitedSync();
        this.$store.dispatch('desires/PICK');
    },
    computed: {
        items() {
            return this.$store.state.search.list;
        },
        more() {
            return this.$store.getters['search/more'];
        },
        compact() {
            let {city, any} = this.$store.state.user;
            return city && !any;
        },
        visited() {
            return this.$store.state.visited.list;
        },
        accept() {
            let {next, batch} = this.$store.state.search;
            let accept = this.$store.state.accepts.search;
            return !this.ignore && !accept && (next > batch);
        },
        virgin() {
            return this.$store.getters['search/virgin'];
        },
        desires() {
            return _.pluck(this.$store.state.desires.list, 'tag');
        },
        loader() {
            return this.$store.state.ready && (!this.response || !this.items.length);
        },
        city() {
            return this.$store.state.user.city || defaultSettings.city;
        },
        age() {
            return this.$store.state.user.age || defaultSettings.age;
        },
        up() {
            return this.$store.state.user.up || defaultSettings.up || 0;
        },
        to() {
            return this.$store.state.user.to || defaultSettings.to || 0;
        },
        who() {
            return defaultSettings.who || null;
        },
    },
    methods: {
        reload() {
            this.$store.commit('ready', false);
            this.$store.commit('search/reset', false);
            this.load();
        },
        visitedSync() {
            this.$store.dispatch('visited/SYNC');
        },
        load() {
            this.response = 0;
            let params = {
                who: this.who,
                city: this.city,
                up: this.up,
                to: this.to,
            };
            this.$store.dispatch('search/LOAD', params).then((response) => {
                this.onLoad();
            }).catch((error) => {
                this.response = 200;
                this.toSlow = false;
            });
        },
        loadNext() {
            //this.skipScroll = true;
            this.load();
        },
        onLoad() {
            this.$store.commit('ready', true);
            this.response = 200;
            this.toSlow = false;
        },
        openMessage(id) {
            this.humanId = id;
        },
        noResult() {

        },
        old(id) {
            return _.contains(this.visited, id);
        },
        gold(tags) {
            let result = _.intersection(this.desires, tags);
            return result.length ? true : false;
        },
        approve() {
            this.$store.commit('accepts/search');
        }
    },
    template: '#search-list',
});
