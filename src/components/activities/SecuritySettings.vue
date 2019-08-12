<script>
import ModalDialog from '~dialogs/ModalDialog';
import ActivityActions from '~activities/ActivityActions';
import EmailSended from '~dialogs/EmailSended';
import ConfirmDialog from '~dialogs/ConfirmDialog';

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
      confirmSend: false,
      emailSensed: false,
      virgin: true,
    };
  },
  components: {
    ActivityActions,
    ModalDialog,
    EmailSended,
    ConfirmDialog,
  },
  computed: {
    login() {
      return this.$store.getters['auth/login'];
    },
    passwd() {
      return this.$store.state.auth.password;
    },
    email() {
      return this.$store.state.auth.email;
    },
    promt() {
      return this.$store.state.auth.promt;
    },
    subscr() {
      return !this.$store.state.auth.unsbcr;
    },
  },
  mounted() {
    this.$service.run('auth/syncData').then(() => {
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
        }).catch(() => {
          this.onError();
        });
    },
    saveEmail() {
      this.confirmSend = false;
      this.processEmail = true;
      this.$service.run('auth/saveEmail', this.inputEmail).then(() => {
        if (this.inputEmail) {
          this.emailSensed = true;
        }
        this.processEmail = false;
      }).catch(() => {
        this.onError();
      });
    },
    removeEmail() {
      this.confirmRemove = false;
      this.processEmail = true;
      this.$api.res('email/remove/request', 'mailer').post({email: this.email}).then(() => {
        this.emailSensed = true;
      }).catch(() => {
        this.onError();
      });
    },

    onError() {
      this.processEmail = false;
      this.$root.toast('Произошла ошибка');
    },
    saveSubscribe() {
      this.$service.run('auth/subscribe', this.checkSubscribe);
    },

    reSend() {
      if (this.email && this.inputEmail == this.email) {
        this.confirmSend = true;
      }
    },

    close() {
      if (!this.processLogin && !this.processPasswd && !this.processEmail) {
        this.$emit('close');
      } else {
        this.$emit('alert', 'Подождите, сохраняю.');
      }
    },
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
           @change="saveEmail()" @blur="reSend()"
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

    <EmailSended @close="emailSensed = false" v-if="emailSensed"/>


    <ConfirmDialog v-if="confirmSend" yesText="Отправить"
     @confirm="saveEmail()" @close="confirmSend = false">
      <div slot="title">Отправить новое письмо?</div>
      Ваш емаил не подтвержден. Следуйте инструкциям
      в письме которое было отправлено на ваш емаил.
      Отправить новое письмо?
    </ConfirmDialog>


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
