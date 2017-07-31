
Vue.component('search-list', {
    data() {
        return {
            loading: false,
            users: [],
            response: null,
            error: 0,
            next: null,
            newCount: 0,
            batch: 15,
            received: 0,
            attention: false,
            toSlow: false,
            humanId: null,
            account: null,
            sended: false,
            compact: true,
            ignore: false,
        };
    },
    mounted() {
        if (this.virgin && this.defaults) {
            this.compact = false;
            this.onLoad(this.defaults);
        } else {
            this.load();
        }
        this.visitedSync();
        this.$store.dispatch('desires/PICK');
    },
    computed: {
        more() {
            if (this.received && this.received == this.batch) {
                return true;
            }
            return false;
        },
        visited() {
            return this.$store.state.visited.list;
        },
        accept() {
            return !this.ignore && !this.$store.state.accepts.search && (this.next > this.batch);
        },
        defaults() {
            var result = defaultResults ? json.parse(defaultResults) : null;
            console.log(result)
            return (result && _.isObject(result) && _.has(result, 'users') && result.users.length) ? result : [];
        },
        items() {
            return this.users;
        },
        virgin() {
            return this.$store.getters.virgin;
        },
        desires() {
            return _.pluck(this.$store.state.desires.list, 'tag');
        },
        count() {
            return this.users.length;
        },
        loader() {
            return this.$store.state.ready && !this.count;
        },
        city() {
            return this.$store.state.user.city;
        },
        age() {
            return this.$store.state.user.age;
        },
    },
    methods: {
        reload() {
            this.next = 0;
            this.users = [];
            this.received = 0;
            this.compact = true;
            this.$store.commit('ready', false);
            this.load();
        },
        visitedSync() {
            this.$store.dispatch('visited/SYNC');
        },
        load() {
            this.response = 0;
            let {who, city, up, to, any} = this.$store.state.search.settings;
            let sex = this.$store.state.user.sex;
            let next = this.next;
            up = up ? up : 0;
            to = to ? to : 0;
            if (!city || any) {
                city = null;
                this.compact = false;
            }
            //this.onLoad(ls.get('last-search'));
            api.search.load({sex, who, city, up, to, next}).then((response) => {
                this.onLoad(response.data);
                //ls.set('last-search', response.data, 31*24*60*60);
            }).catch((error) => {
                this.response = 200;
                this.toSlow = false;
            });
        },
        loadNext() {
            //this.skipScroll = true;
            this.load();
        },
        onLoad(data) {
            let users = data.users;
            this.received = users ? users.length : 0;
            if (!users && !this.users.length) {
                this.noResult();
            } else {
                if (this.received) {
                    this.users = _.union(this.users, users);
                }
                this.next += this.batch;
            }
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
