<script>
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
  },
  components: {
    ActivityActions,
    SimpleCaptcha,
    RemindLogin,
  },
};
</script>

<template>
  <ActivityActions caption="Войти" type="wrapped" @close="$emit('close')">
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
