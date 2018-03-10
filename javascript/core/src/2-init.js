
var app = new Vue({
    data: {
        alert: '',
        humanId: null,
        snackbar: {
            text: '',
            callback: null,
            action: ''
        },
    },
    mounted() {
        this.$store.dispatch('notes/LOAD');
        let humanId = parseInt(window.location.pathname.split( '/' )[1]);
        this.humanId = humanId ? humanId : null;
        if (this.humanId) {
            this.$store.dispatch('search/HUMAN', this.humanId);
        }
    },
    computed: {
        simple() {
            return this.$store.state.simple;
        },
        ready() {
            return this.$store.state.ready;
        },
        promt() {
            let {promt} = this.$store.state.user;
            return !promt || promt == 'no';
        },
        tags() {
            return this.$store.getters['search/tags'];
        },
        human() {
            return this.$store.state.search.human;
        },
    },
    methods: {
        showSnackbar(text, callback, action, play) {
            console.log('snackbar', text);
            this.snackbar.text = text;
            this.snackbar.callback = callback;
            this.snackbar.action = action;
            this.snackbar.play = (play == true);
        },
        toast(text) {
            this.alert = text;
        },
        reload() {
            let home = this.$refs.results;
            home ? home.reload() : this.redirectHome();
            // Hard reload mail page to home
        },
        redirectHome() {
            console.log('Hard reload mail page to home');
            window.location = '/';
        },
    },
    el: '#app',
    store,
    router
});


new Vue({
    data: {
        warning: '',
        alert: '',
    },
    methods: {
        snackbar(text) {
            this.warning = text;
        },
        toast(text) {

            this.alert = text;
        },
    },
    el: '#settings',
    store,
    router: settingsRouter
});


$(document).ready(function() {
    navigate.init();
});

