<script>
import expunix from 'expires-unixtime';
import TTLColorBadge from '~modules/TTLColorBadge';
import ConfirmDialog from '~dialogs/ConfirmDialog';
import cookies from '~assets/legacy/utils/cookies'; // TODO: remove

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
      this.expired = !this.$store.state.authorized;
      // console.log('flash', {expires, refresh, created, lifetime});
    },

    timed() {
      this.$service.run('auth/tick');
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

    reset() {
      this.attempt = 0;
      this.process = false;
      this.flash();
    },

    refresh() {
      this.reset();
      return this.update();
    },
    update() {
      this.process = true;
      this.attempt += 1;
      return this.$service.run('auth/refresh').then(() => {
        this.reset();
      })
        .finally(() => {
          this.process = false;
        });
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
