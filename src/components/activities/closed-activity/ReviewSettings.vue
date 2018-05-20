<script>
import ls from 'lscache';
import api from '~config/api';
import hasher from '~legacy/utils/simple-hash';
import ModalDialog from '~dialogs/ModalDialog';
import ClosedActivity from './ClosedActivity';

export default {
  extends: ClosedActivity,
  props: [],
  data() {
    return {
      text: '',
      needResponse: false,
      sended: false,
      isEmpty: false,
    };
  },
  mounted() {
    this.flash();
  },
  methods: {
    flash() {
      const text = ls.get('review-text');
      this.text = text || '';
    },
    handle() {
      if (this.text) {
        this.send();
      } else {
        this.isEmpty = true;
      }
    },
    send() {
      api.raw
        .post({
          text: this.text,
          hash: hasher.random(),
        },
        null,
        'security/remark')
        .then(() => {
          this.process = false;
          this.text = '';
          ls.remove('review-text');
        });
      this.isEmpty = false;
      this.process = true;
      this.sended = true;
    },
    noResponse() {
      this.needResponse = false;
    },
    switchToQuestions() {
      ls.set('review-text', this.text, 5);
      this.$router.push('question');
    },
  },
  components: {
    ClosedActivity,
    ModalDialog,
  },
};
</script>

<template>
  <ClosedActivity @close="close">

    <div class="activity-section">
      Пожалуйста, оставьте отзыв о сайте. Для нас важно каждое мнение и в любой форме.
      Будет ещё приятнее, если вы выскажитесь максимально подробно.
      Нажмите кнопку "Задать вопрос", если важен ответ.
    </div>

    <div class="activity-section__title">Оставить отзыв</div>
    <div class="activity-section">
      <div :class="{'has-error': isEmpty}">
        <textarea placeholder="Введите текст..."
         class="form-control"
         v-model="text"
         rows="3"></textarea>
        <label style="margin: 10px 0 12px;">
          <input type="checkbox" v-model="needResponse">
           Я хочу получить ответ
          </label>
      </div>

      <div>
        <button class="btn btn-primary"
         @click="handle()" v-show="!sended && !process">Отправить</button>
        <button class="btn btn-primary"
         v-show="process" disabled>Отправляю...</button>
        <button class="btn btn-default"
         v-show="sended && !process" disabled>Отправлено</button>
        <button class="btn btn-link"
         @click="switchToQuestions()">Задать вопрос</button>
      </div>
    </div>

    <div class="activity__splitter"></div>


    <ModalDialog @close="noResponse()" v-if="needResponse">
      <div class="modal-dialog__wrapper">
        <div class="modal-dialog__caption">
          Задайте вопрос
        </div>
        <div class="modal-dialog__body">
          Пожалуйста, нажмите кнопку "Задать вопрос", если для вас важен ответ.
          Отзывы нужны чтобы высказать мнение, или сообщить информацию,
          когда ответ не обязателен.
        </div>
        <div class="modal-dialog__footer">
          <button class="btn btn-default" @click="noResponse()">Отмена</button>
          <button class="btn btn-primary" @click="switchToQuestions()">Задать вопрос</button>
        </div>
      </div>
    </ModalDialog>

    <ModalDialog @close="close()" v-if="sended">
      <div class="modal-dialog__wrapper">
        <div class="modal-dialog__caption">
          Спасибо за отзыв
        </div>
        <div class="modal-dialog__body">
          Для нас важно каждое мнение и в любой форме.
          Ориентируясь на отзывы Пользователей, разработчики стараются
          делать сайт ещё приятнее и удобнее.
        </div>
        <div class="modal-dialog__footer">
          <button class="btn btn-primary" @click="close()">Закрыть</button>
        </div>
      </div>
    </ModalDialog>

  </ClosedActivity>
</template>

<style lang="less">
</style>
