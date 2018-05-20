<script>
import _ from 'underscore';

export default {
  methods: {
    close() {
      this.$emit('close');
    },
  },
  mounted() {
    _.delay(this.close, 2000);
  },
};
</script>

<template>
  <div class="toast" @click="close">
    <div class="toast__body">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
.toast {
  position: fixed;
  bottom: 15px;
  left: 0;
  right: 0;
  text-align: center;
  opacity: 0.95;
  z-index: 10000;
  &__body {
    color: @white;
    display: inline-block;
    background: @dark-light;
    padding: @indent-sm @indent-md;
    min-width: 100px;
    max-width: 400px;
    border-radius: 50px;
  }
}
</style>
