<script>
import Vuex from 'vuex';
import ModalDialog from '~dialogs/ModalDialog';
import ActivityActions from '~activities/ActivityActions';

export default {
  props: [],
  data() {
    return {
      inputLogin: '',
      inputPasswd: '',
      inputEmail: '',
      checkSubscribe: 0,
      process: false,
      processLogin: false,
      processPasswd: false,
      processEmail: false,
      confirmRemove: false,
      virgin: true,
    };
  },
  computed: Vuex.mapState({
    login(state) {
      return state.auth.login;
    },
    passwd(state) {
      return state.auth.pass;
    },
    email(state) {
      return state.auth.email;
    },
    promt(state) {
      return state.auth.promt;
    },
    subscr(state) {
      return state.auth.subscr;
    },
  }),
  mounted() {
    this.$store.dispatch('auth/sync').then(() => {
      this.init();
      this.process = false;
    }).catch(() => {
      this.process = false;
    });
    this.process = true;
    this.init();
  },
  methods: {
    init() {
      this.inputLogin = this.login;
      this.inputPasswd = this.passwd;
      this.inputEmail = this.email;
      this.checkSubscribe = this.subscr;
    },
    deflower() {
      this.virgin = false;
    },
    saveLogin() {
      this.processLogin = true;
      this.$store
        .dispatch('auth/SAVE_LOGIN', this.inputLogin)
        .then(({data}) => {
          if (data.say) {
            this.$emit('warning', data.say);
          }
          this.processLogin = false;
        })
        .catch(() => {
          this.processLogin = false;
        });
    },
    savePasswd() {
      this.processPasswd = true;
      this.$store
        .dispatch('auth/SAVE_PASSWD', this.inputPasswd)
        .then(({data}) => {
          if (data.say) {
            this.$emit('warning', data.say);
          }
          this.processPasswd = false;
        })
        .catch(() => {
          this.processPasswd = false;
        });
    },
    saveEmail() {
      this.processEmail = true;
      this.$store
        .dispatch('auth/SAVE_EMAIL', this.inputEmail)
        .then(({data}) => {
          if (data.err) {
            this.$emit('warning', data.say);
          }
          this.processEmail = false;
        })
        .catch(() => {
          this.processEmail = false;
        });
    },
    removeEmail() {
      this.confirmRemove = false;
      this.processEmail = true;
      this.$store
        .dispatch('auth/REMOVE_EMAIL')
        .then(({data}) => {
          if (data.err) {
            this.$emit('warning', data.say);
          }
          this.processEmail = false;
        })
        .catch(() => {
          this.processEmail = false;
        });
    },
    saveSubscribe() {
      this.$store.dispatch('auth/SAVE_SUSCRIBE');
    },
    close() {
      if (!this.processLogin && !this.processPasswd && !this.processEmail) {
        this.$emit('close');
      } else {
        this.$emit('alert', 'Подождите, сохраняю.');
      }
    },
  },
  components: {
    ActivityActions,
    ModalDialog,
  },
};
</script>

<template>
  <ActivityActions caption="Безопасность" type="wrapped" @close="close">
    <div class="activity-section">
      <div class="activity-section__title">Логин:</div>
      <div class="form-inline">
          <input class="form-control" type="text"
           v-model="inputLogin"
           @change="saveLogin"
           :disabled="process || processLogin">
      </div>
    </div>
    <div class="activity-section">
      <div class="activity-section__title">Пароль:</div>
      <div class="form-inline">
        <input class="form-control" type="text"
         v-model="inputPasswd"
         @change="savePasswd"
         :disabled="process || processPasswd">
      </div>
    </div>
    <div class="activity-section">
      <div class="activity-section__title">Емаил:</div>
      <div class="form-inline">
        <label @click="promt ? confirmRemove = true : false">
          <input class="form-control" type="text" v-model="inputEmail"
           @change="saveEmail"
           :disabled="process || promt || processEmail">
        </label>
      </div>
    </div>
    <div class="activity-section">
      <div class="activity-section__title">Уведомления:</div>
      <div class="radio">
        <label class="radio-inline">
          <input type="radio" id="input-subscribe"
           v-model="checkSubscribe"
           :value="true"
           @change="saveSubscribe"
           :disabled="process || !promt || !email">
          Принимать
        </label>
        <label class="radio-inline">
          <input type="radio" id="input-subscribe"
           v-model="checkSubscribe"
           :value="false"
           @change="saveSubscribe"
           :disabled="process || !promt || !email">
          Отклонить
        </label>
      </div>
    </div>
    <div class="activity-section" v-if="login">
      <div v-if="!email">
        Мгновенные уведомления на емайл. Укажите ваш адрес
        электронной почты для восстановления пароля
        и получения уведомлений.
      </div>
      <div v-else-if="!promt">
        Емайл необходимо подтвердить. Простые инструкции высланы
        в письме на указанный вами адрес электронной почты.
      </div>
    </div>

    <ModalDialog @close="confirmRemove = false" v-if="confirmRemove">
      <div class="modal-dialog__wrapper">
        <div class="modal-dialog__body">
          Ваш емаил подтвержден. Пожалуйста, подтвердите удаление
          и следуйте инструкциям
          в письме которое будет отправлено на ваш емаил.
        </div>
        <div class="modal-dialog__footer">
          <button class="btn btn-default" @click="confirmRemove = false">
            Отмена
          </button>
          <button class="btn btn-danger" @click="removeEmail">
            <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
            Удалить
          </button>
        </div>
      </div>
    </ModalDialog>
  </ActivityActions>
</template>

<style lang="less">
</style>
