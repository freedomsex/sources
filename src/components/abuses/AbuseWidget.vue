<script>
import api from '~config/api';
import hasher from '~legacy/utils/simple-hash';
import ModalDialog from '~dialogs/ModalDialog';
import LoadingCover from '~dialogs/LoadingCover';

export default {
  props: ['humanId'],
  data() {
    return {
      items: [
        {
          title: 'Предложение оплаты услуг',
          text: 'вирт за деньги, проституция',
        },
        {
          title: 'Развод на деньги',
          text: 'мошенничество, шантаж, вымогательство',
        },
        {title: 'Фото из интернета', text: 'вымышленные данные, обман, фейк'},
        {title: 'Оскорбления, хамство', text: 'троллинг, грубые сообщения'},
        {title: 'Рассылает интим фото', text: 'спамит или провоцирует'},
      ],
      selected: null,
      comment: '',
      process: false,
    };
  },
  methods: {
    select(item) {
      this.selected = item;
    },
    send() {
      const hash = hasher.random();
      let text = `${this.selected.title}, ${this.selected.text}`;
      text = this.comment ? `${text} [${this.comment}]` : text;
      const params = {
        id: this.humanId,
        captcha: '',
        text,
        hash,
      };
      this.process = true;
      api.raw.save(params, null, 'abuse/send').then(({data}) => {
        if (data.error) {
          this.$emit('needed');
        } else {
          this.$emit('success');
        }
        this.process = false;
        this.$emit('close');
      });
    },
  },
  components: {
    ModalDialog,
    LoadingCover,
  },
};
</script>

<template>
  <div>
    <ModalDialog @close="$emit('close')">
      <div class="dialog-caption warning">
        <div class="dialog-caption__title">Опубликовать замечание</div>
        <div class="dialog-caption__option">
          <a href="/блог/анонимное-замечание-к-анкете/" target="_blank">
            <i class="material-icons" @click="">&#xE88F;</i>
          </a>
        </div>
      </div>
      <div class="list-view abuse-list" v-if="!selected">
        <div class="list-view__item abuse-list__item" v-for="item in items" @click="select(item)">
          <b>{{item.title}}</b>, {{item.text}}
        </div>
      </div>
      <div class="modal-dialog__wrapper capped" v-else>
        <div class="modal-dialog__section">
          <b>{{selected.title}}</b>, {{selected.text}}
        </div>
        <div class="modal-dialog__section">
          <div class="dialog-form">
            <div class="dialog-form__textarea">
              <textarea class="dialog-form__message-text"
               placeholder="Ваш комментарий, по желанию"
               rows="1" v-model="comment" v-resized
               @keyup.ctrl.enter.prevent="send()"></textarea>
            </div>
          </div>
        </div>
        <div class="modal-dialog__option">
          <button class="btn btn-warning" @click="send()">
            Отправить
          </button>
          <a href="/блог/анонимное-замечание-к-анкете/" target="_blank"  class="btn btn-link">
            Это анонимно...
          </a>
        </div>
      </div>

      <LoadingCover :show="process"/>
    </ModalDialog>
  </div>
</template>

<style lang="less">
.abuse-list {
  display: flex;
  flex-direction: column;
  &__item {
    flex: 0 0 auto;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.abuse-widget {
  &__hint {
    color: @gray-dark;
    padding: @indent-xs;
  }
}
</style>
