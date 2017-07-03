
new Vue({
    data: {
        searchSettings: false,
        accountSettings: false,
        sexConfirm: false,
        logIn: false,
        warning: '',
        alert: '',
        account: false,
        securitySettings: false,
        desiresSettings: false,
        socialSettings: false,
        aboutSettings: false,
        otherSettings: false,
    },
    computed: {
        initial() {
            return this.$store.state.modals.initial;
        },
        intimate() {
            return this.$store.state.modals.intimate;
        },
        sends() {
            return this.$store.state.modals.sends;
        },
        view() {
            return this.$store.state.optionStatic.view;
        },
        isSex() {
            return this.$store.state.user.sex;
        },
        humanId() {
            return Number(this.$route.path.substr(1));
        }
    },
    methods: {
        search() {
            window.location = this.$store.getters.searchURL;
        },
        close() {
            this.$store.commit('closeAll');
            store.commit('optionDialog', false);
        },

        confirmSex(variant) {
            if (!this.isSex) {
                this.sexConfirm = variant;
                return false;
            }
            return true;
        },
        selectSex(variant) {
            if (variant == 'search') {
                this.openSearchSettings();
            }
            if (variant == 'account') {
                this.openAccountSettings();
            }
        },
        openSearchSettings() {
            if (this.confirmSex('search')) {
                this.searchSettings = true;
            }
        },
        openAccountSettings() {
            if (this.confirmSex('account')) {
                this.accountSettings = true;
            }
        },
        openLogIn() {
            this.logIn = true;
        },
        showSnackbar(text) {
            this.warning = text;
        },
        showToast(text) {
            this.alert = text;
        },
        showAccount(humanId) {
            this.account = humanId;
        },
    },
    el: '#app',
    store,
    router
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

    result_list.init();
    //visited.init();

});

