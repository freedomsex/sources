<script>
import ls from 'lscache';
import axios from 'axios';
import api from '~config/api';
import hasher from '~legacy/utils/simple-hash';
import ModalDialog from '~dialogs/ModalDialog';
import DefaultActivity from './DefaultActivity';

export default {
  extends: DefaultActivity,
  props: [],
  data() {
    return {
      queries: [],
      text: '',
      needResponse: true,
      sended: false,
      showForm: false,
      isEmpty: false,
    };
  },
  mounted() {
    this.load();
    this.flash();
  },
  methods: {
    load() {
      this.loadStart(3);
      axios.get('/static/json/faq/list.ru.json?v=3').then(({data}) => {
        this.queries = data;
        this.loadStop();
      });
    },
    flash() {
      const text = ls.get('review-text');
      this.text = text || '';
    },
    show(index) {
      const select = this.queries[index].show;
      this.queries[index].show = select === false;
    },
    expand() {
      this.showForm = true;
      this.$nextTick(() => {
        this.$refs.text.focus();
      });
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
        'security/askme')
        .then(() => {
          this.process = false;
          this.text = '';
          ls.remove('review-text');
        });
      this.isEmpty = false;
      this.process = true;
      this.sended = true;
    },
    noReviews() {
      this.needResponse = true;
    },
    switchToReviews() {
      ls.set('review-text', this.text, 5);
      this.$router.push('reviews');
    },
  },
  components: {
    DefaultActivity,
    ModalDialog,
  },
};
</script>

<template>
  <DefaultActivity @close="close">
      <span slot="caption">Помощь</span>

      <div class="activity__content">
        <div class="activity-section">
          На вопросы отвечают администраторы Сообщества,
          такие же Пользователи как и вы. Их много.
          Они не обязаны быть вежливыми, но и хамство бывает редко.
          Они помогают новичкам, если есть возможность.
          Простые вопросы. Не для конфиденциальной информации.
        </div>

        <div class="activity-section__title">Задать вопрос</div>
        <div class="activity-section">
          <input type="text"
           class="form-control"
           placeholder="Введите текст..."
           v-model="text"
           v-if="!showForm">
          <div :class="{'has-error': isEmpty}" v-show="showForm">
            <textarea class="form-control" v-model="text" rows="3" ref="text"></textarea>
            <label style="margin: 10px 0 12px;">
              <input type="checkbox" v-model="needResponse">
               Я хочу получить ответ
             </label>
            <div>
              <button class="btn btn-primary"
               @click="handle()"
               v-show="!sended && !process">Отправить</button>
              <button class="btn btn-primary"
               v-show="process" disabled>Отправляю...</button>
              <button class="btn btn-default"
               v-show="sended && !process" disabled>Отправлено</button>
              <button class="btn btn-link"
               @click="switchToReviews()">Оставить отзыв</button>
            </div>
          </div>
        </div>
        <div class="activity-section" v-if="queries && !showForm && !text">
          <div v-for="(item, index) in queries">
            <a class="query-list__query" @click="show(index)">{{item.query}}</a>
            <div class="query-list__answer" v-show="item.show">
            {{item.text}}
            <a class="link_simple"
             :href="item.more"
             target="_blank"
             v-show="item.more">Подробнее...</a>
            </div>
          </div>
        </div>
        <div v-if="!showForm && text">
          <button class="btn btn-primary" @click="expand()">Продолжить</button>
        </div>
        <div v-show="labels.load">Загружаю...</div>
      </div>


      <ModalDialog @close="noReviews()" v-if="!needResponse">
        <div class="modal-dialog__wrapper">
          <div class="modal-dialog__caption">
            Отправьте ваш отзыв
          </div>
          <div class="modal-dialog__body">
            Пожалуйста, нажмите кнопку "Отправить отзыв",
            если хотите высказать мнение, поделиться советом
            или сообщить информацию.
          </div>
          <div class="modal-dialog__footer">
            <button class="btn btn-default" @click="noReviews()">Отмена</button>
            <button class="btn btn-primary" @click="switchToReviews()">Отправить отзыв</button>
          </div>
        </div>
      </ModalDialog>

      <ModalDialog @close="close()" v-if="sended">
        <div class="modal-dialog__wrapper">
          <div class="modal-dialog__caption">
            Скоро ответим
          </div>
          <div class="modal-dialog__body">
             Ответ будет отправлен в анкету на сайте или на почту.
             Чем выше важность вопроса, тем больше шансов скоро получить ответ.
             Некоторые вопросы могут остаться без ответа.
             Отвечают быстро, но это не точно...
          </div>
          <div class="modal-dialog__footer">
            <button class="btn btn-primary" @click="close()">Закрыть</button>
          </div>
        </div>
      </ModalDialog>

  </DefaultActivity>
</template>

<style lang="less">
.query-list {
  &__query {
    .link_simple;
    margin-bottom: @indent-sm;
    display: block;
  }

  &__answer {
    margin: 0 0 @indent-md @indent-sm;
  }
}
</style>
