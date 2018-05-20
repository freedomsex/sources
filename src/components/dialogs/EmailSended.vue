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
        Письмо отправлено
      </div>
      <div class="modal-dialog__body">
        <div class="modal-dialog__section">
          Доставка письма занимает от секунды до нескольких минут.
          Если письма долго нет - проверьте папку спам, особенно
          если ваша почта на «Gmail».
        </div>
        <div class="modal-dialog__section">
          <a href="/блог/восстановление-пароля/"
           target="_blank">Что делать если писимо не пришло &raquo;</a>
        </div>
      </div>
    </div>
  </ModalDialog>
</template>

<style lang="less">
</style>
