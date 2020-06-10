<script>
export default {
  props: [],
  data: () => ({
    delay: 5,
    interval: 3 * 60,
  }),
  mounted() {
    window.setTimeout(this.start, this.delay * 1000);
  },
  methods: {
    start() {
      this.visit();
      window.setInterval(this.visit, this.interval * 1000);
    },
    visit() {
      this.$service.run('visits/visit');
    },
  },

  created() {
    global.addEventListener('focus', this.visit);
  },
  destroyed() {
    global.removeEventListener('focus', this.visit);
  },
};
</script>

<template>
  <div class="">

  </div>
</template>

<style lang="less">

</style>
