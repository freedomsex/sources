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

  },
  components: {
    AbuseList,
    AbuseDialog,
    InfoDialog,
  },
};
</script>

<template>
  <div>
    <div class="abuse-widget">
      <button class="btn btn-danger" v-if="alert"
       @click="show = true">
        Есть замечания ({{count}})
      </button>
      <button class="btn" v-else
       @click="dialog = true">
        Замечаний нет
      </button>

      <div class="abuse-widget__hint" v-if="success"
       @click="success = false">
        Спасибо, замечание скоро появится в списке
      </div>
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

.abuse-widget {
  text-align: center;
  &__hint {
    color: @gray-dark;
    padding: @indent-xs;
  }
}
</style>
