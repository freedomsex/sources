<script>
import ModalDialog from '~dialogs/ModalDialog';

export default {
  props: ['show'],
  data() {
    return {
      content: {
        1: {
          caption: 'Предупреждение',
          text: `На сообщения от этого пользователя поступают жалобы. Возможно его сообщения имеют грубый тон,
           могут оскорбить, содержат интим фотографии, бессмысленные или резкие предложения.`,
        },
        8: {
          caption: 'Внимание',
          text: `Действия пользователя нарушают правила. Сообщения пользователя намеренно оскорбительны,
           имеют противоправное содержание, обман или предложение оплаты услуг.`,
        },
      },
    };
  },
  computed: {
    caption() {
      return this.content[this.show].caption;
    },
    text() {
      return this.content[this.show].text;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    promt() {
      this.$emit('promt');
    },
  },
  components: {
    ModalDialog,
  },
};
</script>

<template>
  <ModalDialog @close="close">
    <div class="attention-wall">
      <div class="attention-wall__content">
        <div class="attention-wall__caption">{{caption}}</div>
        <div class="attention-wall__text">{{text}}</div>
        <div class="attention-wall__option">
          <button class="btn btn-primary" @click="close">
            <span aria-hidden="true" class="glyphicon glyphicon-remove"></span>
            Закрыть
          </button>
          <button class="btn btn-default" @click="promt">
            <span aria-hidden="true" class="glyphicon glyphicon-ok"></span>
            Смотреть
          </button>
        </div>
      </div>
    </div>
  </ModalDialog>
</template>

<style lang="less">
.attention-wall {
  &__content {
    margin: @indent-lg @indent-md;
    text-align: left;
    display: inline-block;
    // border: 1px solid @gray-dark;
    // padding: @indent-xs @indent-sm;
    // background: @light;
    // border-radius: 2px;
    z-index: 1000;
  }
  &__caption {
    font-size: @font-lg;
    font-weight: bold;
    margin-bottom: @indent-sm;
  }
  &__text {
    font-size: 14px;
    margin-bottom: @indent-sm;
  }
}
</style>
