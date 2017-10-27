Vue.component('settings-inform', {
    template: '#settings-inform',
    methods: {
        confirm() {
            this.$emit('confirm');
            this.$emit('close');
        },
    },
});