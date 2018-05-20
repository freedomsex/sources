<script>
import ContentActivity from './ContentActivity';

export default {
  extends: ContentActivity,
  mounted() {
    this.title = 'Информация';
    this.load(`/content/deal/${this.link}`);
  },
};
</script>

<template>
  <div class="">

  </div>
</template>

<style lang="less">
</style>
