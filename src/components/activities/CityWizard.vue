<script>
import SuggestInput from '~modules/SuggestInput';
import CityDefaultList from '~assets/CityDefaultList';
import ActivityActions from '~activities/ActivityActions';
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
  <ActivityActions caption="Мой город" type="wrapped" @close="close">
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
