
var ContactDialog = {
    props: [
      'quick',
    ],
    data() {
        return {
            contacts: [],
            response: null,
            slow: false,
            next: 0,
            batch: 10,
            received: 0
        }
    },
    computed: {
        showLoader() {
            return this.slow && !this.response;
        },
        showHint() {
            return this.response && this.contacts < 1;
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        onLoad(result) {
            this.received = result ? result.length : 0;
            if (this.received) {
                this.contacts = _.union(this.contacts, result);
            }
            this.next += this.batch;
            this.response = 200;
            this.slow = false;
        },
        remove(index) {

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
            apiBun.send(data, null, null);
            this.remove(index);
        },
        splice(index) {
            this.contacts.splice(index, 1);
            this.close();
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
    },
    methods: {
        load() {
            apiContact.initialList(this.onLoad, this.error);
            setTimeout(() => this.slow = true, 3000);
        },
        remove(index) {
            console.log('remove');
            apiContact.ignore({ tid: this.contacts[index].cont_id });
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
    },
    methods: {
        load() {
            apiContact.intimateList(this.onLoad, this.error);
            setTimeout(() => this.slow = true, 3000);
        },
        remove(index) {
            console.log('remove');
            apiContact.remove({ tid: this.contacts[index].cont_id });
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
    },
    methods: {
        load() {
            apiContact.sendsList(this.onLoad, this.error);
            setTimeout(() => this.slow = true, 3000);
        },
    },
    template: '#initial-dialog'
});

