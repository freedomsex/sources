<script>
export default {
  methods: {
    close() {
      this.$emit('close');
      this.$store.commit('viewPhoto', {photo: null});
    },
  },
  computed: {
    config() {
      return this.$state.photoView;
    },
  },
};
// TODO: кудато впереть, безхозное [!!!]
</script>

<template>
  <div class="">

  </div>
</template>

<style lang="less">
</style>
