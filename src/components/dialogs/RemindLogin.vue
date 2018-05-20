<script>
import api from '~config/api';
import ModalDialog from '~dialogs/ModalDialog';
import EmailSended from './EmailSended';

export default {
  data() {
    return {
      email: '',
      hint: 'Введите ваш емайл',
      confirm: false,
    };
  },
  computed: {},
  methods: {
    close() {
      this.$emit('close');
    },
    send() {
      if (!this.email) {
        return;
      }
      this.hint = 'Отправляю...';
      api.user.post({email: this.email}, null, 'sync/remind').then((response) => {
        this.hint = response.data.say;
        this.error = response.data.err;
        this.sended();
      });
    },
    sended() {
      if (!this.error) {
        this.hint = 'Успешно. Подождите.';
        this.confirm = true;
      }
    },
  },
  components: {
    ModalDialog,
    EmailSended,
  },
};
</script>

<template>
  <ModalDialog @close="close">
    <div class="modal-dialog__wrapper">
      <div class="modal-dialog__caption">
        Восстановить пароль
      </div>
      <div class="modal-dialog__body">
        <div class="modal-dialog__section">
          Напоминание возможно только по подтвержденному вами
          ранее адресу электронной почты.
        </div>
        <div class="modal-dialog__section">
          <div class="form-inline">
            <input class="form-control"
             type="email"
             name="email"
             v-model="email"
             placeholder="Ваш емайл адрес">
          </div>
        </div>
        <div class="modal-dialog__section">
          {{hint}}
        </div>
      </div>
      <div class="modal-dialog__footer">
        <button class="btn btn-primary"
         @click="send"> Отправить </button>
      </div>
    </div>
    <EmailSended v-show="confirm"
     @close="$emit('close')"/>
  </ModalDialog>
</template>

<style lang="less">
.btn-fat {
  padding-left: @indent-xl;
  padding-right: @indent-xl;
}
</style>
