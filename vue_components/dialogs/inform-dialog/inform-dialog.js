
Vue.component('inform-dialog', {
    props: [
      'loader',
      'alert',
      'hint',
    ],
    computed: {
        hasContext() {
            return !!this.$slots.context;
        },
        hasHint() {
            return !!this.$slots.hint;
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
    },
    template: '#inform-dialog'
});
