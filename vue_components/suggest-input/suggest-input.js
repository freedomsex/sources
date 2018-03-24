Vue.component('suggest-input', {
    props: ['url', 'disabled', 'tags'],
    data() {
        return {
            query: '',
            items: [],
            enable: true,
            init: true,
        };
    },
    computed: {
        suggested() {
            return this.items.length;
        },
    },
    methods: {
        load() {
            api.user.get({q: this.query}, 'tag/suggest').then((response) => {
                this.loaded(response.data);
            });
        },
        reset() {
            this.query = '';
            this.items = [];
        },
        clear() {
            this.items = [];
        },
        suggest: _.debounce(function () {
            this.init = false;
            this.load();
        }, 500),
        select(item) {
            if (!this.saved(item)) {
                this.$emit('select', item);
            }
            this.reset();
        },
        loaded(data) {
            if (data && data.length) {
                this.items = data;
            } else {
                //this.clear();
            }
        },
        saved(tag) {
            return _.findWhere(this.tags, {tag}) ? true : false;
        },
    },
    template: '#suggest-input',
});
