Vue.component('city-suggest', {
    props: [],
    data() {
        return {
            query: '',
            cities: [],
            enable: true
        };
    },
    computed: {
        suggested() {
            return this.cities.length;
        }
    },
    methods: {
        load() {
            if (!this.query.length) {
                return this.reset();
            }
            api.user.get({q: this.query, hash}, 'town/suggest').then((response) => {
                this.loaded(response.data.cities);
            });
        },
        reset() {
            this.cities = [];
        },
        select(item) {
            this.query = item;
            this.reset();
        },
        close() {
            this.$emit('close');
        },
        loaded(data) {
            if (data && data.length) {
                this.cities = data;
            } else {
                this.reset();
            }
        },
    },
    template: '#city-suggest',
});
