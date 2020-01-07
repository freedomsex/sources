<script>
import JWTDecode from 'jwt-decode';
import BlankDialog from '~dialogs/BlankDialog';
import InfoDialog from '~dialogs/InfoDialog';
import SimpleCaptcha from '~dialogs/SimpleCaptcha';

export default {
  props: ['sex'],
  data: () => ({
    process: true,
    strict: false,
    error: false,
    status: '',

    time: null,
    temer: null,

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
    if (this.sex) {
      this.start();
    }
  },
  methods: {
    recaptcha(action) {
      return global.recaptcha.execute3v(action).then(token => token);
    },

    start() {
      this.process = true;
      this.status = 'Подождите...';
      this.recaptcha('registration').then((token) => {
        this.$api.res('registration/start', 'auth').post({token}).then(({data}) => {
          this.retry(data.time_token);
        });
      });
    },

    retry(token) {
      const payload = JWTDecode(token);
      this.hold(payload.time, token);
      this.time = payload.time;
      this.timer = setInterval(() => {
        this.time -= 1;
      }, 1000);
    },

    hold(time, token) {
      this.status = 'Подготовка участника';
      setTimeout(() => {
        this.token(token);
        this.time = null;
        clearInterval(this.timer);
      }, time * 1000);
    },

    token(token) {
      this.process = true;
      this.$api.res('registration/token', 'auth').post({time_token: token}).then(({data}) => {
        if (data.retry) {
          this.retry(data.retry);
        } else {
          this.registration(data);
        }
      });
    },

    registration({token, tokenId}) {
      this.process = true;
      this.status = 'Создание анкеты...';
      this.$service.run('account/registration', {token, tokenId}).then((data) => {
        if (!data.error) {
          this.saveSex(data);
        } else {
          this.onError(data);
        }
      }).catch(() => {
        this.onError();
      });
    },

    fallback() {
      this.process = true;
      this.error = false;
      const params = {
        token: this.captcha.token,
        code: this.captcha.code,
      };
      // this.status = 'Создание анкеты...';
      this.$service.run('account/fallback', params).then((data) => {
        if (!data.error) {
          this.strict = false;
          this.saveSex(data);
        } else {
          this.onError(data);
        }
      }).catch(() => {
        this.onError();
      });
    },

    saveSex(data) {
      this.$service.run('user/sex', {sex: this.sex, token: this.token}).catch(() => {
        this.onError();
      });
      this.handle(data);
    },

    handle(data) {
      this.process = false;
      // TODO: $root APP dependency $refs.authenticator
      if (!data.error) {
        this.$root.$refs.authenticator.reset();
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
      <span class="registration-state text-muted">
        {{status}}
        <span v-show="time">
          <span v-if="time < 5">...</span>
          <span v-else>({{time}})</span>
        </span>
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
        {{status}}
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
