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
        {variant: 1,
          title: 'Предложение оплаты услуг',
          text: 'вирт за деньги, проституция'},
        {variant: 2,
          title: 'Развод на деньги',
          text: 'мошенничество, шантаж, вымогательство'},
        {variant: 3,
          title: 'Фото из интернета',
          text: 'вымышленные данные, обман, фейк'},
        {variant: 4,
          title: 'Оскорбления, хамство',
          text: 'троллинг, грубые сообщения'},
        {variant: 5,
          title: 'Провоцирует, спамит',
          text: 'или рассылает интим фото'},
      ],
      selected: null,
      comment: '',
      variant: null,
      process: false,
    };
  },
  methods: {
    select(item) {
      this.selected = item;
    },
    send() {
      const hash = hasher.random();
      const {variant, title, text} = this.selected;
      const params = {
        id: this.humanId,
        variant,
        title,
        text,
        comment: this.comment,
        captcha: '',
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
          <a href="http://docs.freedomsex.info/blog/#/Как-пользоваться/?id=Замечания-к-анкетам" target="_blank">
            <i class="material-icons" @click="">&#xE88F;</i>
          </a>
        </div>
      </div>
      <div class="list-view" v-if="!selected">
        <div class="list-item"
         v-for="item in items"
         @click="select(item)">
          <div class="list-item__body abuse__item">
            <b>{{item.title}}</b>, {{item.text}}
          </div>
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
               maxlength="200"
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
          <a href="http://docs.freedomsex.info/blog/#/Как-пользоваться/?id=Замечания-к-анкетам" target="_blank"  class="btn btn-link">
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

}

</style>
