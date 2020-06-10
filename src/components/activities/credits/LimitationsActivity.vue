<script>
import ActivityActions from '~activities/ActivityActions';

export default {
  props: [],
  data: () => ({

  }),
  components: {
    ActivityActions,
  },
};
</script>

<template>
  <ActivityActions caption="Ограничения" type="wrapped" @close="$emit('close')">

    <div class="activity-section">
      <b>Тема секса всегда привлекает мошенников и проституток стремящихся заработать на
      желании или доверчивости наивных парней</b>. К сожалению, без ограничений сайт заполонят
      эти самые мошенники и проститутки.
    </div>

    <div class="activity-section">
      <div class="activity-section__title">
        Подтверждение отправки сообщения
      </div>
      <div class="activity-section__tile">
        Иногда вам приходится вводить код подтверждения отправки.
        Это бесплатная и стандартная защита от автоматической отправки сообщений ботами.
      </div>
    </div>

    <div class="activity-section">
      <div class="activity-section__title">
        Ожидание кода проверки
      </div>
      <div class="activity-section__tile">
        При нескольких нарушениях правил подряд, или нескольких повторных
        подверждений, получение кода замедляется. Код также приходит бесплатно, но его приходится дольше ждать.
      </div>
    </div>

    <div class="activity-section">
      <div class="activity-section__title">
        Строгие правила сайта
      </div>
      <div class="activity-section__tile">
        Любые нарушения правил приводят к необходимости дополнительных подтверждений.
        Ожидания кодов могут быть значительными. Анкеты блокируются за нарушение правил, в том числе автоматически.
      </div>
    </div>


    <div class="activity-section">
      <button class="btn btn-primary btn-lg btn-block" @click="$router.push('/trust')">
        Поднять статус анкеты
      </button>
    </div>


    <div class="activity-section">
      <div class="activity-section__tile">
        Для противодействия мошенникам, нам приходится вводить всё больше и больше ограничений. Единственная
        возможность анонимно верифицировать ваши намерения соблюдать правила, приобретение Статуса анкеты.
      </div>
      <div class="activity-section__tile">
        <b>Статус анкеты защищает от блокирования</b> и дает необходимое количество Кредитов доверия для прохождения всех проверок
        автоматически. Кредиты доверия можно приобретать отдельно, но это не защищает от блокирования анкеты.
      </div>
      <div class="activity-section__tile">
        <b>Строгое соблюдение правил необходимо только при БЕСПЛАТНОМ доступе к сайту.
        Статус анкеты снижает необходимость соблюдения правил до уровня соблюдения законов вашей страны.</b>
      </div>
    </div>

    <div class="activity-section">
      <button class="btn btn-default btn-lg btn-block" @click="$router.push('/credits')">
        Получить Бесплатно
      </button>
    </div>

  </ActivityActions>
</template>

<style lang="less">

</style>
