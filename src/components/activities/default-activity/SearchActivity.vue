<script>
import DefaultActivity from './DefaultActivity';
import SearchList from '~components/SearchList';

export default {
  extends: DefaultActivity,
  data() {
    return {};
  },
  beforeRouteUpdate(to, from, next) {
    if (
      to.fullPath == '/search' &&
      from.fullPath == '/search/settings/search'
    ) {
      this.$refs.results.reload();
    }
    next();
  },
  computed: {},
  methods: {
    close() {
      this.back();
    },
  },
  components: {
    DefaultActivity,
    SearchList,
  },
};
</script>

<template>
  <DefaultActivity @close="close">
    <span slot="caption">Поиск</span>
    <div class="menu-user__navbar-right" slot="option">
      <div class="navbar-button" @click="$router.push('/search/settings/search')">
        <i class="material-icons">&#xE8B8;</i>
        <span class="navbar-button__title"> Настроить</span>
      </div>
    </div>
    <SearchList ref="results"/>
  </DefaultActivity>
</template>

<style lang="less">
</style>
