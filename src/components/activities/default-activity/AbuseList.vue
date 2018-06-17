<script>
import InfoDialog from '~dialogs/InfoDialog';
import ActivityActions from '../ActivityActions';

export default {
  props: ['list'],
  data() {
    return {
      selected: null,
    };
  },
  computed: {
  },
  methods: {
    select(item) {
      this.selected = this.adaptOldData(item);
    },
    text(item) {
      return this.adaptOldData(item).title;
    },
    moderated(item) {
      return item.mod === '1';
    },
    adaptOldData(data) {
      const {title, text} = data;
      if (!title) {
        const match2 = text.match(/([^[]*)\s?(.*)/m);
        data.title = match2[1];
        data.text = '';
        data.comment = match2[2];
      }
      return data;
    },
  },
  components: {
    ActivityActions,
    InfoDialog,
  },
};
</script>

<template>
  <ActivityActions @close="$emit('close')">
    <span slot="caption">Замечаня к анкете</span>
    <div class="activity-section" v-if="list && list.length">
      <div class="list-view">
        <div class="list-item" v-for="item in list"
         :class="{'gray-item': !moderated(item)}"
         @click="select(item)">
          <div class="list-item__body abuse-item">
            {{text(item)}}
          </div>
          <div class="list-item__options">
            <div class="btn btn-primary btn-xs" v-if="moderated(item)">
              Проверено
            </div>
            <div class="btn btn-default btn-xs" v-if="!moderated(item)">
              Новое
            </div>
          </div>
        </div>
      </div>
    </div>

    <InfoDialog v-if="selected"
     yesText="Закрыть"
     @close="selected = null">
      <div slot="title">{{selected.title}}</div>
      <span class="abuse-capitalised">{{selected.text}}</span>
      <span v-if="selected.mod == 1">
        <span v-if="selected.comment">:{{selected.comment}}</span>
      </span>
      <span v-else>
        Замечание ещё не проверено и может быть отклонено.
        Ложные замечания бывают редко, но доверять лучше проверенным.
      </span>
    </InfoDialog>
  </ActivityActions>
</template>

<style lang="less">
.abuse-item {
  font-style: italic;
  font-size: 14px;
}
.abuse-capitalised {
  text-transform: uppercase;
}
</style>
