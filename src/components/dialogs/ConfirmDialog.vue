<script>
import ModalDialog from '~dialogs/ModalDialog';

export default {
  props: [
    'simple', // without NO btn
    'yesText',
    'noText',
    'notation',
  ],
  computed: {
    yes() {
      return this.yesText || this.$t('ХОРОШО');
    },
    no() {
      return this.noText || this.$t('ОТМЕНА');
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel');
      this.$emit('close');
    },
    confirm() {
      this.$emit('confirm');
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
    "ХОРОШО": "OKAY",
    "ОТМЕНА": "CANCEL"
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
        <button class="btn btn-default"
         @click="cancel"
         v-if="simple !== true">
          <slot name="noIcon"></slot>
          {{no}}
        </button>
        <button class="btn btn-primary btn-flat"
         @click="confirm">
          <slot name="yesIcon"></slot>
          {{yes}}
        </button>
      </div>
      <div class="confirm-dialog__notation"><!-- css trick
      --><slot name="notation"></slot></div>
    </div>
  </ModalDialog>
</template>

<style lang="less">
.confirm-dialog {
  &__notation {
    font-size: 10px;
    color: #999;
    margin-top: @indent-sm;

    &:empty {
      display: none;
    }
  }
}
</style>
