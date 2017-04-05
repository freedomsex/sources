
Vue.component('inform-dialog', {
    props: [
      'loader',
      'hint',
    ],
    methods: {
        close() {
            this.$emit('close');
        },
    },
    template: '#inform-dialog'
});
