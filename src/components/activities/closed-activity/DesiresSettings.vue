<script>
import _ from 'underscore';
import Vuex from 'vuex';
import InfoDialog from '~dialogs/InfoDialog';
import DesireItem from '~modules/DesireList/DesireItem';
import SuggestInput from '~modules/SuggestInput';
import Tooltip from '~widgets/Tooltip';
import ActivityActions from '../ActivityActions';

export default {
  props: [],
  data() {
    return {
      process: false,
      desire: '',
      confirmRemove: null,
      // tooltip: {
      //   desire: false,
      // },
    };
  },
  computed: Vuex.mapState({
    tags(state) {
      return state.desires.list;
    },
    saved() {
      return _.pluck(this.tags, 'tag');
    },
  }),
  mounted() {
    this.process = true;
    this.$store.dispatch('desires/SYNC').then(() => {
      this.process = false;
    });
  },
  methods: {
    close() {
      this.$emit('close');
    },
    add(tag) {
      this.process = true;
      this.$store.dispatch('desires/ADD', tag).then(() => {
        this.process = false;
      });
    },
    remove() {
      this.$store.dispatch('desires/DELETE', this.confirmRemove);
      this.confirmRemove = null;
    },
  },
  components: {
    ActivityActions,
    InfoDialog,
    SuggestInput,
    DesireItem,
    Tooltip,
  },
};
</script>

<template>
  <ActivityActions type="closed" @close="close">
    <div class="activity-section">
      <div class="activity-section__title">
        Желания и фантазии
      </div>
      <SuggestInput url="tag/suggest"
       title="Ваше желание"
       @select="add"
       :tags="saved"
       :disabled="process"/>
    </div>

    <div class="activity-section">
      <div class="desire-tag__list">
        <DesireItem v-for="(item, index) in tags" :key="index"
         :tag="item.tag"
         :id="item.id"
         added="true"
         @select="confirmRemove = index"/>
      </div>
    </div>

    <div class="activity-section">
      <div class="activity-section__title">
        Фильтр желаний
        <Tooltip>
          Начните вводить желание или фантазию.
          Выберите из списка, тысячи возможных вариантов.
          Напишите разработчикам, если вам чего-то не хватает ;)
        </Tooltip>
      </div>
      Позволяет находить тех, чьи желания и фантазии совпадают с вашими.
      Просто заполните ваш список ваших Желаний. Когда желания вашего собеседника
      и ваши совпадут, его анкета будет выделена в Поиске.
    </div>


    <InfoDialog v-if="confirmRemove !== null"
     yesText="Удалить" @confirm="remove"
     @close="confirmRemove = null">
      Удалить желание? Всегда можно будет добавить заново здесь,
      или кликнув по понравившемуся в любой анкете.
      <span slot="yesIcon" class="glyphicon glyphicon-remove"></span>
    </InfoDialog>

  </ActivityActions>
</template>

<style lang="less">
</style>
