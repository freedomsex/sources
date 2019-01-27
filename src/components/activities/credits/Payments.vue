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
      let {uid} = this.$store.state.user;
      const gateway = 'http://xosex.me/payments';
      // const gateway = '/payments';
      return `${gateway}/${this.action}/${this.product}/${uid}/${this.hash()}`;
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
