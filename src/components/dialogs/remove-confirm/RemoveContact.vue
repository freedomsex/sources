<script>
import ModalDialog from '~dialogs/ModalDialog';
import RemoveConfirm from './RemoveConfirm';

export default {
  extends: RemoveConfirm,
  data() {
    return {
      content: {
        some: {
          caption: 'Удалить навсегда',
          text: `Контакт будет удален без возможности восстановить. Дальнейшее общение с собеседником станет невозможно.
            Обменивайтесь реальными контактами с теми кто вам интересен всегда.`,
          action: 'Удалить навсегда',
        },
      },
    };
  },
  methods: {
    remove() {
      this.$emit('remove');
      this.$emit('close');
    },
  },
  components: {
    ModalDialog,
  },
};
</script>

<template>
  <ModalDialog @close="$emit('close')">
    <div class="modal-dialog__wrapper">
      <div class="modal-dialog__caption">
        {{caption}}
      </div>
      <div class="modal-dialog__body">
        {{text}}
      </div>
      <div class="modal-dialog__footer">
        <button class="btn btn-primary" @click="bun()" v-if="show == 'doit'">{{action}}</button>
        <button class="btn btn-danger" @click="remove()" v-else>{{action}}</button>
        <button class="btn btn-default" @click="close()">Отмена</button>
      </div>
    </div>
  </ModalDialog>
</template>

<style lang="less">
</style>
