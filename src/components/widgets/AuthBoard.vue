<script>
import _ from 'underscore';
import ModalDialog from '~dialogs/ModalDialog';

export default {
  data() {
    return {
      confirmSend: false,
      hint: 'Введите ваш емаил.',
      process: false,
      email: '',
    };
  },
  mounted() {
    _.delay(() => {
      this.$store.dispatch('auth/sync').then(() => {
        this.email = this.$store.state.auth.email;
      }).catch(() => {
        console.log('! Авторизация провалена');
      });
    }, 2500);
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
      this.hint = 'Отправляю...';
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
  },
  components: {
    ModalDialog,
  },
};
</script>

<template>
  <div>
    <div class="auth-board">
      <div v-show="!loaded">
        Запомните или запишите ваш пароль.
      </div>
      <transition name="auth-board">
        <div v-show="loaded">
          Ваш логин: <b>{{login}}</b> пароль: <b>{{password}}</b>
          <button class="btn btn-default btn-sm" @click="confirmSend = true">
            Отправить на почту
          </button>
        </div>
      </transition>
    </div>

    <ModalDialog @close="confirmSend = false" v-if="confirmSend">
      <div class="modal-dialog__wrapper">
        <div class="modal-dialog__body">
          <div class="modal-dialog__section">
          Логин и пароль будут отправлены на этот адрес. Подсказака с логином будет убрана.
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
          <button class="btn btn-default" @click="confirmSend = false">
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
            Закрыть
          </button>
          <button class="btn btn-primary" @click="send()">
            <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
            Отправить
          </button>
        </div>
      </div>
    </ModalDialog>
  </div>
</template>

<style lang="less">
.auth-board {
  background-color: @yellow-light;
  padding: @indent-sm @indent-md;
  border-bottom: 2px solid #faebcc;
  text-align: center;
  color: #8a6d3b;
  .btn {
    margin: -6px 0;
    margin-left: @indent-sm;
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
