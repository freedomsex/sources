<script>
import Vuex from 'vuex';
import api from '~config/api';
import ClosedActivity from '~closed-activity/ClosedActivity';
import RemindLogin from '~dialogs/RemindLogin';
import SimpleCaptcha from '~dialogs/SimpleCaptcha';

export default {
  props: [],
  data() {
    return {
      login: '',
      password: '',
      captcha: false,
      code: '',
      error: false,
      remind: false,
      hint: 'Введите данные',
    };
  },
  computed: Vuex.mapState({
    city(state) {
      return state.user.city;
    },
  }),
  mounted() {},
  methods: {
    close() {
      this.$emit('close');
    },
    send() {
      const data = {
        login: this.login,
        pass: this.password,
        captcha: this.code,
      };
      api.user.post(data, null, 'sync/login').then((response) => {
        this.hint = response.data.say;
        this.error = response.data.err;
        this.captcha = response.data.captcha;
        this.onLogin();
      });
    },
    onLogin() {
      this.$refs.captcha.update();
      if (!this.error) {
        this.hint = 'Успешно. Подождите.';
        window.location.href = '/';
      }
    },
    setCode(code) {
      this.code = code;
    },
  },
  components: {
    ClosedActivity,
    SimpleCaptcha,
    RemindLogin,
  },
};
</script>

<template>
  <ClosedActivity @close="close">
    <div class="activity-section">
      <div class="activity-section__title">Ваш логин</div>
      <div class="form-inline">
        <input class="form-control" type="text" v-model="login" placeholder="Введите логин">
      </div>
    </div>

    <div class="activity-section">
      <div class="activity-section__title">Пароль</div>
      <div class="form-inline">
        <input class="form-control" type="text" v-model="password" placeholder="Введите пароль">
      </div>
    </div>

    <div class="activity-section" v-show="error && captcha">
      <div class="activity-section__title">Код</div>
      <SimpleCaptcha ref="captcha" @input="setCode"/>
    </div>

    <div class="activity-section">
      <button class="btn btn-primary" @click="send"> Войти </button>
      <button class="btn btn-link" @click="remind = true"> Не помню </button>
    </div>

    <div class="activity-section">
      {{hint}}
    </div>
    <RemindLogin v-if="remind" @close="remind = false"/>
  </ClosedActivity>
</template>

<style lang="less">
</style>
