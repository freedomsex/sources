Vue.component('desires-widget', {
    props: ['tags'],
    data() {
        return {
            batch: 50,
            position: 0,
            list: []
        }
    },
    mounted() {
        this.reload();
    },
    updated() {
        this.reload();
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
    },
    methods: {
        load() {
            if (this.more) {
                this.list = _.union(this.list, this.next);
                this.position = this.list.length;
            }
        },
        reload() {
            if (!this.position || this.offset != this.batch) {
                this.load();
            }
        }
    },
    template: '#desires-widget'
});