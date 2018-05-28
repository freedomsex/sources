<script>
import ClosedActivity from '~closed-activity/ClosedActivity';
import CitySuggest from '~modules/CitySuggest';
import CityDefaultList from '~assets/CityDefaultList';
import AccountSettings from './AccountSettings';

export default {
  extends: AccountSettings,
  data() {
    return {
      cities: CityDefaultList,
    };
  },
  methods: {
    select(city) {
      this.saveCity(city);
      this.back();
    },
    close() {
      this.saveCity();
      this.back();
    },
  },
  components: {
    ClosedActivity,
    CitySuggest,
  },
};
</script>

<template>
  <ClosedActivity @close="close">
    <span slot="caption">Мой город</span>
    <div class="activity-section">
      <div class="form-inline">
        <CitySuggest :city="selectCity" @select="select"/>
      </div>
    </div>
    <div class="activity-section">
      <span class="city-list__item btn btn-default btn-xs"
       v-for="item in cities"
       @click="select(item)"> {{item}} </span>
    </div>
  </ClosedActivity>
</template>

<style lang="less">
</style>
