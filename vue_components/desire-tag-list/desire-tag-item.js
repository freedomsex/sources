Vue.component('desire-tag-item', {
    props: ['id', 'tag', 'added'],
    data() {
        return {
            active: false,
            error: false,
        }
    },
    methods: {
        activate() {
            this.active = true;
            _.delay(() => this.active = false, 3000);
        },
        select() {
            this.activate();
            this.$emit('select', this.tag);
        }
    },
    template: '#desire-tag-item'
});