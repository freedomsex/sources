<script>
import SimpleCaptcha from './SimpleCaptcha';
import ModalDialog from '~dialogs/ModalDialog';

export default {
  components: {
    ModalDialog,
    SimpleCaptcha,
  },
  data() {
    return {
      code: '',
      captcha: false,
      token: null,
      error: false,
    };
  },
  methods: {
    close() {
      this.$emit('cancel');
    },
    send() {
      this.$emit('send', {
        token: this.token,
        code: this.code,
      });
      this.close();
    },

    setToken(token) {
      this.token = token;
    },
    setCode(code) {
      this.code = code;
    },
  },
};
</script>

<template>
  <ModalDialog @close="close">
    <div class="captcha-dialog__caption">
      Низкий кредит доверия
      <a href="http://docs.freedomsex.info/blog/#/Как-пользоваться/?id=Простая-проверка" target="_blank"
       aria-hidden="true" class="glyphicon glyphicon-info-sign"></a>
    </div>

    <div class="modal-dialog__wrapper capped">
      <SimpleCaptcha ref="captcha"
       @token="setToken"
       @input="setCode"/>

      <button class="btn btn-warning" @click="send">
        Отправить
      </button>
      <button class="btn btn-default" @click="$router.push('/credits')">
        Поднять доверие
      </button>
    </div>

  </ModalDialog>
</template>

<style lang="less">

#captcha-dialog {
  max-width: 400px;
}

.captcha-dialog__caption {
  background: @orange;
  color: @white;
  font-weight: bold;
  font-size: 16px;
  padding: @indent-sm @indent-md;
  vertical-align: middle;
  .glyphicon {
    float: right;
    color: @white;
    font-size: 20px;
    text-decoration: none;
  }
}

.captcha-dialog__body {
  padding: @indent-md @indent-md 0;
}

.captcha-dialog__option {
  padding: 0 @indent-md ;
  margin-top: @indent-md;
  text-align: right;
}

.captcha-dialog__addon {
  padding: 2px @indent-md;
  background: @white;
}
</style>
