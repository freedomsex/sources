<script>
import ModalDialog from '~dialogs/ModalDialog';

export default {
  methods: {
    confirm() {
      this.$emit('confirm');
      this.$emit('close');
    },
  },
  components: {
    ModalDialog,
  },
};
</script>

<template>
  <ModalDialog @close="$emit('close')">
    <div class="dialog-caption">
      <div class="dialog-caption__title">Удобные знакомства</div>
      <div class="dialog-caption__option">
        <i class="material-icons" @click="$emit('close')">&#xE14C;</i>
      </div>
    </div>
    <div class="modal-dialog__wrapper capped">
      <div class="modal-dialog__section">
        Настройте знакомства для более комфортного общения.
        Нажмите "Настройки" или "Настроить поиск" чтобы уточнить ваши параметры.
        Неподходящие знакомства отмечаются особым образом.
      </div>
      <div class="modal-dialog__footer">
        <button class="btn btn-primary btn-fat" @click="confirm()">
          OK
        </button>
      </div>
    </div>
  </ModalDialog>
</template>

<style lang="less">
</style>
