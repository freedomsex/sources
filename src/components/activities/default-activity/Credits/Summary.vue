<script>
import api from '~config/api';

import Tooltip from '~widgets/Tooltip';
import ConfirmDialog from '~dialogs/ConfirmDialog';
import VipStatus from '~components/VipStatus';
import Loadable from '~mixins/Loadable';
import Payments from './Payments';
import ActivityActions from '../../ActivityActions';

export default {
  mixins: [Loadable],
  data() {
    return {
      moderator: false,
      user: {
        vip: {
          status: 0,
          credits: 0,
        },
      },
    };
  },
  mounted() {
    this.loadStart();
    api.user.syncTrust().then(({data}) => {
      this.user.vip.status = data.status;
      this.user.vip.credits = data.credits;
      this.loadStop();
    });
  },
  computed: {
    // user() {
    //   return this.$store.state.user;
    // },
  },
  components: {
    ActivityActions,
    ConfirmDialog,
    Payments,
    Tooltip,
    VipStatus,
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
        У вас:
        <span v-if="this.labels.load">
          <i class="material-icons credit-counter__points">&#xE627;</i>
        </span>
        <span v-else>
          <b>{{user.vip.credits}}</b>
          <i class="material-icons credit-counter__points">&#xE83A;</i>
        </span>
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
        <span v-if="this.labels.load">Загружаю...</span>
        <VipStatus v-else-if="user.vip.status" :human="user" :text="true"/>
        <span v-else>Ваша анкета: обычная</span>
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
