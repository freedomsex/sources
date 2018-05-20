<script>
import Vuex from 'vuex';
import ClosedActivity from '~closed-activity/ClosedActivity';

export default {
  props: [],
  data() {
    return {};
  },
  computed: Vuex.mapState({
    uid() {
      return this.$store.state.user.uid;
    },
  }),
  methods: {
    close() {
      this.$emit('close');
    },
    logout() {
      window.location = '/logout.php';
    },
  },
  components: {
    ClosedActivity,
  },
};
</script>

<template>
  <ClosedActivity @close="close">
<!--
    <div class="activity-section">
      <div class="activity-section__title">Статус анкеты</div>
      Обычный
      <span class="link_simple" @click="$emit('security')">Изменить</span>
    </div>

    <div class="activity-section">
      <div class="activity-section__title">Кредиты доверия</div>
      <span class="link_simple" @click="$emit('security')">Получить</span>
    </div>
 -->
    <div class="activity-section">
      <div class="activity-section__title">Настройки</div>
        <span class="activity-section__link"
         @click="$router.push('security')">Безопасность</span>
        <span class="activity-section__link"
         @click="$router.push('desires')">Желания и фантазии</span>
        <span class="activity-section__link"
         @click="$router.push('social')">Контакты, соцсети</span>
        <span class="activity-section__link"
         @click="$router.push('about')">Анкетные данные</span>
    </div>

    <div class="activity-section">
      <div class="activity-section__title">Поддержка</div>
      <span class="activity-section__link"
       @click="$router.push('reviews')">Оставить отзыв</span>
      <span class="activity-section__link"
       @click="$router.push('question')">Задать вопрос</span>
    </div>

    <div class="activity-section">
    </div>


    <div class="activity-section">
      <div class="activity-section__title">Аккаунт</div>
      ID: {{uid}}
    </div>
    <div class="activity-section">
      <span class="btn btn-primary" @click="logout">Выйти с сайта</span>
    </div>
    <div class="activity-section">
      <a class="activity-section__link"
       href="/блог/удаление-анкет-автоматическое/"
       target="_blank">Удалить аккаунт</a>
    </div>

  </ClosedActivity>
</template>

<style lang="less">
</style>
