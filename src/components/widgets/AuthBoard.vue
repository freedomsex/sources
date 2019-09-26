<script>
import _ from 'underscore';
import ConfirmDialog from '~dialogs/ConfirmDialog';
import SimpleCaptcha from '~dialogs/SimpleCaptcha';
import EmailSended from '~dialogs/EmailSended';

export default {
  data() {
    return {
      confirmSend: false,
      hint: 'Введите ваш емаил.',
      process: false,
      error: false,
      email: null,

      emailSended: false,

      captcha: {
        need: false,
        code: '',
        token: null,
      },
    };
  },
  mounted() {
    _.delay(this.sync, 3000);
  },
  computed: {
    promt() {
      return this.$store.state.auth.promt;
    },
    login() {
      return this.$store.getters['auth/login'];
    },
    password() {
      return this.$store.state.auth.password;
    },
    loaded() {
      return this.login && this.password;
    },
  },
  methods: {
    sync() {
      this.$service.run('email/check');
      this.$service.run('account/auth');

      // if (this.$store.state.authorized) {
      //   console.log('promted', this.$store.state.promt);
      //   this.$store.dispatch('auth/sync').then((data) => {
      //     this.$store.commit('promted', data.promt);
      //   });
      // }
    },
    send() {
      if (!this.email) {
        return;
      }
      this.process = true;
      const params = {
        email: this.email,
        token: this.captcha.token,
        code: this.captcha.code,
      };
      this.hint = this.$t('Отправляю...');
      this.$api.res('send', 'auth').post(params).then(({data}) => {
        this.hint = data.say;
        this.error = data.error;
        this.sended(data);
      });
    },
    sended(data) {
      this.process = false;
      if (!data.error) {
        this.emailSended = true;
        this.confirmSend = false;
        this.emit('close');
      }
      if (data.error == 'strict') {
        this.captcha.need = true;
      }
    },
    dialog() {
      this.email = this.$store.state.auth.email;
      this.confirmSend = true;
    },
    setToken(token) {
      this.captcha.token = token;
    },
    setCode(code) {
      this.captcha.code = code;
    },

    close() {
      this.captcha.need = false;
      this.confirmSend = false;
    },
  },
  components: {
    ConfirmDialog,
    EmailSended,
    SimpleCaptcha,
  },
};
</script>

<i18n>
{
  "ru": {
    "important": "Запомните или запишите ваш пароль.",
    "login": "Ваш логин",
    "password": "пароль",
    "send": "Отправить на почту",
    "confirm": "Логин и пароль будут отправлены на этот адрес. Подсказка с логином будет убрана.",
    "email": "Ваш емайл адрес",
    "hint": "Введите ваш емаил."
  },
  "en": {
    "important": "Remember or write down your password.",
    "login": "Your login",
    "password": "password",
    "send": "Send to email",
    "confirm": "Login and password will be sent to this address. The login prompt will be removed.",
    "email": "Your email address",
    "hint": "Enter your email address.",
    "Отправляю...": "Sending..."
  },
  "kz": {
    "important": "Құпия сөзіңізді есте сақтаңыз немесе жазыңыз.",
    "login": "Сіздің логиніңіз",
    "password": "құпия сөз",
    "send": "Хатқа жіберу",
    "confirm": "Бұл мекен-жайға логин мен пароль жіберіледі. Кіру сұрауы жойылады.",
    "email": "Электрондық пошта",
    "hint": "Электрондық пошта енгізіңіз.",
    "Отправляю...": "Жіберу..."
  },
  "ua": {
    "important": "Запам'ятайте або запишіть ваш пароль.",
    "login": "Ваш логін",
    "password": "пароль",
    "send": "Надіслати на пошту",
    "confirm": "Логін і пароль будуть відправлені на цю адресу. Підказка з логіном буде прибрана.",
    "email": "Ваш емайл адресу",
    "hint": "Введіть ваш емаил.",
    "Отправляю...": "Відправляю..."
  }
}
</i18n>

<template>
  <nav v-if="!promt">
    <div class="auth-board">
      <div v-show="!loaded">
        {{$t('important')}}
      </div>
      <transition name="auth-board">
        <div v-show="loaded">
          {{$t('login')}}: <b>{{login}}</b>
          {{$t('password')}}: <b>{{password}}</b>
          <div class="auth-board__splitter visible-xs"></div>
          <button class="btn btn-default btn-sm" @click="dialog()">
            {{$t('send')}}
          </button>
        </div>
      </transition>
    </div>


    <EmailSended @close="emailSended = false" v-if="emailSended"/>

    <ConfirmDialog v-if="confirmSend" yesText="Отправить"
     @confirm="send()" @close="close()">
      <div class="modal-dialog__section">
       {{$t('confirm')}}
      </div>
      <div class="modal-dialog__section">
        <div class="form-inline">
          <input class="form-control"
           type="email"
           name="email"
           v-model="email"
           :placeholder="$t('email')">
        </div>
      </div>

      <div class="activity-section" v-show="error && captcha.need" style="max-width: 270px;">
        <div class="activity-section__title">Код</div>
        <SimpleCaptcha ref="captcha" @token="setToken" @input="setCode"/>
      </div>

      <div class="modal-dialog__section" v-html="hint"></div>

      <span slot="yesIcon" class="glyphicon glyphicon-ok"></span>
    </ConfirmDialog>
  </nav>
</template>

<style lang="less">
.auth-board {
  background-color: @yellow-light;
  padding: @indent-sm @indent-md;
  border-bottom: 2px solid #faebcc;
  text-align: center;
  color: #8a6d3b;
  .btn {
    margin: -6px @indent-sm;
  }
  &__splitter {
    margin-bottom: @indent-sm;
  }
  .glyphicon {
    margin-right: @indent-sm;
  }
}

.auth-board-enter-active,
.snackbar-leave-active {
  transition: all 0.5s;
}
.auth-board-enter, .snackbar-leave-to /* .fade-leave-active для <2.1.8 */ {
  opacity: 0;
}
</style>
