<script>
import SearchList from '~components/SearchList';
import ActivityActions from '../ActivityActions';

export default {
  beforeRouteUpdate(to, from, next) {
    if (to.fullPath == '/search' && from.fullPath == '/search/settings/search') {
      this.$refs.results.reload();
    }
    next();
  },
  components: {
    ActivityActions,
    SearchList,
  },
};
</script>

<template>
  <ActivityActions @close="$emit('close')">
    <span slot="caption">Поиск</span>
    <div class="menu-user__navbar-right" slot="option">
      <div class="navbar-button" @click="$router.push('/search/settings/search')">
        <i class="material-icons">&#xE8B8;</i>
        <span class="navbar-button__title"> Настроить</span>
      </div>
    </div>
    <SearchList ref="results"/>
  </ActivityActions>
</template>

<style lang="less">
</style>
