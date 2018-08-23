<script>
import _ from 'underscore';
import ConfirmDialog from '~dialogs/ConfirmDialog';

export default {
  data() {
    return {
      confirmSend: false,
      hint: 'Введите ваш емаил.',
      process: false,
      email: null,
    };
  },
  mounted() {
    _.delay(() => { this.$store.dispatch('auth/sync'); }, 2500);
  },
  computed: {
    login() {
      return this.$store.state.auth.login;
    },
    password() {
      return this.$store.state.auth.pass;
    },
    loaded() {
      return this.login && this.password;
    },
  },
  methods: {
    send() {
      if (!this.email) {
        return;
      }
      this.process = true;
      this.hint = this.$t('Отправляю...');
      this.$store.dispatch('auth/SAVE_EMAIL', this.email).then((response) => {
        this.hint = response.data.say;
        this.error = response.data.err;
        this.sended();
      });
    },
    sended() {
      this.process = false;
      if (!this.error) {
        this.emit('close');
      }
    },
    dialog() {
      this.email = this.$store.state.auth.email;
      this.confirmSend = true;
    },
  },
  components: {
    ConfirmDialog,
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
  <nav>
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

    <ConfirmDialog v-if="confirmSend" yesText="Отправить"
     @confirm="send()" @close="confirmSend = false">
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
      <div class="modal-dialog__section" v-html="$t('hint')"></div>

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
