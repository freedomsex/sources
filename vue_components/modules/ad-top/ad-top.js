
const AdTop = Vue.component('ad-top', {
    data() {
        return {
            enabled: true,
            iframe: true,
            width: 0,
            rotation: {
                desktop: [0, 1],
            }
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
        banner() {
            return this.random(1, 2);
        },
        source() {
            return '/static/img/ad/ad-hm-' + this.random(0, 2) + '.gif'
        }
    },
    template: '#ad-top',
});