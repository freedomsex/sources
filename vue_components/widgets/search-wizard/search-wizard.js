
Vue.component('search-wizard', {
    data() {
        return {

        };
    },
    store,
    computed: Vuex.mapState({
        range(state) {
            let {up, to} = state.user;
            var range = '';
            if (up && to) {
                range = up + ' - ' + to;
            } else
            if (up && !to) {
                range = ' от ' + up;
            } else
            if (!up && to) {
                range = ' до ' + to;
            }
            return range ? ' в возрасте ' + range + ' лет ' : '';
        },
        who(state) {
            var sex = state.user.sex;
            var who = ' знакомства с кем угодно ';
            if (sex) {
                who = (sex == 2) ? ' знакомства с парнем ' : ' знакомства с девушкой ';
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