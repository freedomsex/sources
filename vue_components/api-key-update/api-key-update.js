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
                store.dispatch('LOAD_API_TOKEN');
                this.upUser(response.data);
                this.upSettings(response.data);
            });
        },
        upUser(data) {
            let {uid, city, sex, age, name} = data;
            console.log(data);
            store.commit('loadUser', {uid, city, sex, age, name});
            store.commit('loadUser', data.contacts);
        },
        upSettings(data) {
            let {who, years_up: up, years_to: to, close: town, virt} = data;
            store.commit('settings', {who, up, to, virt, town});
        }
    },
    mounted() {
        this.upKey();
        setInterval(() => {
            this.upKey();
        }, 1000 * 600);
    },
    template: '#api-key-update'
});
