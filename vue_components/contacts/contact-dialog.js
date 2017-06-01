
var ContactDialog = {
    props: [
      'quick',
    ],
    data() {
        return {
            response: false,
            slow: false,
            error: false,
            offset: 0,
            batch: 10
        }
    },
    computed: {
        showLoader() {
            return this.slow && !this.response;
        },
        showAlert() {
            return this.error && this.response;
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
        reset() {
            this.response = false;
            this.error  = false;
            this.slow = false;
        },
        hope() {
            let sec = 2;
            setTimeout(() => this.slow = true,  sec * 1000);
            this.reset();
        },
        loaded(result) {
            //this.received = result ? result.length : 0;
            // if (this.received) {
            //     this.contacts = _.union(this.contacts, result);
            // }
            this.offset += this.batch;
            this.response = true;
            this.slow = false;
        },
        bun(index) {
            console.log('bun');
            let item = this.contacts[index];
            this.remove(index); return;
            api.bun.send({
                id: item.cont_id,
                tid: item.from,
                //text: this.item.message,
                //token: 'super secret token'
            });
        },
        splice(index) {
            this.$store.commit('delete', index);
        },
        error(error) {
            this.response = true;
            this.error = true;
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
            //console.log(this.$store);
            return this.$store.state.contacts.initial.list;
        }
    },
    methods: {
        load() {
            this.$store.dispatch('initial/LOAD').then((response) => {
                this.loaded();
            });
            this.hope();
        },
        next() {
            this.$store.dispatch('initial/NEXT', this.offset).then((response) => {
                this.loaded();
            });
            this.reset();
        },
        remove(index) {
            this.$store.dispatch('initial/DELETE', index);
        },
        splice(index) {
            //console.log(this.$store); return;
            this.$store.commit('initial/delete', index);
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
            this.$store.dispatch('intimate/LOAD', this.next).then((response) => {
                this.loaded();
            }).catch((error) => this.error(error));
            this.hope();
        },
        next() {
            this.$store.dispatch('intimate/NEXT', this.offset).then((response) => {
                this.loaded();
            });
            this.hope();
        },
        remove(index) {
            console.log('imm=remove', index);
            this.$store.dispatch('intimate/DELETE', index);
        },
        splice(index) {
            this.$store.commit('intimate/delete', index);
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
            this.$store.dispatch('sends/LOAD', this.next).then((response) => {
                this.loaded();
            });
            this.hope();
        },
        next() {
            this.$store.dispatch('sends/NEXT', this.offset).then((response) => {
                this.loaded();
            });
            this.reset();
        },
        remove(index) {
            this.$store.dispatch('sends/DELETE', index);
        },
        splice(index) {
            this.$store.commit('sends/delete', index);
        },
    },
    template: '#initial-dialog'
});

