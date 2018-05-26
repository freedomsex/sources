<script>
import ModalDialog from '~dialogs/ModalDialog';

export default {
  extends: ModalDialog,
  props: ['simple', 'title', 'yesText', 'noText'],
  computed: {
    yes() {
      return this.yesText || 'Хорошо';
    },
    no() {
      return this.noText || 'Отмена';
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel');
      this.close();
    },
    confirm() {
      this.$emit('confirm');
      this.close();
    },
  },
  components: {
    ModalDialog,
  },
};
</script>

<template>
  <ModalDialog @close="close">
    <div class="modal-dialog__wrapper">
      <div class="modal-dialog__caption" v-if="this.title !== true">
        <slot name="title"></slot>
      </div>
      <div class="modal-dialog__body">
        <slot></slot>
      </div>
      <div class="modal-dialog__footer">
        <button class="btn btn-default"
         @click="cancel"
         v-if="simple !== true"> {{no}} </button>
        <button class="btn btn-primary btn-flat"
         @click="confirm"> {{yes}} </button>
      </div>
    </div>
  </ModalDialog>
</template>

<style lang="less">
</style>
