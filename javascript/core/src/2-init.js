
var app = new Vue({
    data: {
        alert: '',
        snackbar: {
            text: '',
            callback: null,
            action: ''
        },
    },
    mounted() {
        this.$store.dispatch('notes/LOAD');
        if (this.humanId) {
            this.$store.dispatch('search/HUMAN', this.humanId);
            this.title();
        }
    },
    computed: {
        humanId() {
            let humanId = parseInt(window.location.pathname.split( '/' )[1]);
            return humanId ? humanId : null;
        },
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
        title() {
            let title = '| Секс знакомства'
            if (this.human) {
                let name = '';
                if (this.human.name) {
                    name = this.human.name + ' | ';
                }
                if (this.human.sex) {
                    name += this.human.sex == 2 ? 'Девушка' : 'Парень';
                } else {
                    name += 'Парень или девушка';
                }
                name += ' ';

                let age = '';
                if (this.human.age) {
                    age = ' ' + moment.duration(this.human.age, "years").humanize();
                }
                let city = ' ищет ';
                if (this.human.city) {
                    city = ' из города ' + this.human.city + ' ищет ';
                }
                let who = ' девушку или парня ';
                if (this.human.sex) {
                    who = this.human.sex == 2 ? 'парня' : 'девушку';
                }
                who += ' для секса или общения ';
                let years = '';
                if (this.human.up && this.human.to) {
                    years = ' в возрасте от ' + this.human.up + ' до ' + moment.duration(this.human.to, "years").humanize();
                }
                if (this.human.up && !this.human.to) {
                    years = ' в возрасте от ' + moment.duration(this.human.up, "years").humanize();
                }
                if (!this.human.up && this.human.to) {
                    years = ' в возрасте до ' + moment.duration(this.human.to, "years").humanize();
                }
                document.title = name + age + city + who + years;
            }
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

