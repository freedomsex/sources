<script>
import InfoDialog from '~dialogs/InfoDialog';

export default {
  props: [],
  data: () => ({
    noItems: false,
  }),
  components: {
    InfoDialog,
  },
  computed: {
    count() {
      return this.$store.state.notice.list.length;
    },
    unread() {
      return this.$store.getters['notice/unread'];
    },
  },
  mounted() {
    setTimeout(this.load, 2000);
    setInterval(this.load, 600 * 1000);
  },
  methods: {
    load() {
      this.$service.run('notice/load');
    },
    route() {
      if (this.count) {
        this.$router.push('/notifications');
      } else {
        this.noItems = true;
      }
    },
  },
};
</script>

<template>
  <div class="notification-widget">
    <div class="header-bar__button" @click="route()">
      <div class="header-bar__icon">
        <i class="material-icons">&#xE7F4;</i>
        <span class="menu-user__status" v-if="unread"></span>
      </div>
    </div>

    <InfoDialog v-if="noItems" @close="noItems = false">
      <div slot="title">Уведомлений нет</div>
      Здесь будут информационные уведомления и
      уведомления от службы поддержки.
    </InfoDialog>
  </div>
</template>

<style lang="less">
.notification-widget {
  display: flex;
  align-items: center;
}
</style>
