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
  <span>
    <span class="glyphicon glyphicon-question-sign question-tooltip" @click="show = true"></span>
    <InfoDialog @close="close" :text="text" v-if="show || force"/>
  </span>
</template>

<style lang="less">
.question-tooltip {
  vertical-align: text-top;
  color: @gray;
  padding: 0 @indent-xs;
}
</style>
