<script>
export default {
  props: ['less', 'busy', 'disabled', 'moreTitle', 'nextTitle', 'busyTitle'],
  data: () => ({
    timeout: true,
  }),
  computed: {
    sayMore() {
      return this.moreTitle || 'Ещё';
    },
    sayNext() {
      return this.nextTitle || 'Следующие';
    },
    sayBusy() {
      let say = this.busyTitle || 'Загружаю...';
      if (this.less) {
        say = '...';
      }
      return say;
    },
    title() {
      let title = this.less ? this.sayMore : this.sayNext;
      if (this.busy) {
        title = this.sayBusy;
      }
      return title;
    },
  },
  methods: {
    next() {
      this.timeout = false;
      setTimeout(() => {
        this.timeout = true;
      }, 1000 * 4);
      this.$emit('next');
    },
  },
};
</script>

<template>
  <button class="btn btn-default"
   @click="next()"
   :disabled="(busy || disabled) && !timeout">
   {{title}}
 </button>
</template>

<style lang="less">
</style>
