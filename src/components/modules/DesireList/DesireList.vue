<script>
import _ from 'underscore';
import DesireItem from './DesireItem';

export default {
  props: ['tags'],
  computed: {
    desires() {
      return this.$store.getters['desires/tags'];
    },
  },
  methods: {
    add(tag) {
      if (!this.added(tag)) {
        this.$store.dispatch('desires/ADD', tag).then(() => {});
      }
    },
    added(tag) {
      return _.contains(this.desires, tag);
    },
  },
  components: {
    DesireItem,
  },
};
</script>

<template>
  <div class="desire-list">
    <desire-item v-for="(item, index) in tags"
     :key="index"
     :tag="item"
     :added="added(item)"
     @select="add"/>
  </div>
</template>

<style lang="less">
.desire-list {
}
</style>
