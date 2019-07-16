<script>
export default {
  props: ['left', 'accent'],
  data: () => ({
    minimun: 86400 * 3,
  }),
  // updated() {
  //   console.log('normal', [this.access_ttl, this.left, this.normal]);
  // },
  computed: {
    access_ttl() {
      return this.$store.state.token.access_ttl;
    },
    lifetime() {
      return this.$store.state.token.lifetime;
    },
    normal() {
      return this.access_ttl - this.accent; // ~3000
    },
    warning() {
      return this.minimun - this.lifetime;
    },

    color() {
      return {
        'badge-primary': this.left > this.normal,
        'badge-success': this.left < this.normal && this.left > 0,
        'badge-secondary': this.left < 0 && this.left > this.warning,
        'badge-warning': this.left < this.warning && this.left > 0 - this.lifetime,
        'badge-danger': this.left < 0 - this.lifetime,
      };
    },
  },
};
</script>

<template>
  <span class="color-ttl badge" :class="color" @click="$emit('refresh')">{{left}}</span>
</template>

<style lang="less">
.color-ttl {
  &.badge {
    &-primary {
      background-color: @primary;
    }
    &-success {
      background-color: @green-dark;
    }
    &-secondary {
      background-color: @gray-dark;
    }
    &-warning {
      background-color: @orange-dark;
    }
    &-danger {
      background-color: @red-dark;
    }
  }
}

</style>
