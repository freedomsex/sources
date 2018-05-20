<script>
import ModalDialog from '~dialogs/ModalDialog';

export default {
  props: ['show', 'item'],
  data() {
    return {
      content: {
        doit: {
          caption: 'Наказывайте как следует',
          text: `За резкие слова, за оскорбления или хамство,
            за фотографии не в тему или бессмысленные сообщения, наказывайте всех, кого
            считаете нужным. Наказание действует сразу.`,
          action: 'Удалить и наказать',
        },
        must: {
          caption: 'Может стоит наказать?',
          text: `Нажмите "Дизлайк" у сообщения или контакта, которое вызвало негативные эмоции.
            Наказание действует сразу же. Мы никогда не узнаем о нарушениях, если удалить без наказания.`,
          action: 'Удалить и забыть',
        },
        some: {
          caption: 'Удалить навсегда',
          text: `Ваше сообщение будет удалено отовсюду, без возможности восстановить. Сообщение
            пропадет как из вашей истории переписки, так и из переписки вашего собеседника.`,
          action: 'Удалить навсегда',
        },
      },
    };
  },
  computed: {
    variant() {
      return this.show ? this.show : 'some';
    },
    caption() {
      return this.content[this.variant].caption;
    },
    text() {
      return this.content[this.variant].text;
    },
    action() {
      return this.content[this.variant].action;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    bun() {
      console.log('bun0');
      this.$emit('bun');
      this.close();
    },
    remove() {
      this.$emit('remove');
      this.close();
    },
  },
  components: {
    ModalDialog,
  },
};
</script>

<template>
  <ModalDialog @close="close">
    <div class="modal-dialog__wrapper">
      <div class="modal-dialog__caption">
        {{caption}}
      </div>
      <div class="modal-dialog__body">
        {{text}}
      </div>
      <div class="modal-dialog__footer">
        <button class="btn btn-primary"
         @click="bun()" v-if="show == 'doit'">{{action}}</button>
        <button class="btn btn-danger"
         @click="remove()" v-else>{{action}}</button>
        <button class="btn btn-default"
         @click="close()">Отмена</button>
      </div>
    </div>
  </ModalDialog>
</template>

<style lang="less">
</style>
