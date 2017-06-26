
Vue.component('account-settings', {
    props: [],
    data() {
        return {
             selectCity: '',
             selectSex: 0,
             selectAge: 0,
             selectName: ''
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
            var variant = [];
            variant[1] = ['Саша','Дима','Сергей','Иван','Максим','Валера','Николай'];
            variant[2] = ['Оля','Юля','Настя','Алена','Катя','Маргарита','Татьяна'];
            let x = Math.floor( Math.random() * 7);
            let name = state.user.name;
            let auto = this.sex ? variant[this.sex][x] : '';
            return name ? name : auto;
        },
    }),
    mounted() {
        this.selectCity = this.city;
        this.selectSex = this.sex;
        this.selectAge = this.age;
        this.selectName = this.name;
    },
    methods: {
        saveSex() {
            this.$store.dispatch('SAVE_SEX',  this.selectSex);
            this.resetName();
        },
        saveCity(city) {
            this.$store.dispatch('SAVE_CITY', city);
        },
        saveAge() {
            this.$store.dispatch('SAVE_AGE',  this.selectAge);
        },
        saveName() {
            this.$store.dispatch('SAVE_NAME', this.selectName);
        },
        resetName() {
            this.selectName = this.name;
        },
        save() {
            this.saveName();
        },
        close() {
            this.save();
            this.$emit('close');
        },
        login() {
            this.$emit('login');
            this.$emit('close');
        },
    },
    template: '#account-settings',
});
