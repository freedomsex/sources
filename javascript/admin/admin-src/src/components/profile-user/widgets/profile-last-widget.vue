<script>
import moment from 'moment';
import 'moment/locale/ru';

export default {
  props: ['last', 'sex'],
  computed: {
    sayTime() {
      console.log(parseInt(this.sex, 10) < 3);
      return moment.duration(this.last * 1, 'seconds').humanize(); // this.time ? Math.round(this.time / 86400) : 0;
    },
    color() {
      const day = 86400;
      return {
        br_ored: this.time < 777,
        br_oyel: this.time < day,
        br_ogrn: this.time < day * 3,
      };
    },
    gender() {
      return `profile-user__icon${parseInt(this.sex, 10) > 1 ? '-women' : '-human'}`;
    },
  },
};
</script>

<template>
  <div class="profile-info__gender">
    <span id="profile-info__old" :class="color">
      <span class="profile-info__old-text">{{sayTime}}</span>
      <span :class="gender"></span>
    </span>
  </div>
</template>

<style lang="less">

</style>
