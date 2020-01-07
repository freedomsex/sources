<script>
import VipStatus from '@freedomsex/account-component/VipStatus';
import ActivityActions from '~activities/ActivityActions';
import Tooltip from '~widgets/Tooltip';
import ConfirmDialog from '~dialogs/ConfirmDialog';
import Loadable from '~mixins/Loadable';
import Payments from './Payments';

export default {
  mixins: [Loadable],
  data() {
    return {
      user: {
        vip: {
          status: 0,
          credits: 0,
        },
      },
      confirm: false,
    };
  },
  mounted() {
    this.loadStart();
    this.$api.res('sync/trust', 'raw').load().then(({data}) => {
      this.user.vip.status = data.status;
      this.user.vip.credits = data.credits;
      this.loadStop();
    });
  },
  computed: {
    // user() {
    //   return this.$store.state.user;
    // },
    accept() {
      return this.$store.state.accepts.freeCredits;
    },
  },
  methods: {
    getFree() {
      if (this.accept) {
        this.moderate(true);
      } else {
        this.confirm = true;
      }
    },
    moderate() {
      if (!this.accept) {
        this.$store.commit('accepts/confirm', 'freeCredits');
      }
      this.$router.push('/protect');
      this.confirm = false;
    },
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
  <ActivityActions caption="Доверие" type="wrapped" @close="$emit('close')">

    <div class="activity-section">
      Кредиты доверия позволяют проходить все проверки
      автоматически. Имея статус, кредиты пополняются бесплатно каждый день.
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

      <Payments product="credits"
       button="primary"
       text="Получить за 1$">
      </Payments>
      <span class="btn btn-default"
        @click="getFree()">
        Бесплатно
      </span>
      <!-- <span class="btn btn-primary">Получить</span> -->
    </div>

    <div class="activity-section">
      <div class="activity-section__title">
        Статус анкеты
      </div>

      <div class="activity-section__tile">
        <span v-if="this.labels.load">Загружаю...</span>
        <VipStatus v-else-if="user.vip.status" :human="user" :text="true"/>
        <span v-else>Ваша анкета: обычная</span>
        <Tooltip>
          Статус анкеты выделяет вас в результатах поиска и отображается вашей анкете. Кредиты доверия пополняются каждый день бесплатно.
        </Tooltip>
      </div>

      <div class="activity__splitter"></div>
      <span class="btn btn-primary" @click="$router.push('/trust')">
        Поднять статус
      </span>
      <a class="btn btn-link" href="http://docs.freedomsex.info/blog/#/Как-пользоваться/Кредиты-доверия?id=Статус-анкеты" target="_blank">
        Подробнее...
      </a>
    </div>

    <ConfirmDialog v-if="confirm"
     yesText="Продолжить"
     @confirm="moderate()"
     @close="confirm = false">
      Станьте модератором и получайте
      кредиты доверия бесплатно. Кредиты начисляются
      за правильные действия в интерфейсе безопасности.
    </ConfirmDialog>


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
