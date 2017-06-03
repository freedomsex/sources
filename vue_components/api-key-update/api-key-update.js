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
            });
        },
    },
    mounted() {
        setTimeout(() => {
            this.upKey();
        }, 1000 * 600);
    },
    template: '#api-key-update'
});
