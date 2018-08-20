<script>
import ConfirmDialog from '~dialogs/ConfirmDialog';

export default {
  data() {
    return {
      attempt: 0,
      timer: null,
      authorized: true,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    tick(delay) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.load();
      }, 1000 * delay);
    },
    reload() {
      let delay = 1;
      if (this.attempt >= 10) {
        delay = 300;
      } else if (this.attempt >= 5) {
        delay = 5;
      } else if (this.attempt >= 2) {
        delay = 3;
      }
      this.attempt += 1;
      this.tick(delay);
    },
    load() {
      return this.$store.dispatch('auth/UPDATE_KEY').then(({data}) => {
        if (data.uid || data.reg) {
          this.$store.commit('resetUser', data);
          this.$store.commit('search/restore', data);
          this.$store.dispatch('LOAD_API_TOKEN');
          this.next();
        } else {
          this.reload();
        }
        if (!data.uid && data.reg) {
          this.noReg(data);
        }
      });
      // console.log('KEY LOAD');
    },
    noReg() {
      console.log('зарегистрирован / не авторизован');
    },
    upKey() {
      this.load();
      this.next();
    },
    next(delay = 600) {
      this.attempt = 0;
      this.tick(delay);
    },
    error() {
      this.authorized = false;
    },
  },
  components: {
    ConfirmDialog,
  },
};
</script>

<template>
  <div>
    <ConfirmDialog v-if="!authorized"
     yesText="Обновить"
     @cancel="authorized = true"
     @confirm="$root.redirectHome()">
      <span slot="title">Что-то не так</span>
      Кажется нужно обновить страницу. Так бывает,
      если открыть страничку и продолжать читать новости.
      Ключ авторизации не найден или устарел.
    </ConfirmDialog>
  </div>
</template>
