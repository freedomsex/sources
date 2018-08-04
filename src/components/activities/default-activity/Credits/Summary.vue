<script>
import Tooltip from '~widgets/Tooltip';
import ConfirmDialog from '~dialogs/ConfirmDialog';
import Payments from './Payments';
import ActivityActions from '../../ActivityActions';

export default {
  data() {
    return {
      moderator: false,
    };
  },
  components: {
    ActivityActions,
    ConfirmDialog,
    Payments,
    Tooltip,
  },
};
</script>

<template>
  <ActivityActions type="wrapped" @close="$emit('close')">
    <span slot="caption">Доверие</span>

    <!-- <template slot="option">
      <div class="menu-button" @click="edited = (edited !== true)">
        <i class="material-icons" v-if="!edited">&#xE254;</i>
        <i class="material-icons" v-else>&#xE876;</i>
      </div>
    </template> -->

    <div class="activity-section">
      Кредиты доверия позволяют проходить все проверки
      автоматически, без каких либо действий с вашей стороны.
    </div>

    <div class="activity-section">
      <div class="activity-section__title">
        Кредиты доверия
      </div>
      <div class="activity-section__tile">
        У вас: 0
        <i class="material-icons credit-counter__points">&#xE83A;</i>
      </div>

      <div class="activity__splitter"></div>

      <Payments action="enpay"
       product="credits"
       button="primary"
       text="Получить за 1$">
      </Payments>
      <span class="btn btn-default"
        @click="moderator = true">
        Бесплатно
      </span>
      <!-- <span class="btn btn-primary">Получить</span> -->
    </div>

    <ConfirmDialog v-if="moderator"
     yesText="Продолжить"
     @confirm="$router.push('/protect')"
     @close="moderator = false">
      Станьте модератором и получайте
      кредиты доверия бесплатно. Кредиты начисляются
      за правильные действия в интерфейсе безопасности.
    </ConfirmDialog>

    <div class="activity-section">
      <div class="activity-section__title">
        Статус анкеты
        <Tooltip>
          Статус анкеты выделяет вас в результатах поиска
          и в отображается вашей анкете.
          Кредиты доверия пополняются каждый день бесплатно.
        </Tooltip>
      </div>
      <div class="activity-section__tile">
        Ваша анкета: обычная
      </div>

      <div class="activity__splitter"></div>
      <span class="btn btn-default" @click="$router.push('/trust')">
        Поднять статус
      </span>
    </div>

    <div class="activity-section">

    </div>

  </ActivityActions>
</template>

<style lang="less">
.credit-counter {
  &__points {
    color: @gray-dark;
    font-size: 14px;
    position: relative;
    top: 2px;
  }
}

</style>
