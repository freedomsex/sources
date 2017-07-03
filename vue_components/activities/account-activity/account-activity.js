
Vue.component('account-activity', {
    props: ['humanId'],
    data() {
        return {
            loading: false,
        };
    },
    mounted() {
        this.load();
    },
    computed: {
        human() {
            return this.$store.state.search.human;
        },
        age() {
            return moment.duration(this.human.age, "years").humanize();
        },
        tags() {
            return ('tags' in this.human) ? this.human.tags : [];
        },
        social() {
            let {em, vk, ok, fb, go} = this.human;
            if (em || vk || ok || fb || go) {
                return {em, vk, ok, fb, go};
            }
            return null;
        },
        interact() {
            let {ph, sk} = this.human;
            if (ph || sk) {
                return {ph, sk};
            }
            return null;
        },
        figure() {
            var figure = this.human.anketa ? this.human.anketa.figure : null;
            var result = figure;
            switch (figure) {
                case 2: result = 'спортивного'; break;
                case 3: result = 'обычного'; break;
                case 5: result = 'полного'; break;
                case 6: result = 'худого'; break;
            }
            return result;
        },
        hold() {
            return this.ignore ? 0 : this.human.hold;
        },
        who() {
            var result = 'Парня или девушку ';
            if (this.human.who) {
                result = this.human.who == 1 ? 'Парня ' : 'Девушку ';
            }
            if (this.human.up || this.human.to) {
                result += ' в возрасте ';
                result += this.human.up ? ' от ' + this.human.up : '';
                result += this.human.to ? ' до ' + this.human.to : '';
                result += ' лет ';
            }
            return result;
        },
        ago() {
            var {last} = this.human;
            var result = 'Онлайн';
            if (last > 2592000) {
                result = null;
            } //else
            if (last > 777) {
                result = moment.duration((0 - last), "seconds").humanize(true);
            }
            return result;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        loaded() {
            this.loading = false;
                console.log(this.human);
        },
        hope() {
            setTimeout(() => this.loading = false, 4 * 1000);
        },
        load() {
            this.loading = true;
            this.hope();
            store.dispatch('HUMAN', this.humanId).then((response) => {
                this.loaded();
            }).catch((error) => {
                console.log(error);
                this.loading = false;
            });
        }
    },
    template: '#account-activity',
});
