<script>
import ModalDialog from '~dialogs/ModalDialog';

export default {
  components: {
    ModalDialog,
  },
};
</script>

<template>
  <ModalDialog @close="$emit('close')">
    <div class="modal-dialog__wrapper">
      <div class="modal-dialog__caption">
        <slot name="title"></slot>
      </div>
      <div class="modal-dialog__body">
        <slot></slot>
      </div>
    </div>
  </ModalDialog>
</template>

<style lang="less">
</style>
