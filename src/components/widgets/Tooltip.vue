<script>
import InfoDialog from '~dialogs/InfoDialog';

export default {
  props: ['text', 'force'],
  data() {
    return {
      show: false,
    };
  },
  methods: {
    close() {
      this.show = false;
      this.$emit('close');
    },
  },
  components: {
    InfoDialog,
  },
};
</script>

<template>
  <span class="question-tooltip">
    <span class="glyphicon glyphicon-question-sign question-tooltip" @click="show = true"></span>
    <InfoDialog @close="close" v-if="show || force" :text="text">
      <slot></slot>
    </InfoDialog>
  </span>
</template>

<style lang="less">
.question-tooltip {
  vertical-align: middle;

  .glyphicon {
    vertical-align: text-top;
    color: @gray;
    padding: 0 @indent-xs;
    font-size: 16px;
  }
}
</style>
