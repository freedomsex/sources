
Vue.component('contact-item', {
    props: [
      'item',
      'index',
      'idle',
      'quick',
    ],
    data() {
        return {
            account: false,
            detail:  false,
            confirm: false,
        }
    },
    computed: {
        name() {
            var result = 'Парень или девушка';
            if (this.item.user) {
                result = this.item.user.sex == 2 ? 'Девушка' : 'Парень';
                if (this.item.user.name) {
                    result = this.item.user.name;
                }
            }
            return result;
        },
        age() {
            return this.item.user && this.item.user.age ? this.item.user.age : '';
        },
        city() {
            return this.item.user && this.item.user.city ? this.item.user.city : '';
        },
        title() {
            return this.name + ' ' + this.age + ' ' + this.city;
        },
        message() {
            return this.item.message ? this.item.message.text : '';
        },
        unread() {
            return this.item.message ? this.item.message.unread : 0;
        },
        sent() {
            return this.item.message ? (this.item.message.sender == this.$store.state.user.uid) : 0;
        },
        humanId() {
            return this.item.human_id;
        },
        acceptSettings() {
            return this.$store.state.accepts.settings;
        },
    },
    methods: {
        show() {
            //this.$emit('show');
            if (this.idle && !this.acceptSettings) {
                this.$emit('accept');
            } else
            if (this.quick) {
                this.reply();
            } else {
                //this.anketa();
                this.dialog();
            }
        },
        reply() {
            this.$emit('read', this.index);
            this.$router.push({ name: 'quickReply', params: {
                humanId: this.humanId,
                message: this.message,
                index: this.index
            } });
        },
        dialog() {
            this.$emit('read', this.index);
            //this.$emit('dialog', {id: this.humanId, title: this.title});
            this.$router.push({ name: 'dialog', params: {humanId: this.humanId, title: this.title} });
        },
        confirmBun() {
            this.confirm = 'doit';
            console.log('confirmBun');
        },
        confirmRemove() {
            //this.$emit('remove');
            //console.log('initial-item REMOVE');
            this.confirm = !this.quick ? 'some' : 'must';
        },
        close() {
            this.detail = false;
            console.log('close');
        },
        bun() {
            console.log('bun1', this.index);
            this.$emit('bun', this.index);
        },
        remove() {
            console.log('remove=remove', this.index);
            this.$emit('remove', this.index);
        },
        cancel() {
            this.confirm = false;
            console.log('cancel');
        },
        sended() {
            this.$emit('sended', this.index);
            this.close();
        }
    },
    template: '#contact-item'
});

