
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

    },
    computed: {
        humanId() {
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
            var result = humanData ? json.parse(humanData) : null;
            return (result && _.isObject(result) && _.has(result, 'id')) ? result : [];
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
        }
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








$(document).ready(function()
{
    //userinfo.init();
    slider.init();
    //giper_chat.init();
    notepad.init();

    mailsett.init();
    report.init();
    navigate.init();

    name_suggest.init();
    city_suggest.init();

    option_static.init();
    option_sex.init();
    //option_email.init();
    profile_alert.init();
    profile_option.init();

    //user_tag.init();
    //desire_clip.init();

    //result_list.init();
    //visited.init();

});

