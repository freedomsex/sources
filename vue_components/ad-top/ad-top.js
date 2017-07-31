
const AdTop = Vue.component('ad-top', {
    data() {
        return {
            width: 0
        }
    },
    mounted() {
        this.width = this.$el.offsetWidth;
        console.log('cc', [this.desktop, this.width]);
    },
    computed: {
        desktop() {
            return this.width >= 700;
        }
    },
    template: '#ad-top',
});