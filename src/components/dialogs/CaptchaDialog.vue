<script>
import hasher from '~legacy/utils/simple-hash';
import ModalDialog from '~dialogs/ModalDialog';

export default {
  data() {
    return {
      code: '',
      inc: 0,
    };
  },
  computed: {
    src() {
      return `/secret_pic.php?inc=${this.inc}&hash=${hasher.random()}`;
    },
  },
  methods: {
    close() {
      this.$emit('cancel');
    },
    send() {
      this.$emit('send', this.code);
      this.update();
      this.close();
    },
    update() {
      this.inc += 1;
    },
  },
  components: {
    ModalDialog,
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
    <div class="captcha-dialog__body">
      <div class="human-dialog__desire">
        Введите код с картинки, чтобы продолжить
      </div>
      <div class="input-group" style="max-width: 300px;">
        <span class="captcha-dialog__addon input-group-addon captcha-img__addon">
          <span aria-hidden="true" class="glyphicon glyphicon-arrow-right"></span>
        </span>
        <span class="captcha-dialog__addon input-group-addon captcha-img__addon">
          <img class="form-message__captcha-img" :src="src" width="48" height="20" @click="update">
        </span>
        <input class="form-control"
         type="tel"
         inputmode="numeric"
         autocomplete="off"
         v-model="code">
      </div>
    </div>

    <div class="captcha-dialog__option">
      <button class="btn btn-default" @click="$router.push('/credits')">
        Поднять доверие
      </button>
      <button class="btn btn-warning" @click="send">
        Отправить
      </button>
    </div>

    <div class="human-dialog__form">

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
  .glyphicon {
    float: right;
    color: @white;
  }
}

.captcha-dialog__body {
  padding: @indent-md @indent-md 0;
}

.captcha-dialog__option {
  padding: @indent-md @indent-md 0;
  text-align: right;
}

.captcha-dialog__addon {
  padding: 2px @indent-md;
  background: @white;
}
</style>
