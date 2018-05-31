<script>
import CitySuggest from '~modules/CitySuggest';
import CityDefaultList from '~assets/CityDefaultList';
import AccountSettings from './AccountSettings';
import ActivityActions from '../ActivityActions';

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
      this.$emit('close');
    },
    close() {
      this.saveCity();
      this.$emit('close');
    },
  },
  components: {
    ActivityActions,
    CitySuggest,
  },
};
</script>

<template>
  <ActivityActions :closed="true" @close="close">
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
  </ActivityActions>
</template>

<style lang="less">
</style>
