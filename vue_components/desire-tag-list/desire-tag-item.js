Vue.component('desire-tag-item', {
    props: ['id', 'tag'],
    data() {
        return {
            active: false,
            error: false,
        }
    },
    methods: {
        select() {
            this.$emit('select');
        }
    },
    template: '#desire-tag-item'
});