
const AdTop = Vue.component('ad-top', {
    data() {
        return {
            enabled: false,
            width: 0
        }
    },
    mounted() {
        this.width = this.$el.offsetWidth;
        console.log('cc', [this.desktop, this.width]);
    },
    methods: {
        random(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    },
    computed: {
        desktop() {
            return this.width >= 700
        },
        source() {
            return '/static/img/ad/ad-hm-' + this.random(0, 2) + '.gif'
        }
    },
    template: '#ad-top',
});