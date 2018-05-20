<script>
import QuickDialog from './QuickDialog';

export default {
  extends: QuickDialog,
  computed: {
    reply: () => true,
    information() {
      return this.message;
    },
  },
  methods: {
    sended() {
      this.$emit('sended', this.index);
      this.close();
    },
    action() {},
  },
};
</script>

<template>
  <div class="">

  </div>
</template>

<style lang="less">
</style>
