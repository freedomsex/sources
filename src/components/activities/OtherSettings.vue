<script>
import ActivityActions from '~activities/ActivityActions';

export default {
  components: {
    ActivityActions,
  },
};
</script>

<template>
  <ActivityActions caption="Подробнее" type="wrapped" @close="$emit('close')">
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
      ID: {{$store.state.token.uid}}
    </div>
    <div class="activity-section">
      <span class="btn btn-primary" @click="$service.run('account/logout')">
        Выйти с сайта
      </span>
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
