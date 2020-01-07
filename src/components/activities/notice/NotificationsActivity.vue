<script>
import ActivityActions from '~activities/ActivityActions';
import BigIconPlaceholder from '~widgets/BigIconPlaceholder';
import NoticeList from './NoticeList';

export default {
  data() {
    return {
      //
    };
  },
  mounted() {
    // console.log('length', this.list.length);
  },
  computed: {
    list() {
      return this.$store.state.notice.list;
    },
    empty() {
      return !this.list.length;
    },
    unread() {
      return this.$store.getters['notice/unread'];
    },
  },
  methods: {
    //
  },
  components: {
    ActivityActions,
    BigIconPlaceholder,
    NoticeList,
  },
};
</script>

<template>
  <ActivityActions caption="Уведомления" @close="$emit('close')">

    <template slot="option">
      <div class="header-bar__button" @click="$router.push('/feedback')">
        <i class="material-icons">&#xE15E;</i>
        <span class="header-bar__title">
          Ответить
        </span>
      </div>
    </template>

    <div class="activity-section" v-if="!empty">
      <NoticeList :list="list"/>
    </div>
    <BigIconPlaceholder icon="&#xE156;" :text="$t('Уведомлений нет')" v-else>
      Здесь будут информационные уведомления и
      уведомления от службы поддержки.
    </BigIconPlaceholder>
  </ActivityActions>
</template>

<style lang="less">

</style>
