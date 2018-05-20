<script>
import ModalDialog from '~dialogs/ModalDialog';

export default {
  components: {
    ModalDialog,
  },
};
</script>

<template>
  <div>
    <ModalDialog @close="$emit('close')">
      <div class="modal-dialog__wrapper">
        <div class="modal-dialog__caption">
          Комфортное начало
        </div>
        <div class="modal-dialog__body">
          Используйте шаблоны из блокнота или простые фразы.
          Избегайте рассылок, используйте как можно меньше цифр в первых сообщениях.
          Любые ссылки, номера телефонов и логины соцсетей расцениваются как спам.
        </div>
      </div>
    </ModalDialog>
  </div>
</template>

<style lang="less">
</style>
