<script>
import ContentActivity from './ContentActivity';

export default {
  extends: ContentActivity,
  mounted() {
    this.title = 'Что нового';
    this.load(`/content/releases/${this.link}`);
  },
};
</script>

<template>
  <div class="">

  </div>
</template>

<style lang="less">
</style>
