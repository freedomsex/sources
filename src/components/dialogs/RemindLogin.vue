<script>
import ModalDialog from '~dialogs/ModalDialog';
import SimpleCaptcha from '~dialogs/SimpleCaptcha';
import EmailSended from './EmailSended';

export default {
  data() {
    return {
      email: '',
      hint: 'Введите ваш емайл',
      confirm: false,
      error: false,

      captcha: {
        need: false,
        code: '',
        token: null,
      },
    };
  },
  components: {
    ModalDialog,
    EmailSended,
    SimpleCaptcha,
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
      const params = {
        email: this.email,
        token: this.captcha.token,
        code: this.captcha.code,
      };
      this.hint = 'Отправляю...';
      this.$api.res('remind', 'auth').post(params).then(({data}) => {
        this.hint = data.say;
        this.error = data.error;
        this.sended(data);
      }).catch((error) => {
        this.hint = 'Ошибка отправки.';
        this.onError(error);
      });
    },
    sended(data) {
      if (!data.error) {
        this.hint = 'Успешно. Подождите.';
        this.confirm = true;
      }
      if (data.error == 'strict') {
        this.captcha.need = true;
      }
    },
    onError(error) {
      if (error.response) {
        const {status} = error.response;
        if (status == '404') {
          //
        }
      }
    },
    setToken(token) {
      this.captcha.token = token;
    },
    setCode(code) {
      this.captcha.code = code;
    },
  },
};
</script>

<template>
  <div class="">
    <ModalDialog @close="close" v-if="!confirm">
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

          <div class="activity-section" v-show="error && captcha.need" style="max-width: 270px;">
            <div class="activity-section__title">Код</div>
            <SimpleCaptcha ref="captcha"
            @token="setToken"
            @input="setCode"/>
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
    </ModalDialog>

    <EmailSended @close="$emit('close')" v-else/>
  </div>
</template>

<style lang="less">
.btn-fat {
  padding-left: @indent-xl;
  padding-right: @indent-xl;
}
</style>
