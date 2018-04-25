
Vue.component('account-component', {
    props: ['human'],
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        age() {
            return this.human.age ? moment.duration(this.human.age, "years").humanize() : null;
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
            var result = 'Парня ';
            if (this.human.sex) {
                result = this.human.sex == 2 ? 'Парня ' : 'Девушку ';
            }
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
        },
        search() {
            city = this.human.city ? '/' + this.human.city : '';
            if (this.human.who == 1) { who = '/Парни'; }
             else if (this.human.who == 2) { who = '/Девушки'; }
              else who = '';
            if (this.human.up && this.human.up == this.human.to) { years = '/возраст/'+this.human.up; } else
             if (this.human.up && this.human.to ) { years = '/возраст/'+this.human.up+'/'+this.human.to; } else
              if (this.human.up && !this.human.to) { years = '/возраст/от/'+this.human.up; } else
               if (!this.human.up && this.human.to) { years = '/возраст/до/'+this.human.to; }
                else years = '';
            return  city + who + years;
        }
    },
    template: '#account-component',
});
