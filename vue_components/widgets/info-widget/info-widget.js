Vue.component('info-widget', {
    data() {
        return {
            enable: true,
            version: '2017-12-01',
            users: {
                idUp: null,
                idTo: 67300000,
                sex: null,
                city: [],
            },
            accept: true,
        }
    },
    mounted() {
        this.accept = ls.get('release-info') <= this.version;
    },
    computed: {
        userId() {
            return this.$store.state.user.uid;
        },
        sex() {
            return this.$store.state.user.sex;
        },
        city() {
            return this.$store.state.user.city;
        },
        show() {
            console.log('show', [this.enable, !this.accept, this.forId(this.userId)])

            return (this.enable && !this.accept && this.forId(this.userId));
        },
    },
    methods: {
        forId(id) {
            let result = true;
            if (this.users.idUp || this.users.idTo) {
                result = false;
            }
            if (id) {
                result = this.users.idUp ? id > this.users.idUp : result;
                result = this.users.idTo ? id < this.users.idTo : result;
            }
            return result;
        },
        confirm() {
            ls.set('release-info', this.version);
            this.accept = true;
        },
        more() {
            this.$router.push(`/releases/${this.version}`);
        }
    },
    template: '#info-widget',
});