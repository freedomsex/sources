<script>
import _ from 'underscore';
import json from '~legacy/utils/json';
import ModalDialog from '~dialogs/ModalDialog';
import Snackbar from '~widgets/Snackbar';
import QuickMessage from '~dialogs/quick-message/QuickMessage';
import SearchItem from './SearchItem';

export default {
  data() {
    return {
      loading: false,
      users: [],
      response: true,
      error: 0,
      newCount: 0,
      attention: false,
      toSlow: false,
      humanId: null,
      account: null,
      sended: false,
      ignore: false,
    };
  },
  mounted() {
    this.preload();
    this.$store.dispatch('search/load');
    this.reload();
    this.visitedSync();
    this.$store.dispatch('desires/PICK');
  },
  computed: {
    items() {
      return this.$store.state.results.list;
    },
    more() {
      return this.$store.getters['results/more'];
    },
    compact() {
      const {city} = this.$store.state.user;
      const {any} = this.$store.state.search;
      return city && !any;
    },
    visited() {
      return this.$store.state.visited.list;
    },
    accept() {
      const {next, batch} = this.$store.state.results;
      const accept = this.$store.state.accepts.search;
      return !this.ignore && !accept && next > batch;
    },
    defaults() {
      // TODO: global dep for search results "defaultResults"
      const result = global.defaultResults ? json.parse(global.defaultResults) : null;
      return result && _.isObject(result) && _.has(result, 'users') && result.users.length
        ? result
        : [];
    },
    virgin() {
      return this.$store.getters['search/virgin'];
    },
    desires() {
      return _.pluck(this.$store.state.desires.list, 'tag');
    },
    loader() {
      return this.$store.state.ready && (!this.response || !this.items.length);
    },
    age() {
      return this.$store.state.user.age;
    },
    city() {
      const {city} = global.defaultSettings;
      return this.$store.state.user.city || city || null;
    },
    up() {
      const {up} = global.defaultSettings;
      return this.$store.state.search.up || up || 0;
    },
    to() {
      const {to} = global.defaultSettings;
      return this.$store.state.search.to || to || 0;
    },
    who() {
      return this.$store.state.search.who || null;
    },
    userId() {
      return this.$store.state.user.uid || 0;
    },
    // TODO: chech readable settings
  },
  methods: {
    reload() {
      this.$store.commit('ready', false);
      this.$store.commit('results/reset', false);
      this.load();
    },
    visitedSync() {
      this.$store.dispatch('visited/sync').catch(() => {
        console.log('! Ошибка визита');
      });
    },
    preload() {
      this.$store.commit('results/results', this.defaults);
      this.onLoad();
    },
    load() {
      this.response = 0;
      const params = {
        who: this.who,
        city: this.city,
        up: this.up,
        to: this.to,
      };
      this.$store
        .dispatch('results/load', params)
        .then(() => {
          this.onLoad();
        })
        .catch(() => {
          this.response = 200;
          this.toSlow = false;
        });
    },
    loadNext() {
      // this.skipScroll = true;
      this.load();
    },
    onLoad() {
      this.$store.commit('ready', true);
      this.response = 200;
      this.toSlow = false;
    },
    openMessage(id) {
      this.humanId = id;
    },
    noResult() {},
    old(id) {
      return _.contains(this.visited, id);
    },
    gold(tags) {
      const result = _.intersection(this.desires, tags);
      return !!result.length;
    },
    approve() {
      this.$store.commit('accepts/search');
    },
  },
  components: {
    SearchItem,
    ModalDialog,
    QuickMessage,
    Snackbar,
  },
};
</script>

<template>
  <div>
    <div class="search-list">
      <SearchItem v-for="item in items"
       :human="item"
       :visited="old(item.id)"
       :gold="gold(item.tags)"
       :key="item.id" :compact="compact"/>

      <div v-if="userId">
        <div class="search-list__alert" v-if="!city" @click="$router.push('wizard/city')">
          Получайте в десять раз больше новых знакомств.
          Укажите <span class="link_dashed">ваш город</span>  в анкете.
          Вы редко появляетесь в результатах поиска. Ведь все ищут по
          Городу, а он у вас не указан.
        </div>
        <div class="search-list__alert" v-else-if="!age" @click="$router.push('settings/account')">
          Укажите <span class="link_dashed">возраст в анкете</span> и получайте
          больше интересных знакомств.
          Вашу анкету находят только те, кому безразличен возраст.
          Таких мало, и вам очень редко пишут.
        </div>
      </div>

      <div class="search-list__next" v-show="more">
        <span class="btn btn-default btn-sm"
         @click="loadNext" v-show="more && !loader" :disabled="!response">
          Следующие
        </span>
        <span class="btn btn-default btn-sm" v-show="loader" disabled>
          Загружаю...
        </span>

        <span class="btn btn-link btn-sm"
         @click="$router.push('/help/how-it-works')">
          Узнать больше...
        </span>
      </div>
    </div>


    <QuickMessage v-if="humanId"
     :human-id="humanId"
     @sended="sended = true"
     @close="humanId = null"
     @account="account = humanId"/>
    <Snackbar
     v-if="sended"
     @close="sended = false">Сообщение отправлено.</Snackbar>

    <ModalDialog @close="ignore = true" v-if="accept">
      <div class="modal-dialog__wrapper">
        <div class="modal-dialog__caption">
          Поднятие в ТОП Бесплатно!
        </div>
        <div class="modal-dialog__body">
          Онлайн анкеты всегда наверху. Все самые активные пользователи
          на первой странице. Просто пишите тем, с кем ещё не общались.
          Отдельный поиск онлайн анкет отсутствует, да он и не нужен.
        </div>
        <div class="modal-dialog__footer">
          <button class="btn btn-primary btn-fat" @click="approve">
            OK
          </button>
        </div>
      </div>
    </ModalDialog>

  </div>
</template>

<style lang="less">
.search-list {
  margin: 0 0 @indent-sm;
  padding: 0;
  &__alert {
    background: @alert-sand;
    padding: @indent-md @indent-md;
    border: 1px solid #f6e4a2;
    border-width: 1px 0 1px;
    cursor: pointer;
  }
  &__options {
    text-align: center;
    margin-top: 15px;
  }
  &__next {
    text-align: center;
    margin-top: @indent-sm;
  }
  &__loader {
  }
}

.preloader {
  margin: @indent-xs auto @indent-lg;
  text-align: center;
  margin-top: 70px;
  margin-bottom: 100px;
  &__img {
    margin: 0 auto;
    width: 100px;
    height: 100px;
    background-image: url('~static/img/preloader.gif');
  }
  &__hint {
    color: @gray-dark;
  }
}
</style>
