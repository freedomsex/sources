<script>
import lscache from 'lscache';
import axios from 'axios';
import api from '~config/api';
import hasher from '~legacy/utils/simple-hash';
import InfoDialog from '~dialogs/InfoDialog';
import ConfirmDialog from '~dialogs/ConfirmDialog';
import Loadable from '~mixins/Loadable';
import ActivityActions from '~activities/ActivityActions';

export default {
  mixins: [Loadable],
  data() {
    return {
      queries: [],
      text: '',
      needResponse: true,
      sended: false,
      showForm: false,
      isEmpty: false,
      isShort: false,
    };
  },
  mounted() {
    this.load();
    this.flash();
  },
  computed: {
    short() {
      return this.text.length <= 25;
    },
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
      const text = lscache.get('review-text');
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
      api.raw.post({
        text: this.text,
        hash: hasher.random(),
      }, null, 'security/askme')
        .then(() => {
          this.process = false;
          this.text = '';
          lscache.remove('review-text');
        });
      this.isEmpty = false;
      this.process = true;
      this.sended = true;
    },
    noReviews() {
      this.needResponse = true;
    },
    switchToReviews() {
      lscache.set('review-text', this.text, 5);
      this.$router.push('reviews');
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
  <ActivityActions caption="Помощь" type="wrapped" @close="$emit('close')">

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


      <InfoDialog @close="isShort = false" v-if="isShort">
        Пожалуйста, сообщите больше информации.
        Хотя бы одну-две фразы, иначе сложно понять суть.
      </InfoDialog>

      <ConfirmDialog v-if="!needResponse"
       @close="noReviews()"
       @confirm="switchToReviews()"
       yesText="Отправить отзыв">
        <span slot="title">Отправьте ваш отзыв</span>
        Пожалуйста, нажмите кнопку "Отправить отзыв",
        если хотите высказать мнение, поделиться советом
        или сообщить информацию.
      </ConfirmDialog>

      <InfoDialog @close="close()" v-if="sended">
        <span slot="title">Скоро ответим</span>
        Ответ будет отправлен в анкету на сайте или на почту.
        Чем выше важность вопроса, тем больше шансов скоро получить ответ.
        Некоторые вопросы могут остаться без ответа.
        Отвечают быстро, но это не точно...
      </InfoDialog>

  </ActivityActions>
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
