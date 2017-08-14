Vue.component('desire-widget', {
    props: ['tags'],
    data() {
        return {
            batch: 50,
            position: 0,
            list: []
        }
    },
    watch: {
        tags() {
            if (!this.position || this.offset != this.batch) {
                this.load();
            }
        }
    },
    computed: {
        avaible() {
            let result = this.tags.length - this.position;
            return (result > 0) ? result : 0;
        },
        more() {
            return this.tags ? this.avaible : false;
        },
        offset() {
            let result = this.batch;
            if (this.list.length && this.list.length < this.batch) {
                result = this.batch - this.list.length;
            }
            return result;
        },
        next() {
            let result = this.tags.slice(this.position, this.position + this.offset);
            return _.shuffle(result);
        },
        desires() {
            return this.$store.getters['desires/tags'];
        },
    },
    methods: {
        load() {
            if (this.more) {
                console.log('load', [this.list, this.next]);
                this.list = _.union(this.list, this.next);
                this.position = this.list.length;
            }
        },
        add(tag) {
            if (!this.added(tag)) {
                this.$store.dispatch('desires/ADD', tag).then((response) => {});
            }
        },
        added(tag) {
            return _.contains(this.desires, tag);
        },
    },
    template: '#desire-widget'
});