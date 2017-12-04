
Vue.component('search-wizard', {
    data() {
        return {

        };
    },
    store,
    computed: Vuex.mapState({
        range(state) {
            var settings = state.search.settings;
            var range = '';
            if (settings.up && settings.to) {
                range = settings.up + ' - ' + settings.to;
            } else
            if (settings.up && !settings.to) {
                range = ' от ' + settings.up;
            } else
            if (!settings.up && settings.to) {
                range = ' до ' + settings.to;
            }
            return range ? ' в возрасте ' + range + ' лет ' : '';
        },
        who(state) {
            var settings = state.search.settings;
            var who = ' знакомства с кем угодно ';
            if (settings.who) {
                who = settings.who == 1 ? ' знакомства с парнем ' : ' знакомства с девушкой ';
            }
            return who;
        },
        say(state) {
            var where = state.user.city ? '' : ', из любого города ';
            return this.who + this.range + where;
        },
        desires() {
            let count = this.$store.state.desires.list.length;
            return count ? count : 0;
        }
    }),
    mounted() {

    },
});