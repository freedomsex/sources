<script>
import ModalDialog from '~dialogs/ModalDialog';

export default {
  props: ['type', 'strict', 'yesText'],
  computed: {
    style() {
      const btn = {
        default: 'btn-default',
        success: 'btn-success',
        warning: 'btn-warning',
        danger: 'btn-danger',
        info: 'btn-info',
      };
      return this.type ? btn[this.type] : 'btn-primary';
    },
    yes() {
      return this.yesText || this.$t('ХОРОШО');
    },
  },
  methods: {
    confirm() {
      this.$emit('confirm');
      if (!this.strict) {
        this.$emit('close');
      }
    },
  },
  components: {
    ModalDialog,
  },
};
</script>

<i18n>
{
  "en": {
    "ХОРОШО": "OKAY"
  }
}
</i18n>

<template>
  <ModalDialog @close="$emit('close')">
    <div class="modal-dialog__wrapper">
      <div class="modal-dialog__caption">
        <slot name="title"></slot>
      </div>
      <div class="modal-dialog__body">
        <slot></slot>
      </div>
      <div class="modal-dialog__footer">
        <button class="btn btn-flat" :class="style"
         @click="confirm">
          <slot name="yesIcon"></slot>
          {{yes}}
        </button>
      </div>
    </div>
  </ModalDialog>
</template>

<style lang="less">
</style>
