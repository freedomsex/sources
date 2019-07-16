<script>
import api from '~config/api';
import AbuseList from '~activities/AbuseList';
import AbuseDialog from '~components/abuses/AbuseDialog';
import InfoDialog from '~dialogs/InfoDialog';

export default {
  props: ['humanId'],
  data: () => ({
    list: [],
    show: false,
    dialog: false,
    claim: false,
    success: false,
  }),
  mounted() {
    api.raw.get({id: this.humanId}, 'abuse/load').then(({data}) => {
      this.list = data;
    });
  },
  computed: {
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
  <span>
    <div class="abuse-button" :class="{'alert-abuses': alert}" @click="action()">
      <span v-if="alert">Есть замечания ({{count}}) </span>
      <span v-else>Замечаний нет</span>
    </div>

    <div class="abuse-widget__hint" v-if="success"
     @click="success = false">
      Спасибо, замечание скоро появится в списке
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

  </span>
</template>

<style lang="less">

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
</style>
