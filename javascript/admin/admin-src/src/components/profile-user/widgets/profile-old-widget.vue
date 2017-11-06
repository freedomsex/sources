<script>
import moment from 'moment';
import 'moment/locale/ru';

export default {
  props: ['time'],
  computed: {
    sayTime() {
      return moment.duration(this.time * 1, 'seconds').humanize(); // this.time ? Math.round(this.time / 86400) : 0;
    },
    color() {
      const day = 86400;
      return {
        br_red: this.time < (day * 2),
        br_yel: this.time < (day * 3),
        br_grn: this.time < (day * 30),
      };
    },
  },
};
</script>

<template>
  <span id="profile-caption__old" :class="color">
    анкете {{ sayTime }}
  </span>
</template>

<style lang="less">

</style>
