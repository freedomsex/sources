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

<template>
  <nav>
    <div class="auth-board">
      <div v-show="!loaded">
        Запомните или запишите ваш пароль.
      </div>
      <transition name="auth-board">
        <div v-show="loaded">
          Ваш логин: <b>{{login}}</b> пароль: <b>{{password}}</b>
          <button class="btn btn-default btn-sm" @click="dialog()">
            Отправить на почту
          </button>
        </div>
      </transition>
    </div>

    <ConfirmDialog v-if="confirmSend" yesText="Отправить"
     @confirm="send()" @close="confirmSend = false">
      <div class="modal-dialog__section">
       Логин и пароль будут отправлены на этот адрес.
       Подсказака с логином будет убрана.
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
