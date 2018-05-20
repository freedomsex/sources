<script>
import moment from 'moment';

export default {
  props: ['list', 'index'],
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
        return moment(this.list[this.index - 1].date).date();
      }
      return null;
    },
    month() {
      return moment(this.item.date)
        .format('MMMM')
        .substring(0, 3);
    },
    formatted() {
      let result = `${this.currDate} ${this.month}`;
      const today = moment().date();
      const yestd = moment()
        .subtract(1, 'day')
        .date();
      result = this.currDate === today ? 'Сегодня' : result;
      result = this.currDate === yestd ? 'Вчера' : result;
      return result;
    },
    date() {
      if (this.prevDate != this.currDate) {
        return this.formatted;
      }
      return null;
    },
  },
};
</script>

<template>
  <div class="message-item__date" v-if="date">
    <span>{{date}}</span>
  </div>
</template>

<style lang="less">
</style>
