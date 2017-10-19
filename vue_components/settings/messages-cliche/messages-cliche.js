
const MessagesCliche = Vue.component('messages-cliche', {
    props: [],
    extends: ActivityActions,
    data() {
        return {
            texts: [],
            active: 'public',
            process: true,
            default: {
                size: 12,
                color: '4E8714',
            }
        }
    },
    mounted() {
        this.load();
    },
    computed: {
        // ...
    },
    methods: {
        load(value) {
            let result = value ? value : this.active;
            this.loadStart();
            api.raw.load(null, `static/json/cliche/${result}.json`).then(({ data }) => {
                this.texts = data;
                this.active = result;
            });
        },
        size(value) {
            let result = value ? value : this.default.size;
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
