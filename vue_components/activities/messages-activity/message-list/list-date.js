
Vue.component('list-date', {
    props: ['list','index'],
    computed: {
        count() {
            return this.list.length;
        },
        item() {
            return this.list[this.index];
        },
        currDate() {
            return moment(this.item.date).date();
        },
        prevDate() {
            if (this.index && this.index < this.count) {
                return moment(this.list[this.index-1].date).date();
            }
        },
        month() {
            return moment(this.item.date).format('MMMM').substring(0,3);
        },
        formatted() {
            var result = this.currDate + ' ' + this.month;
            let today = moment().date();
            let yestd = moment().subtract(1, 'day').date();
            result = (this.currDate === today) ? 'Сегодня' : result;
            result = (this.currDate === yestd) ? 'Вчера' : result;
            return result;
        },
        date() {
            if (this.prevDate != this.currDate) {
                return this.formatted;
            } else {
                return null;
            }
        },
    },
    template: '#list-date',
});