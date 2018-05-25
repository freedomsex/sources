import {Vue, store} from '~store';
import '~assets/directives/resized'; // TODO: оформить директивы
import '~legacy/navigate'; // TODO: проверить/переписать навигацию клавиатуры

import {router, settingsRouter} from '~config/router';

import MenuUser from '~modules/MenuUser';
import TitleMail from '~modules/TitleMail';
import AccountComponent from '~components/AccountComponent';
import AdTop from '~modules/AdTop';

import InfoWidget from '~widgets/InfoWidget';
import AuthBoard from '~widgets/AuthBoard';
import SearchWizard from '~widgets/SearchWizard';
import AlertWidget from '~widgets/AlertWidget';

import ApiKeyUpdate from '~modules/ApiKeyUpdate';
import SearchList from '~components/SearchList';
import SliderFooter from '~components/SliderFooter';
import DesiresWidget from '~widgets/DesiresWidget';

import 'styles/core/body.less';

import moment from 'moment';

moment.locale('ru');

Vue.prototype.$moment = moment;

const App = new Vue({
  data: {
    alert: '',
    humanId: null,
    snackbar: {
      text: '',
      callback: null,
      action: '',
    },
  },
  mounted() {
    this.$store.dispatch('notes/LOAD');
    const humanId = parseInt(window.location.pathname.split('/')[1], 10);
    this.humanId = humanId || null;
    if (this.humanId) {
      this.$store.dispatch('search/HUMAN', this.humanId);
    }
  },
  computed: {
    simple() {
      return this.$store.state.simple;
    },
    ready() {
      return this.$store.state.ready;
    },
    promt() {
      const {promt} = this.$store.state.user;
      return !promt || promt == 'no';
    },
    tags() {
      return this.$store.getters['search/tags'];
    },
    human() {
      return this.$store.state.search.human;
    },
  },
  methods: {
    showSnackbar(text, callback, action, play) {
      console.log('snackbar', text);
      this.snackbar.text = text;
      this.snackbar.callback = callback;
      this.snackbar.action = action;
      this.snackbar.play = play == true;
    },
    toast(text) {
      this.alert = text;
    },
    refresh() {
      // TODO: without $root and $refs
      this.$refs['api-key'].load();
    },
    reload() {
      const home = this.$refs.results;
      if (home) {
        home.reload();
      } else {
        this.redirectHome();
      }
      // Hard reload mail page to home
    },
    redirectHome() {
      console.log('Hard reload mail page to home');
      window.location = '/';
    },
  },
  el: '#app',
  store,
  router,
  components: {
    MenuUser,
    TitleMail,
    AccountComponent,
    InfoWidget,
    AuthBoard,
    SearchWizard,
    AdTop,
    SearchList,
    AlertWidget,
    ApiKeyUpdate,
    SliderFooter,
    DesiresWidget,
  },
});

const Layer = new Vue({
  data: {
    warning: '',
    alert: '',
  },
  methods: {
    snackbar(text) {
      this.warning = text;
    },
    toast(text) {
      this.alert = text;
    },
  },
  el: '#settings',
  store,
  router: settingsRouter,
});

// defaultSettings - GLOBAL var
store.commit('search/restore', global.defaultSettings || {});
store.commit('personal', global.defaultSettings || {}); // TODO: to NS

export {App, Layer};
