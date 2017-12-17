
const SearchSettings = Vue.component('search-settings', {
    extends: ClosedActivity,
    props: ['root'],
    data() {
        return {
             ageRange: [0,16,17,18,20,23,25,27,30,35,40,45,50,60,80],
             selectUp: 0,
             selectTo: 0,
             selectCity: '',
             checkedAny: 0,
             checkedVirt: 0,
        }
    },
    computed: Vuex.mapState({
        userSex: (state) => Number(state.user.sex), // GLOBAL
        who() {
            if (this.userSex) {
                return (this.userSex == 1) ? 2 : 1;
            } // [~!!!~] READ_ONLY
            return 0;
        },
        city(state) {
            let {city} = defaultSettings; // GLOBAL
            return state.user.city ? state.user.city : city; // [~!!!~] READ_ONLY
        },
        up(state) {
            return this.age(state.user.up);
        },
        to(state) {
            return this.age(state.user.to);
        },
        any(state) {
            return state.user.any == true;
        },
        virt(state) {
            return state.user.virt == true;
        },
        virgin(state) {
            // Хак для пустых настроек
            if (state.user.city != this.city) {
                return false;
            }
            // Хак для старых настроек NOT Range
            if (state.user.up != this.up) {
                return false;
            }
            if (state.user.to != this.to) {
                return false;
            }
            return (
                this.selectCity == this.city &&
                this.selectUp == this.up &&
                this.selectTo == this.to &&
                this.checkedAny == this.any &&
                this.checkedVirt == this.virt
            );
        }
    }),
    created() {
        let {city, up, to} = defaultSettings; // GLOBAL
        this.selectCity = this.city ? this.city : city;
        this.selectUp = this.up ? this.up : this.age(up);
        this.selectTo = this.to ? this.to : this.age(to);
        this.checkedAny = this.any;
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
        save() {
            var data = {
                up:   this.selectUp,
                to:   this.selectTo,
                any: this.checkedAny,
                virt: this.checkedVirt,
            };
            console.log(data);
            if (!this.virgin) {
                this.$store.dispatch('SAVE_SEARCH', data);
            }
        },
        close() {
            this.save();
            this.back();
            this.$root.reload();
        },
    },
    template: '#search-settings',
});
