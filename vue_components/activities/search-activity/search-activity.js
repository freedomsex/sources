
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
    },
    computed: {
        more() {
            if (this.received && this.received == this.batch) {
                return true;
            }
            return false;
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        reload() {
            this.next = 0;
            this.users = [];
            this.load();
        },
        load() {
            this.response = 0;
            let {who, city, up, to} = this.$store.state.search.settings;
            let sex = this.$store.state.user.sex;
            let next = this.next;
            up = up ? up : null;
            to = to ? to : null;
            api.search.load({sex, who, city, up, to, next}).then((response) => {
                this.onLoad(response.data);
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

        }
    },
    template: '#search-activity',
});
