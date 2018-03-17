
const AccountSettings = Vue.component('account-settings', {
    extends: ClosedActivity,
    props: ['root'],
    data() {
        return {
             selectCity: '',
             selectSex: 0,
             selectAge: 0,
             selectName: '',
             nameAlert: false
        }
    },
    computed: Vuex.mapState({
        sex(state) {
            var sex = Number(state.user.sex);
            if (sex) {
                return (sex == 1) ? 1 : 2;
            }
            return 0;
        },
        city(state) {
            return state.user.city;
        },
        age(state) {
            return state.user.age;
        },
        name(state) {
            let name = state.user.name;
            let auto = (!name && this.sex) ? this.autoName() : '';
            return name ? name : auto;
        },
    }),
    created() {
        let {city, age} = defaultSettings; // GLOBAL
        this.selectCity = this.city ? this.city : city;
        this.selectAge = this.age ? this.age : age;
        this.selectSex = this.sex;
        this.selectName = this.name;
    },
    methods: {
        autoName() {
            var variant = [];
            variant[1] = ['Саша','Дима','Сергей','Иван','Максим','Валера','Николай'];
            variant[2] = ['Оля','Юля','Настя','Алена','Катя','Маргарита','Татьяна'];
            let x = Math.floor( Math.random() * 7);
            return this.sex ? variant[this.sex][x] : '';
        },
        saveSex() {
            this.$store.dispatch('SAVE_SEX',  {sex: this.selectSex, token: null});
            this.resetName();
        },
        saveCity(city) {
            if (city) {
                this.selectCity = city;
            }
            if (this.selectCity != this.city) {
                this.$store.dispatch('SAVE_CITY', this.selectCity);
            }
        },
        saveAge() {
            if (this.selectAge != this.age) {
                this.$store.dispatch('SAVE_AGE',  this.selectAge);
            }
        },
        saveName() {
            this.$store.dispatch('SAVE_NAME', this.selectName).catch(() => {
                this.resetName();
                this.nameAlert = true;
            });
        },
        resetName() {
            this.selectName = this.name;
        },
        randomAge() {
            this.selectAge = _.random(19, 30);
            this.saveAge();
        },
        save() {
            this.saveCity();
            this.saveAge();
            this.saveName();
        },
        close() {
            this.save();
            this.back();
        },
    },
    template: '#account-settings',
});
