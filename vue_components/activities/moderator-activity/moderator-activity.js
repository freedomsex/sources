
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
            this.$store.commit('accepts/moderator');
        },
        load() {
            this.process = true;
            api.moderator.load().then((response) => {
                this.error = response.data.error;
                if (this.error == 'promt') {
                    this.needPromt();
                } else
                if (this.error == 'count') {

                } else
                if (!this.error) {
                    this.loaded(response.data);
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
