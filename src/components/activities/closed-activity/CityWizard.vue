<script>
import SuggestInput from '~modules/SuggestInput';
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
    SuggestInput,
  },
};
</script>

<template>
  <ActivityActions type="wrapped" @close="close">
    <span slot="caption">Мой город</span>
    <div class="activity-section">
      <div class="form-inline">
        <SuggestInput url="town/suggest"
         title="Введите название"
         :default="selectCity"
         @select="select"/>
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
