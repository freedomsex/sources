Vue.component('api-key-update', {
    props: [
      'item',
    ],
    data() {
        return {
            showOption:  false,
        }
    },
    methods: {
        upKey() {
            console.log('upKey');
            axios.get('/sync/sess/').then((response) => {
                this.$store.dispatch('LOAD_API_TOKEN');
                this.upUser(response.data);
                this.upSettings(response.data);
            });
        },
        upUser(data) {
            let {uid, city, sex, age, name, contacts} = data;
            console.log('upUser', data);
            this.$store.commit('resetUser', {uid, city, sex, age, name, contacts});
            //store.commit('loadUser', data.contacts);
        },
        upSettings(data) {
            let {who, years_up: up, years_to: to, close: town, virt} = data;
            this.$store.commit('settings', {who, up, to, virt, town});
        }
    },
    mounted() {
        this.upKey();
        setInterval(() => {
            this.upKey();
        }, 1000 * 6);
    },
    template: '#api-key-update'
});
