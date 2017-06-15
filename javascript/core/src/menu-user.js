
var MenuUser = new Vue({
    data: {
        message: 8,
        contact: 8
    },
    store,
    computed: {
        authorized() {
            return (store.state.user.uid > 0) ? 1 : 0;
        },
        newMessage() {
            return (this.message == false) || this.message < 8;
        },
        newContact() {
            return (this.contact == false) || this.contact < 8;
        },
    },
    methods: {
        initial() {
            console.log('initial')
            store.commit('showInitial', 1);
            axios.get('/mailer/check_contact').then(() => {
                this.contact = 8;
            });
        },
        intimate() {
            store.commit('showIntimate', 1);
            axios.get('/mailer/check_message').then(() => {
                this.message = 8;
            });
        },
        loadStatus() {
            axios.get('/mailer/status').then((response) => {
                this.message = response.data.message;
                this.contact = response.data.contact;
            });
        },
    },
    mounted() {
        let delay = 15;
        this.loadStatus();
        setInterval(() => {
            this.loadStatus();
        }, delay * 1000);
    },
    el: '#menu-user',
});