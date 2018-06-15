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
  methods: {
    select(item) {
      this.selected = this.adaptOldData(item);
    },
    text(item) {
      return this.adaptOldData(item).title;
    },
    adaptOldData(data) {
      const {title, text, comment} = data;
      if (!title) {
        const match2 = text.match(/([^[]*)\s?(.*)/m);
        return {
          title: match2[1],
          text: '',
          comment: match2[2],
        };
      }
      return {title, text, comment};
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
        <div class="list-view__item abuse-item" v-for="item in list"
         @click="select(item)">{{text(item)}}</div>
      </div>
    </div>

    <InfoDialog v-if="selected" yesText="Закрыть"
     @close="selected = null">
      <div slot="title">{{selected.title}}</div>
      <span class="abuse-capitalised">{{selected.text}}</span>:
      {{selected.comment}}
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
