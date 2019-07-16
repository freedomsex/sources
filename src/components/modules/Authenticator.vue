<script>
import axios from 'axios';
import expunix from 'expires-unixtime';
import TTLColorBadge from '~modules/TTLColorBadge';
import ConfirmDialog from '~dialogs/ConfirmDialog';
import CONFIG from '~config/';
import cookies from '~assets/legacy/utils/cookies'; // TODO: remove
import api from '~config/api'; // TODO: remove

export default {
  data: () => ({
    left: 0,
    trigger: 600,
    attempt: 0,
    available: false,
    expired: true,
    authorized: true,
    skipError: false,
    process: false,

    fallback: true,
  }),
  components: {
    TTLColorBadge,
    ConfirmDialog,
  },
  mounted() {
    this.verify();
    this.timed();
    window.setInterval(this.timed, 3000);
    this.fix(); // TODO: Переписать API
  },
  computed: {
    token() {
      return this.$store.state.token.access;
    },
    fallbackSid() {
      return this.fallback ? cookies.get('sid') : null; // TODO: удалить через 2 месяца
    },
    stopped() {
      return this.attempt > 2;
    },
    needed() {
      return this.left < this.trigger;
    },
    alert() {
      // const {expires} = this.$store.state.token; // TODO: костыль
      return (!this.authorized || this.expired) && (this.available && this.stopped);
    },
  },
  methods: {
    // left() {
    //   const {expires} = this.$store.state.token;
    //   return expires && expunix.left(expires); // 3600...0
    // },
    // available() {
    //   const {refresh, created, lifetime} = this.$store.state.token;
    //   return (refresh && !expunix.exceeded(created, lifetime)) || this.fallbackSid;
    // },

    flash() {
      const {expires, refresh, created, lifetime} = this.$store.state.token;
      this.left = expires && expunix.left(expires); // 3600...0
      this.available = (refresh && !expunix.exceeded(created, lifetime)) || this.fallbackSid;
      this.expired = !this.$store.getters['token/auth']();
    },

    timed() {
      // const {created} = this.$store.state.token; // TODO: костыль
      // this.expired = this.$store.getters['token/auth'];
      this.flash();
      if (this.available) {
        // this.left = this.$store.getters['token/left'];
        if (this.needed && !this.stopped) {
          this.update();
        }
      }
    },
    verify() {
      if (!this.token) {
        this.update();
      }
    },
    refresh() {
      this.attempt = 0;
      return this.update();
    },
    update() {
      // HOT FIX
      const token = this.$store.state.token.refresh || this.fallbackSid;
      if (!token) {
        console.log('empty refresh_token');
        return Promise.resolve();
      }
      this.process = true;
      this.attempt += 1;
      return axios.post(`${CONFIG.API_AUTH}/api/v1/refresh`, {token}).then(({data}) => {
        this.$store.commit('token/save', data);
        this.attempt = 0;
        this.process = false;
        this.flash();
        this.fix(token); // TODO: Переписать API
      }).catch(({response}) => {
        this.error(response);
      }).finally(() => {
        this.process = false;
      });
    },

    error(response) {
      if (response) {
        console.log(response.status);
        if ([401, 400].indexOf(response.status) >= 0) {
          this.$store.commit('token/logout');
          this.fallback = false;
          this.skipError = true;
        }
      }
    },

    fix() { // TODO: Переписать API
      const {access, refresh} = this.$store.state.token;

      api.contacts.initial.setAuthKey(access); // TODO: Переписать API
      api.contacts.intimate.setAuthKey(access);// TODO: Переписать API

      api.user.setAuthKey(refresh);// TODO: Переписать API
      api.search.setAuthKey(refresh);// TODO: Переписать API
      api.bun.setAuthKey(refresh);// TODO: Переписать API
      api.messages.setAuthKey(refresh);// TODO: Переписать API
      api.moderator.setAuthKey(refresh);// TODO: Переписать API
      api.raw.setAuthKey(refresh);// TODO: Переписать API
    },
    unauthorized() {
      this.authorized = false;
    },
  },

  created() {
    global.addEventListener('focus', this.refresh);
  },
  destroyed() {
    global.removeEventListener('focus', this.refresh);
  },
};
</script>

<template>
  <div>
    <div class="authenticator" v-show="1 || auth && left">
      <TTLColorBadge @refresh="refresh" :left="left" :accent="trigger"/>
    </div>

    <ConfirmDialog v-if="!skipError && !process && alert"
     yesText="Обновить"
     @cancel="skipError = true"
     @confirm="$root.redirectHome()">
      <span slot="title">Что-то не так</span>
      Кажется нужно обновить страницу. Так бывает,
      если открыть страничку и продолжать читать новости.
      Ключ авторизации не найден или устарел.
    </ConfirmDialog>
  </div>
</template>

<style lang="less">
.authenticator {
  text-align: center;
  position: relative;
  margin: 0 10px;
  opacity: 0.5;
}
</style>
