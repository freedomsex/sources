<script>
export default {
  data: () => ({
    status: 0,
    delay: 5000,
    timer: 1000 * 60 * 15,
  }),
  mounted() {
    setTimeout(this.start, this.delay);
  },
  methods: {
    start() {
      this.check();
      setInterval(this.check, this.timer);
    },
    check() {
      if (this.$store.state.authorized) {
        this.handle();
      }
    },
    async handle() {
      const id = this.$store.state.token.uid;
      const {data} = await this.$api.res('user_statuses', 'a4sex').get({id});
      if (data && data.status) {
        this.status = data.status;
      }
    },
  },
};
</script>

<template>
  <div class="container ban-alert split-bottom" v-if="status === 8">
    <div class="ban-alert__title">Анкета заблокирована </div>
    <div>
      Ваша анкета была заблокирована системой безопасности. За нарушение правил, использование множества регистраций или средств анонимизации. Такие действия неотличимы от действий мошенников. Приобретение статуса анкеты защищает от автоматического блокирования. Администраторы уведомят вас, если вы нарушаете правила.
    </div>
    <div class="ban-alert__options">
      <a class="btn btn-default" href="http://docs.freedomsex.info/blog/#/Блокирование-анкеты" target="_blank">
        Что мне теперь делать?..
      </a>
    </div>
  </div>
</template>

<style lang="less">

.ban-alert {
  .widget();
  background: @pink;
  color: @dark;
  padding: @indent-md @indent-md @indent-md;
  border-bottom: 2px solid @pink-dark;
  border-top: 2px solid @pink-dark;

  &__title {
    font-size: @font-xl;
    text-transform: uppercase;
    margin-bottom: @indent-xs;
  }

  &__options {
    margin-top: @indent-sm;
  }
}
</style>
