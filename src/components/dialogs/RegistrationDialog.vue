<script>
import BlankDialog from '~dialogs/BlankDialog';
import InfoDialog from '~dialogs/InfoDialog';
import SimpleCaptcha from '~dialogs/SimpleCaptcha';

export default {
  props: ['sex', 'token'],
  data: () => ({
    process: true,
    success: false,
    strict: false,
    error: false,
    hint: '',

    captcha: {
      need: false,
      code: '',
      token: null,
    },
  }),
  components: {
    InfoDialog,
    BlankDialog,
    SimpleCaptcha,
  },
  mounted() {
    this.save();
  },
  methods: {
    save() {
      this.process = true;
      if (this.sex) {
        this.hint = 'Подготовка участника...';
        this.$service.run('account/registration', {token: this.token}).then((data) => {
          if (!data.error) {
            this.saveSex(data);
          } else {
            this.onError(data);
          }
        }).catch(() => {
          this.onError();
        });
      }
      // this.$refs.recaptcha.reset();
    },
    fallback() {
      this.process = true;
      this.error = false;
      const params = {
        sex: this.sex,
        token: this.captcha.token,
        code: this.captcha.code,
      };
      this.hint = 'Создание анкеты...';
      this.$service.run('account/fallback', params).then((data) => {
        if (!data.error) {
          this.strict = false;
          this.saveSex(data);
        } else {
          this.onError(data);
        }
      }).catch((error) => {
        this.onError();
        console.log('REEO fallback', error);
      });
    },

    saveSex(data) {
      this.$service.run('user/sex', {sex: this.sex, token: this.token}).catch(() => {
        this.onError();
        console.log('REEO saveSex');
      });
      this.handle(data);
    },

    handle(data) {
      this.process = false;
      // TODO: $root APP dependency $refs.authenticator
      if (!data.error) {
        this.$root.$refs.authenticator.reset();
        this.$service.run('auth/fix');
        this.$root.$refs.authboard.sync();
        this.$emit('finish');
      } else {
        //
      }
    },
    onError(data) {
      this.process = false;
      if (data) {
        const error = data.error || null;
        if (error) {
          if (error == 'strict') {
            this.strict = true;
          }
          this.hint = data.say;
        }
      }
      if (!data) {
        this.error = true;
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
  <div>

    <BlankDialog @close="$emit('close')" v-if="process">
      <span slot="title">Подготовка анкеты</span>
      Сейчас создается ваша анкета, для этого требуется несколько секунд.
      Иногда необходимо простое подтверждение. Всё бесплатно.
      <div class="body-spacer"></div>
      <span class="registration-state">
        {{hint}}
      </span>
    </BlankDialog>

    <InfoDialog :strict="true" v-else-if="strict"
      @close="$emit('close')" @confirm="fallback()" yesText="Продолжить">
      <span slot="title">Введите код</span>
      <div class="modal-dialog__section">
        Для продолжения регистрации введите код с картинки. Простая
        проверка и защита от ботов.
      </div>
      <SimpleCaptcha ref="captcha" @token="setToken" @input="setCode"/>
      <div class="modal-dialog__section">
        {{hint}}
      </div>
    </InfoDialog>

    <InfoDialog @close="error = false" v-else-if="error">
      <span slot="title">Что-то не так</span>
      Во время регистрации произошла ошибка. Возможно что-то с нашим сервером.
      Нам нужно время на устранение неисправности. Пожалуйста, попробуйте позже.
    </InfoDialog>
  </div>
</template>

<style lang="less">
.registration-state {
  color: @green-dark;
}
</style>
