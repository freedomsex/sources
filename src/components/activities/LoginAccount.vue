<script>
import RemindLogin from '~dialogs/RemindLogin';
import SimpleCaptcha from '~dialogs/SimpleCaptcha';
import ActivityActions from '~activities/ActivityActions';
import ConfirmDialog from '~dialogs/ConfirmDialog';

export default {
  props: [],
  data() {
    return {
      key: false,
      login: '',
      password: '',
      captcha: false,
      code: '',
      refresh: '',
      token: null,
      error: false,
      remind: false,
      hint: 'Введите данные',
    };
  },
  mounted() {
    this.refresh = this.$store.state.token.refresh;
  },
  methods: {
    send() {
      const payload = {
        login: this.login,
        password: this.password,
        token: this.token,
        code: this.code,
        refresh: this.$store.state.token.refresh,
      };
      this.$api.res('login', 'auth').post(payload).then(({data}) => {
        this.onLogin(data);
      });
    },
    onLogin(data) {
      this.hint = data.say;
      this.captcha = data.strict;
      if (data && !data.error) {
        this.hint = 'Успешно. Подождите.';
        this.$store.commit('token/save', data);
        window.location.href = '/';
      } else {
        this.error = data.error;
        this.$refs.captcha.refresh();
      }
    },
    setToken(token) {
      this.token = token;
    },
    setCode(code) {
      this.code = code;
    },
    setKey() {
      if (this.refresh) {
        this.$store.commit('token/refreshToken', this.refresh);
      }
    },
  },
  components: {
    ActivityActions,
    SimpleCaptcha,
    RemindLogin,
    ConfirmDialog,
  },
};
</script>

<template>
  <ActivityActions caption="Войти" type="wrapped" @close="$emit('close')">

    <template slot="option">
      <div class="header-bar__button" @click="key = true">
        <i class="material-icons">&#xE899;</i>
        <span class="header-bar__title">
          Ключ
        </span>
      </div>
    </template>

    <ConfirmDialog v-if="key" @confirm="setKey()" @close="key = false"
     yesText="Сохранить" noText="Отмена">
      <span slot="title">Ключ авторизации</span>
        Внимание! Никогда и никому не передавайте его ни при каких обстоятельствах.
        Ни администрации, ни разработчикам, ни собеседнику.

        <div class="body-spacer"></div>
        <textarea placeholder="Введите ключ" v-model="refresh"></textarea>

        <div class="body-spacer"></div>
        <a href="https://freedomsex.info/t/sexoo-osex-vosstanovit-dostup/2418" target="_blank">Как найти мой ключ...</a>
    </ConfirmDialog>

    <div class="limited-form">
      <div class="activity-section">
        <div class="activity-section__title">Ваш логин</div>
          <input class="form-control" type="text" v-model="login" placeholder="Введите логин">

      </div>

      <div class="activity-section">
        <div class="activity-section__title">Пароль</div>
        <div class="form-group">
          <input class="form-control" type="text" v-model="password" placeholder="Введите пароль">
        </div>
      </div>

      <div class="activity-section" v-show="error && captcha">
        <div class="activity-section__title">Код</div>
        <SimpleCaptcha ref="captcha"
         @token="setToken"
         @input="setCode"/>
      </div>
    </div>


    <div class="activity-section">
      <button class="btn btn-primary" @click="send"> Войти </button>
      <button class="btn btn-link" @click="remind = true"> Не помню </button>
    </div>

    <div class="activity-section">
      {{hint}}
    </div>
    <RemindLogin v-if="remind" @close="remind = false"/>
  </ActivityActions>
</template>

<style lang="less">
</style>
