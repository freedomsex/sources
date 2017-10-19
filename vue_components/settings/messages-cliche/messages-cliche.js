
const MessagesCliche = Vue.component('messages-cliche', {
    props: [],
    extends: ActivityActions,
    data() {
        return {
            texts: [],
            version: 3,
            active: null,
            process: true,
            default: {
                size: 12,
                color: '4E8714',
                tab: 'public',
            }
        }
    },
    mounted() {
        let active = ls.get('cliche-active');
        this.load(active);
    },
    computed: {
        // ...
    },
    methods: {
        load(value) {
            let result = value ? value : this.default.tab;
            api.raw.load(null, `static/json/cliche/${result}.json?v=${this.version}`).then(({ data }) => {
                this.texts = data;
                this.active = result;
                ls.set('cliche-active', this.active, 3*24*60*60);
            });
        },
        size(value) {
            let result = value ? (this.default.size + value) : this.default.size;
            return `${result}px`;
        },
        color(value) {
            let result = value ? value : this.default.color;
            return `#${result}`;
        },
        style(item) {
            return {
                fontSize: this.size(item.size),
                color: this.color(item.color),
            }
        },
        buttonStyle(value) {
            return (this.active == value ) ? 'btn-primary' : 'btn-default';
        },
        select(text) {
            this.$emit('select', text);
            this.close();
        },
    },
    template: '#messages-cliche',
});
