
Vue.component('search-item', {
    props: ['human'],
    data() {
        return {
            first:  null,
            second: null,
            third:  null,
            social: {
                first:  ['em','ok','vk','fb','go','sk','ph'],
                second: ['vk','ok','fb','go','sk','ph'],
                third:  ['sk','ph','em','ok','vk','fb','go'],
            },
        };
    },
    mounted() {
        _.find(_.pick(this.human, this.social.first), (value, key) => {
            return value ? (this.first = key) : false;
        });
        _.find(_.pick(this.human, this.social.second), (value, key) => {
            value = this.first == key ? false : value;
            return value ? (this.second = key) : false;
        });
        _.find(_.pick(this.human, this.social.second), (value, key) => {
            value = this.first == key ? false : value;
            value = this.second == key ? false : value;
            return value ? (this.third = key) : false;
        });
    },
    computed: {
        search() {
            var result = 'парня или девушку ';
            if (this.human.who) {
                result = this.human.who == 1 ? 'парня ' : 'девушку ';
            }
            result = 'Ищет ' + result;
            if (this.human.up || this.human.to) {
                //result += ' в возрасте ';
                result += this.human.up ? ' от ' + this.human.up : '';
                result += this.human.to ? ' до ' + this.human.to : '';
                result += ' лет ';
            }
            return result;
        },
        tags() {
            return this.human.tags.length;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        load() {
            api.search.load(null).then((response) => {
                this.users = response.data.users;
            });
        }
    },
    template: '#search-item',
});
