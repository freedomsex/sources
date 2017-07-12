
Vue.component('search-activity', {
    props: [],
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
        };
    },
    mounted() {
        this.load();
        this.visitedSync();
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
            return this.$store.state.accepts.search;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        reload() {
            this.next = 0;
            this.users = [];
            this.received = 0;
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
            up = up ? up : null;
            to = to ? to : null;
            if (any) {
                city = null;
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
        approve() {
            this.$store.commit('accepts/search');
        }
    },
    template: '#search-activity',
});
