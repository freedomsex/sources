<script>
import Vuex from 'vuex';
import ActivityActions from '../ActivityActions';

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
    ActivityActions,
  },
};
</script>

<template>
  <ActivityActions type="closed" @close="$emit('close')">
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
      <div class="activity-section__tile">
        <span class="activity-section__link" @click="$router.push('security')">
          Безопасность
        </span>
      </div>
      <div class="activity-section__tile">
        <span class="activity-section__link" @click="$router.push('desires')">
          Желания и фантазии
        </span>
      </div>
      <div class="activity-section__tile">
        <span class="activity-section__link" @click="$router.push('social')">
          Контакты, соцсети
        </span>
      </div>
      <div class="activity-section__tile">
        <span class="activity-section__link" @click="$router.push('about')">
          Анкетные данные
        </span>
      </div>
    </div>

    <div class="activity-section">
      <div class="activity-section__title">Поддержка</div>
      <div class="activity-section__tile">
        <span class="activity-section__link" @click="$router.push('reviews')">
          Оставить отзыв
        </span>
      </div>
      <div class="activity-section__tile">
        <span class="activity-section__link" @click="$router.push('question')">
          Задать вопрос
        </span>
      </div>
    </div>

    <div class="activity-section">
      <div class="activity-section__title">Аккаунт</div>
      ID: {{uid}}
    </div>
    <div class="activity-section">
      <span class="btn btn-primary" @click="logout">Выйти с сайта</span>
    </div>
    <div class="activity-section">
      <div class="activity-section__tile">
        <a class="activity-section__link"
        href="http://docs.freedomsex.info/blog/#/Как-пользоваться/?id=Удаление-анкеты"
        target="_blank">Удалить аккаунт</a>
      </div>
    </div>

  </ActivityActions>
</template>

<style lang="less">
</style>
