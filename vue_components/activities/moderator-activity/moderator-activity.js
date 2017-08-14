
const ModeratorActivity = Vue.component('moderator-activity', {
    data() {
        return {
            process: false,
            promt: true,
            error: null,
            count: null,
            message: {
                id: null,
                text: ''
            },
            secure: null,
            expire: null
        };
    },
    mounted() {
        this.load();
    },
    computed: {
        human() {
            return this.$store.state.search.human;
        },
        accept() {
            return this.$store.state.accepts.moderator;
        }
    },
    methods: {
        approve() {
            this.process = true;
            api.moderator.promt().then(() => {
                this.load();
            }).catch(() => {
                this.needPromt();
                this.process = false;
            });
            this.$store.commit('accepts/moderator', 1);
        },
        load() {
            this.process = true;
            api.moderator.load().then(({data}) => {
                this.error = data.error;
                if (this.error == 'promt') {
                    this.needPromt();
                } else
                if (this.error == 'count') {

                } else
                if (this.error == 'other') {

                } else
                if (!this.error && data.message) {
                    this.loaded(data);
                }
                this.process = false;
            });
        },
        loaded(data) {
            let {count, message, expire, secure} = data;
            this.count = count;
            this.message = message;
            this.expire = expire;
            this.secure = secure;
        },
        needPromt() {
            this.$store.commit('accepts/moderator', 0);
            this.promt = false;
        },
        action(mark) {
            let data = {
                id: this.message.id,
                secure: this.secure,
                expire: this.expire,
                mark,
            };
            this.process = true;
            api.moderator.press(data).then(() => {
                this.load();
            });
        },
        close() {
            this.$emit('close');
        },
    },
    template: '#moderator-activity',
});
