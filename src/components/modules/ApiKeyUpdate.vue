<script>
export default {
  data() {
    return {
      attempt: 0,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    tick(delay) {
      setTimeout(() => {
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
      this.$store.dispatch('auth/UPDATE_KEY').then(({data}) => {
        if (!data.uid && data.reg) {
          this.noReg(data);
        } else {
          this.reload();
        }
      }).catch(() => {
        console.log('! Ошибка обновления ключа, инет есть?');
      });
    },
    noReg() {
      console.log('зарегистрирован / не авторизован');
    },
    upKey() {
      this.attempt = 0;
      this.tick(600);
    },
  },
};
</script>

<template>
  <div></div>
</template>

<style lang="less">
</style>
