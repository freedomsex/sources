<script>
import lscache from 'lscache';
import api from '~config/api';
import hasher from '~legacy/utils/simple-hash';
import InfoDialog from '~dialogs/InfoDialog';
import ConfirmDialog from '~dialogs/ConfirmDialog';
import Loadable from '~mixins/Loadable';
import ActivityActions from '../ActivityActions';

export default {
  mixins: [Loadable],
  data() {
    return {
      text: '',
      needResponse: false,
      sended: false,
      isEmpty: false,
      isShort: false,
    };
  },
  mounted() {
    this.flash();
  },
  computed: {
    short() {
      return this.text.length <= 25;
    },
  },
  methods: {
    flash() {
      const text = lscache.get('review-text');
      this.text = text || '';
    },
    handle() {
      if (this.text) {
        if (!this.short) {
          this.send();
        } else {
          this.isShort = true;
        }
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
          lscache.remove('review-text');
        });
      this.isEmpty = false;
      this.process = true;
      this.sended = true;
    },
    noResponse() {
      this.needResponse = false;
    },
    switchToQuestions() {
      lscache.set('review-text', this.text, 5);
      this.$router.push('question');
    },
  },
  components: {
    ActivityActions,
    ConfirmDialog,
    InfoDialog,
  },
};
</script>

<template>
  <ActivityActions type="closed" @close="$emit('close')">
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
         v-resized
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

    <InfoDialog @close="isShort = false" v-if="isShort">
      Пожалуйста, сообщите больше информации.
      Хотя бы одну-две фразы, иначе сложно понять суть.
    </InfoDialog>

    <ConfirmDialog v-if="needResponse"
     @close="noResponse()"
     @confirm="switchToQuestions()"
     yesText="Задать вопрос">
      <span slot="title">Задайте вопрос</span>
      Пожалуйста, нажмите кнопку "Задать вопрос", если для вас важен ответ.
      Отзывы нужны чтобы высказать мнение, или сообщить информацию,
      когда ответ не обязателен.
    </ConfirmDialog>

    <InfoDialog @close="$emit('close')" v-if="sended">
      <span slot="title">Спасибо за отзыв</span>
      Для нас важно каждое мнение и в любой форме.
      Ориентируясь на отзывы Пользователей, разработчики стараются
      делать сайт ещё приятнее и удобнее.
    </InfoDialog>

  </ActivityActions>
</template>

<style lang="less">
</style>
