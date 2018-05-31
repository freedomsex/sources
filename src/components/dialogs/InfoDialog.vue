<script>
import ModalDialog from '~dialogs/ModalDialog';

export default {
  props: ['text'],
  components: {
    ModalDialog,
  },
};
</script>

<template>
  <ModalDialog @close="$emit('close')">
    <div class="modal-dialog__wrapper">
      <div class="modal-dialog__body">
        <slot></slot>
        {{text}}
      </div>
      <div class="modal-dialog__footer">
        <button class="btn btn-primary btn-flat" @click="$emit('close')">
          Хорошо
        </button>
      </div>
    </div>
  </ModalDialog>
</template>

<style lang="less">
</style>
