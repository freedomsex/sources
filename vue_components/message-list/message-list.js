
Vue.component('message-list', {
    props: ['humanId'],
    data() {
        return {
            messages: [],
            response: null,
            error: 0,
            next: 0,
            newCount: 0,
            batch: 15,
            received: 0,
            attention: false,
            uid: null,
            tid: null,
            date: null,
            toSlow: false,
        }
    },
    mounted: function () {
        this.tid = this.humanId;
        this.load();
    },
    methods: {
        reload() {
            this.next = 0;
            this.newCount = 0;
            this.messages = [];
            this.load();
            fdate = null;
            prev  = null;
            //TODO: переписать глобальную зависимость
        },
        load() {
            //console.log('load MessList data');
            this.response = 0;
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken},
                params: {id: this.tid, next: this.next, hash}
            };
            axios.get('/ajax/messages_load.php', config).then((response) => {
                this.onLoad(response);
            }).catch((error) => {
                this.error = 10;
                console.log(error);
            });
            setTimeout(() => this.toSlow = true, 7000);
        },
        onLoad(response) {
            let messages = response.data.messages;
            this.received = messages ? messages.length : 0;
            if (!messages && !this.messages.length) {
                this.noMessages();
            } else {
                if (this.received) {
                    this.messages = _.union(this.messages, messages);
                }
                // TODO: Заменить на компоненты, страрые зависимости
                lock_user.show_link();
                this.next += this.batch;
            }
            this.response = 200;
            this.toSlow = false;
            //console.log(response);
        },
        noMessages() {
            // TODO: Заменить на компоненты, страрые зависимости
            quick_mess.ajax_load();
            notice_post.show();
            store.commit('intimated', false);
        },
        setDate(date) {
            //this.date = new Date(this.item.date).getDayMonth();
        },
        remove(index) {
            console.log('remove('+index+')');
            this.messages.splice(index, 1);
        },
        admit() {
            console.log('itOk false');
            this.attention = false;
        },
        setNew() {
            console.log('new');
            this.newCount += 1;
        }
    },
    computed: {
        more() {
            if (this.received && this.received == this.batch) {
                return true;
            }
            return false;
        },
        uid: () => this.store.user.uid
    },
    template: '#message-list'
});
