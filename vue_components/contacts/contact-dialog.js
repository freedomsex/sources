
var ContactDialog = {
    props: [
      'quick',
    ],
    data() {
        return {
            response: false,
            slow: false,
            next: 0,
            batch: 10
        }
    },
    computed: {
        showLoader() {
            return this.slow && !this.response;
        },
        showHint() {
            return this.count < 1;
        },
        count() {
            let result = this.contacts ? this.contacts.length : 0;
            return result;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        hope() {
            let sec = 2;
            setTimeout(() => this.slow = true,  sec * 1000);
            this.response = false;
        },
        loaded(result) {
            //this.received = result ? result.length : 0;
            // if (this.received) {
            //     this.contacts = _.union(this.contacts, result);
            // }
            //this.next += this.batch;
            this.response = true;
            this.slow = false;
        },
        remove(index) {
            this.splice(index);
            this.close();
        },
        bun(index) {
            console.log('bun');
            let item = this.contacts[index];
            let data = {
                id: item.cont_id,
                tid: item.from,
                //text: this.item.message,
                //token: 'super secret token'
            };
            api.bun.send(data);
            this.splice(index);
            this.close();
        },
        splice(index) {
            this.contacts.splice(index, 1);
            console.log('remove');
        },
        error(error) {
            console.log(error);
        }
    },
    mounted() {
        this.load();
    }
};


const InitialDialog = Vue.component('initial-dialog', {
    extends: ContactDialog,
    computed: {
        initial: () => true,
        simple:  () => true,
        contacts() {
            return this.$store.state.contacts.initial.list;
        }
    },
    methods: {
        load() {
            store.dispatch('initial/LOAD').then((response) => {
                this.loaded();
            });
            this.hope();
        },
        remove(index) {
            console.log('remove');
            //apiContact.ignore({ tid: this.contacts[index].cont_id });
            this.splice();
        },
    },
    template: '#initial-dialog'
});

const IntimateDialog = Vue.component('intimate-dialog', {
    extends: ContactDialog,
    computed: {
        initial: () => true,
        simple:  () => false,
        contacts() {
            return this.$store.state.contacts.intimate.list;
        }
    },
    methods: {
        load() {
            store.dispatch('intimate/LOAD').then((response) => {
                this.loaded();
            });
            this.hope();
        },
        remove(index) {
            console.log('remove');
            //apiContact.remove({ tid: this.contacts[index].cont_id });
            //this.$emit('remove', this.index);
            this.splice();
        },
    },
    template: '#intimate-dialog'
});

const SendsDialog = Vue.component('sends-dialog', {
    extends: ContactDialog,
    computed: {
        initial: () => false,
        simple:  () => false,
        contacts() {
            return this.$store.state.contacts.sends.list;
        }
    },
    methods: {
        load() {
            store.dispatch('sends/LOAD').then((response) => {
                this.loaded();
            });
            this.hope();
        },
    },
    template: '#initial-dialog'
});

