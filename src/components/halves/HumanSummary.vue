<script>
import AbuseList from '~activities/AbuseList';
import AbuseDialog from '~components/abuses/AbuseDialog';
import InfoDialog from '~dialogs/InfoDialog';

export default {
  props: ['humanId', 'centred'],
  data: () => ({
    list: [],
    show: false,
    dialog: false,
    claim: false,
    success: false,
    loading: true,
    error: false,
  }),
  mounted() {
    this.$api.res('abuse/load', 'raw').get({id: this.humanId}).then(({data}) => {
      this.list = data;
    }).catch(() => {
      this.error = true;
    })
      .finally(() => {
        this.loading = false;
      });
  },
  computed: {
    human() {
      const {human} = this.$store.state;
      return human.id == this.humanId ? human : null;
    },
    status() {
      return (this.human && this.human.vip) ? this.human.vip.status : null;
    },
    statusStyle() {
      return {
        'status-special': this.status == 1,
        'status-gold': this.status == 2,
        'status-vip': this.status == 3,
      };
    },
    statusSay() {
      const say = ['Обычный статус', 'Особый статус', 'Золотой статус', 'VIP статус'];
      return say[this.status || 0];
    },
    alert() {
      return this.count > 0;
    },
    count() {
      return this.list.length;
    },
  },
  methods: {
    action() {
      if (this.alert) {
        this.show = true;
      } else {
        this.dialog = true;
      }
    },
  },
  components: {
    AbuseList,
    AbuseDialog,
    InfoDialog,
  },
};
</script>

<template>

  <div class="human-summary">

    <div class="human-summary__container" :class="{centred}">
      <div class="human-summary__status" :class="statusStyle">
        {{(human || error) ? statusSay : '•••'}}
      </div>

      <span>
        <div class="abuse-button" :class="{'alert-abuses': alert}"
          v-show="!loading" @click="action()">
          <span v-if="alert">Есть замечания ({{count}}) </span>
          <span v-else>Замечаний нет</span>
        </div>

        <div class="abuse-widget__hint" v-if="success"
          @click="success = false">
          Спасибо, замечание скоро появится в списке
        </div>

      </span>

    </div>

    <AbuseList v-if="show"
      :list="list"
      @close="show = false"
      @add="dialog = true"/>

    <AbuseDialog v-if="dialog"
      :humanId="humanId"
      @needed="claim = true"
      @success="success = true"
      @close="dialog = false"/>

    <InfoDialog v-if="claim"
      @close="claim = false">
      <div slot="title">Наказывайте всегда</div>
      Нажмите «Наказать и удалить» у сообщения,
      которое является причиной замечания. Можно несколько.
      Это необходимо, и поможет быстрее определить истину,
      а также степень вины.
    </InfoDialog>

  </div>
</template>

<style lang="less">

.human-summary {
  padding-bottom: 0px;

  &__container {
    &.centred {
      text-align: center;
    }
  }

  &__status {
    .rounded-button();
    border: 1px solid @gray;
    background-color: @white;

    &.status {
      &-special {
        color: @green-dark;
        border-color: @green;
        background-color: @white;
      }
      &-gold {
        color: @orange;
        border-color: @orange;
        background-color: @white;
      }
      &-vip {
        color: @red-dark;
        border-color: @red-dark;
        background-color: @white;
      }
    }
  }


  .abuse-button {
    .rounded-button();
    border: 1px solid @gray;

    &.alert-abuses {
      color: @white;
      background-color: @dark;
    }

    display: inline-block;
    &__hint {
      color: @gray-dark;
      padding: @indent-xs;
      margin: 5px 0;
    }
  }
}
</style>
