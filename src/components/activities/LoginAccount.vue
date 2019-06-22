<script>
import Vuex from 'vuex';
import api from '~config/api';
import RemindLogin from '~dialogs/RemindLogin';
import SimpleCaptcha from '~dialogs/SimpleCaptcha';
import ActivityActions from '~activities/ActivityActions';

export default {
  props: [],
  data() {
    return {
      login: '',
      password: '',
      captcha: false,
      code: '',
      token: null,
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
    send() {
      const data = {
        login: this.login,
        pass: this.password,
        token: this.token,
        code: this.code,
      };
      api.user.post(data, null, 'sync/login').then((response) => {
        this.hint = response.data.say;
        this.error = response.data.err;
        this.captcha = response.data.captcha;
        this.onLogin();
      });
    },
    onLogin() {
      if (!this.error) {
        this.hint = 'Успешно. Подождите.';
        window.location.href = '/';
      } else {
        this.$refs.captcha.refresh();
      }
    },
    setToken(token) {
      this.token = token;
    },
    setCode(code) {
      this.code = code;
    },
  },
  components: {
    ActivityActions,
    SimpleCaptcha,
    RemindLogin,
  },
};
</script>

<template>
  <ActivityActions type="wrapped" @close="$emit('close')">
    <span slot="caption">Войти</span>
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
