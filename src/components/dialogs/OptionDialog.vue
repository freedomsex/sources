<script>
import $ from 'jquery';

export default {
  methods: {
    close() {
      this.$emit('close');
    },
  },
  created() {
    // Close the modal when the `escape` key is pressed.
    const self = this;
    document.addEventListener('keydown', (event) => {
      if (self.show && event.keyCode === 27) {
        self.close();
      }
    });
  },
  updated() {
    if (this.show) {
      $('html, body').animate({scrollTop: 0}, 'slow');
    }
  },
};
</script>

<template>
  <div class="option-dialog">
    <div class="option-dialog__cover">
      <div class="option-dialog__loader"></div>
    </div>
    <div class="option-dialog__wrapper" @click="close">
      <div class="option-dialog__close" @click.stop="close">
        Закрыть
        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
      </div>
      <div class="option-dialog__container" @click.stop>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less">
</style>
