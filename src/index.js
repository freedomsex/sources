import {Vue, store} from '~store';
import '~assets/directives/resized'; // TODO: оформить директивы
// import '~legacy/navigate'; // TODO: проверить/переписать навигацию клавиатуры

import {router, settingsRouter} from '~config/router';

import MenuUser from '~modules/MenuUser';
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
import Snackbar from '~widgets/Snackbar';
import Toast from '~widgets/Toast';

import CityWidget from '~widgets/CityWidget';
import RegistrationPromo from '~widgets/RegistrationPromo';

import 'styles/core/body.less';

import moment from 'moment';

moment.locale('ru');

Vue.prototype.$moment = moment;

store.dispatch('LOAD_API_TOKEN');
store.dispatch('accepts/LOAD');
store.dispatch('LOAD_USER');
store.commit('load');

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
      this.$store.dispatch('human/load', this.humanId);
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
      return this.$store.getters['results/tags'];
    },
    human() {
      return this.$store.state.human;
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
      this.$store.dispatch('auth/sync');
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
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    },
  },
  el: '#app',
  store,
  router,
  components: {
    MenuUser,
    AccountComponent,
    InfoWidget,
    AuthBoard,
    SearchWizard,
    AdTop,
    SearchList,
    ApiKeyUpdate,
    SliderFooter,
    DesiresWidget,
    AlertWidget,
    CityWidget,
    RegistrationPromo,
    Snackbar,
    Toast,
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
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    },
  },
  el: '#settings',
  store,
  router: settingsRouter,
});

// defaultSettings - GLOBAL var
// store.commit('search/restore', global.defaultSettings || {});
// store.commit('personal', global.defaultSettings || {}); // TODO: to NS

export {App, Layer};
