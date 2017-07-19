
const AboutSettings = Vue.component('about-settings', {
    props: [],
    data() {
        return {
            inputGrowth: '',
            inputWeight: '',
            selectFigure: null,
            process: false,
            virgin: true
        }
    },
    computed: Vuex.mapState({
        growth(state) {
            return state.about.growth;
        },
        weight(state) {
            return state.about.weight;
        },
        figure(state) {
            return state.about.figure;
        }
    }),
    mounted() {
        this.$store.dispatch('about/SYNC').then(() => {
            this.init();
            this.process = false;
        }).catch(() => {
            this.process = false;
        });
        this.process = true;
        this.init();
    },
    methods: {
        init() {
            this.inputGrowth = this.growth ? this.growth : '';
            this.inputWeight = this.weight ? this.weight : '';
            this.selectFigure = this.figure;
        },
        deflower() {
            this.virgin = false;
        },
        close() {
            this.save();
            this.$emit('close');
        },
        save() {
            if (!this.virgin) {
                this.$store.dispatch('about/SAVE', {
                    growth: this.inputGrowth,
                    weight: this.inputWeight,
                    figure: this.selectFigure
                });
            }
        },
    },
    template: '#about-settings',
});
