<script>
import ModalDialog from '~dialogs/ModalDialog';

export default {
  props: ['text'],
  extends: ModalDialog,
  components: {
    ModalDialog,
  },
};
</script>

<template>
  <ModalDialog @close="close()">
    <div class="modal-dialog__wrapper">
      <div class="modal-dialog__body">
        {{text}}
      </div>
      <div class="modal-dialog__footer">
        <button class="btn btn-primary btn-flat" @click="close()">
          Хорошо
        </button>
      </div>
    </div>
  </ModalDialog>
</template>

<style lang="less">
</style>
