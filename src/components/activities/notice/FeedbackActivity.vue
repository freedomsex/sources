<script>
import ActivityActions from '~activities/ActivityActions';
import BigIconPlaceholder from '~widgets/BigIconPlaceholder';
import FeedbackDialog from '~halves/FeedbackDialog';

export default {
  components: {
    ActivityActions,
    BigIconPlaceholder,
    FeedbackDialog,
  },
  data() {
    return {
      dialog: false,
    };
  },
  mounted() {
    this.load();
  },
  computed: {
    list() {
      return this.$store.state.feedback.list;
    },
    empty() {
      return !this.list.length;
    },
  },
  methods: {
    load() {
      this.$service.run('feedback/load');
    },
  },
};
</script>

<template>
  <ActivityActions caption="Ваши ответы" @close="$emit('close')">

    <template slot="option">
      <div class="header-bar__button" @click="dialog = true">
        <i class="material-icons">&#xE145;</i>
        <span class="header-bar__title">
          Добавить
        </span>
      </div>
    </template>

    <div class="activity-section" v-if="!empty">
      <div class="feedback-list">
        <div class="feedback-list__item" v-for="item in list" @click="">
         {{item.message}}
       </div>
      </div>
    </div>

    <BigIconPlaceholder icon="&#xE15E;" :text="$t('Список пуст')" v-else>
      Ваши ответы на уведомления. Аргументы, пояснения,
      дополнительная информация.
    </BigIconPlaceholder>

    <FeedbackDialog @close="dialog = false" v-if="dialog"/>

  </ActivityActions>
</template>

<style lang="less">
.feedback-list {
  &__item {
    .list-item();
  }
}
</style>
