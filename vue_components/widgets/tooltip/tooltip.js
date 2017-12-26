Vue.component('tooltip', {
    props: [
      'text',
      'force',
    ],
    data() {
        return {
            show: false,
        }
    },
    methods: {
        close() {
            this.show = false;
            this.$emit('close');
        },
    },
    template: '#tooltip',
});
