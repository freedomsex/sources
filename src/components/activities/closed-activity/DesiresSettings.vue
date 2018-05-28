<script>
import Vuex from 'vuex';
import ClosedActivity from '~closed-activity/ClosedActivity';
import ModalDialog from '~dialogs/ModalDialog';
import DesireItem from '~modules/DesireList/DesireItem';
import SuggestInput from '~modules/SuggestInput';
import Tooltip from '~widgets/Tooltip';

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
    ClosedActivity,
    ModalDialog,
    SuggestInput,
    DesireItem,
    Tooltip,
  },
};
</script>

<template>
  <ClosedActivity @close="close">
    <div class="activity-section">
      <div class="activity-section__title">
        Желания и фантазии
      </div>
      <SuggestInput @select="add" :tags="tags" :disabled="process"/>
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

    <ModalDialog @close="confirmRemove = null" v-if="confirmRemove !== null">
      <div class="modal-dialog__wrapper">
        <div class="modal-dialog__body">
          Удалить желание? Всегда можно будет добавить заново здесь,
          или кликнув по понравившемуся в любой анкете.
        </div>
        <div class="modal-dialog__footer">
          <button class="btn btn-danger" @click="remove">
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
            Удалить
          </button>
        </div>
      </div>
    </ModalDialog>

  </ClosedActivity>
</template>

<style lang="less">
</style>
