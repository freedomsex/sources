Vue.component('city-suggest', {
    props: ['value'],
    data() {
        return {
            query: '',
            cities: [],
            enable: true
        };
    },
    mounted() {
        if (this.value && this.value.length > 2) {
            this.query = this.value;
        }
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
            this.$emit('select', item);
            this.reset();
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
