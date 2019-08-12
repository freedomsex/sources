<script>
import hasher from '~legacy/utils/simple-hash';

export default {
  props: ['action', 'product', 'button', 'text'],
  data: () => ({

  }),
  computed: {
    style() {
      return `btn-${this.button || 'primary'}`;
    },
    href() {
      const {uid} = this.$store.state.token;
      const gateway = 'http://x69.me/payments';
      // const gateway = '/payments';
      return `${gateway}/merchant/${this.product}/${uid}/${this.hash()}`;
    },
  },
  methods: {
    hash() {
      return hasher.random();
    },
  },
};
</script>

<template>
  <a :href="href" class="btn" :class="style"
  v-html="text || 'Пополнить'"
  target="_blank"></a>
</template>

<style lang="less">

</style>
