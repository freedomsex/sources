Vue.component('photo-send', {
    props: ['photo', 'options'],
    data() {
        return {
            remove: false
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    },
    template: '#photo-send',
});
