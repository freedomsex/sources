<script>
import ModalDialog from '~dialogs/ModalDialog';

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
    ModalDialog,
  },
};
</script>

<template>
  <span>
    <span class="glyphicon glyphicon-question-sign question-tooltip" @click="show = true"></span>
    <ModalDialog @close="close" v-if="show || force">
      <div class="modal-dialog__wrapper">
        <div class="modal-dialog__body">{{text}}</div>
        <div class="modal-dialog__footer">
          <button class="btn btn-primary btn-flat" @click="close">Хорошо</button>
        </div>
      </div>
    </ModalDialog>
  </span>
</template>

<style lang="less">
.question-tooltip {
  vertical-align: text-top;
  color: @gray;
  padding: 0 @indent-xs;
}
</style>
