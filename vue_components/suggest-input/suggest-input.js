Vue.component('suggest-input', {
    props: ['url', 'disabled'],
    data() {
        return {
            query: '',
            items: [],
            enable: true,
        };
    },
    computed: {
        suggested() {
            return this.items.length;
        },
        hint() {
            if (this.query && !this.items.length) {
                return 'Выберите из списка...'
            } else {
                return 'Введите название'
            }
        }
    },
    methods: {
        load() {
            api.user.get({q: this.query}, 'tag/suggest').then((response) => {
                this.loaded(response.data);
            });
            // setTimeout(() => {
            //     this.toSlow = true
            // }, second * 1000);
        },
        reset() {
            this.query = '';
            this.items = [];
        },
        clear() {
            this.items = [];
        },
        suggest: _.debounce(function () {
          this.load();
        }, 500),
        select(item) {
            this.query = item;
            this.$emit('select', item);
            this.reset();
        },
        loaded(data) {
            if (data && data.length) {
                this.items = data;
                console.log('loaded', data)
            } else {
                this.clear();
            }
            if (!this.query) {
                this.reset();
            }
        },
    },
    template: '#suggest-input',
});
