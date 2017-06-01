
Vue.component('inform-dialog', {
    props: [
      'loader',
      'alert',
      'hint',
    ],
    methods: {
        close() {
            this.$emit('close');
        },
    },
    template: '#inform-dialog'
});
