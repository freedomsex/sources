<script>
import ClosedActivity from '~closed-activity/ClosedActivity';

export default {
  extends: ClosedActivity,
};
</script>

<template>
  <ClosedActivity @close="close">
    <span slot="caption">Написать разработчикам</span>
    <div class="activity-section">
      Обсудить развитие можно на
      <a href="//freedomsex.info/" rel="nofollow" target="_blank">Форуме</a> или
      <a href="https://github.com/freedomsex/freedomsex/issues" rel="nofollow" target="_blank">GitHub</a>.
      Частные вопросы отправляйте по адресу <b>support@freedomsex.net</b>
      Если вы столкнулись с неполадками в работе сайта, пожалуйста,
      свяжитесь с нами.
    </div>

    <div class="activity-section">
      <div class="activity-section__title">Поддержка</div>
      <span class="activity-section__link" @click="$router.push('reviews')">
        Оставить отзыв или мнение о сайте</span>
      <span class="activity-section__link" @click="$router.push('question')">
        Задать вопрос, если нужна помощь</span>
    </div>

    <div class="activity-section__title">Обнаружив неполадку</div>
    <div class="activity-section">
      Очень важно описать возникшую проблему и <i>сообщить некоторые технические детали</i>,
      такие как: устройство, с которого вы используете сайт и браузер
      в котором открываете.
    </div>


  </ClosedActivity>
</template>

<style lang="less">
</style>
