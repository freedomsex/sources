
Vue.component('search-settings', {
    props: [],
    data() {
        return {
             ageRange: [0,16,17,18,20,23,25,27,30,35,40,45,50,60,80],
             selectWho: 0,
             selectUp: 0,
             selectTo: 0,
             checkedTown: 0,
             checkedVirt: 0,
        }
    },
    computed: Vuex.mapState({
        who(state) {
            var who = Number(state.search.settings.who);
            if (who) {
                return (who == 1) ? 1 : 2;
            }
            return 0;
        },
        up(state) {
            return this.age(state.search.settings.up);
        },
        to(state) {
            return this.age(state.search.settings.to);
        },
        town(state) {
            return state.search.settings.town == true;
        },
        virt(state) {
            return state.search.settings.virt == true;
        }
    }),
    mounted() {
        this.selectWho = this.who;
        this.selectUp = this.up;
        this.selectTo = this.to;
        this.checkedTown = this.town;
        this.checkedVirt = this.virt;
    },
    methods: {
        age(value) {
            value = Number(value);
            if (!value) { return 0; }
            var min = _.min(this.ageRange);
            var max = _.max(this.ageRange);
            if (value <= min) { return min; }
            if (value >= max) { return max; }
            return _.find(this.ageRange, (item, index, list) => {
                if (index && index < list.length) {
                    if (value > list[index-1] && value < list[index+1]) {
                        return true;
                    }
                }
            });
        },
        setWho(value) {
            this.$store.commit('settings', {who: value});
        },
        setUp() {
            this.$store.commit('settings', {up: this.selectUp});
        },
        setTo() {
            this.$store.commit('settings', {to: this.selectTo});
        },
        setTown() {
            this.$store.commit('settings', {town: this.town != true});
        },
        save() {
            console.log(this.$store.state.search.settings);
            this.$store.commit('settings', {
                who:  this.selectWho,
                city: '',
                up:   this.selectUp,
                to:   this.selectTo,
                town: this.checkedTown,
                virt: this.checkedVirt,
            });
            console.log(this.$store.state.search.settings);
        },
        close() {
            this.$emit('close');
        },
    },
    template: '#search-settings',
});
