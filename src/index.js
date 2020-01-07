
import VueI18n from 'vue-i18n';
import VueProgressBar from 'vue-progressbar';
import moment from 'moment';
import AccountComponent from '@freedomsex/account-component';

import RestAPI from './plugins/RestAPI';
import Service from './plugins/Service';

import {Vue, store} from '~store';
import '~assets/directives/resized'; // TODO: оформить директивы
// import '~legacy/navigate'; // TODO: проверить/переписать навигацию клавиатуры

import {router, settingsRouter} from '~config/router';

import MenuUser from '~modules/MenuUser';
import AdTop from '~modules/AdTop';

import InfoWidget from '~widgets/InfoWidget';
import AuthBoard from '~widgets/AuthBoard';
import UpdateAvailable from '~widgets/UpdateAvailable';
import SearchWizard from '~widgets/SearchWizard';
import AlertWidget from '~widgets/AlertWidget';

import SearchList from '~components/SearchList';
import SliderFooter from '~components/SliderFooter';
import DesiresWidget from '~widgets/DesiresWidget';
import Toast from '~widgets/Toast';
import Snackbar from '~widgets/Snackbar';

import CityWidget from '~widgets/CityWidget';
import RegistrationPromo from '~widgets/RegistrationPromo';
import BottomNav from '~widgets/BottomNav/NavBar';
import Language from '~widgets/Language';
import Version from '~widgets/Version';
import FailedChunk from '~dialogs/FailedChunk';
import Authenticator from '~modules/Authenticator';
import Recaptcha3v from '~modules/Recaptcha3v';
import PhotoLineWidget from '~widgets/PhotoLineWidget';
import FeedbackButtons from '~widgets/FeedbackButtons';

import 'styles/core/body.less';

moment.locale('ru');
Vue.prototype.$moment = moment;

Vue.use(VueI18n);
Vue.use(RestAPI);
Vue.use(Service);

Vue.use(VueProgressBar, {
  color: '#869CCA',
  failedColor: 'red',
  thickness: '3px',
});

const {locale} = global.defaultSettings || 'ru';

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale, // set locale
  fallbackLocale: 'ru',
  silentTranslationWarn: true,
  messages: {
    ru: {
      almostDone: 'Почти готово',
      preloader: 'Поиск анкет, всегда бесплатно',
    },
    en: {
      almostDone: 'Almost done',
      preloader: 'Search for profiles, always free',
    },
  },
});

// global.now = String(new Date().getTime()).slice(0, -3);
// Vue.config.errorHandler = function (error, vm, info) {
//   console.log('window.onerror', info);
//   if (/loading chunk \d* failed./i.test(error.message)) {
//     console.log('chunk failed', info);
//     vm.$root.$refs['version-info'].force();
//   }
// };

global.App = new Vue({
  data: {
    alert: '',
    failedChunk: false,
    humanId: null,
    snackbar: {
      text: '',
      callback: null,
      action: '',
    },
    scrollbarWidth: 15,
  },
  created() {
    this.$service.run('auth/tick');
  },
  mounted() {
    const humanId = parseInt(window.location.pathname.split('/')[1], 10);
    this.humanId = humanId || null;
    if (this.humanId) {
      this.$service.run('human/load', this.humanId);
    }
    this.updateLocale();
    this.userDataSync();

    global.recaptcha = this.$refs.recaptcha;
    global.recaptchaLoad = global.recaptcha.onload;
    this.verify();

    this.scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  },
  computed: {
    simple() {
      return this.$store.state.simple;
    },
    ready() {
      return this.$store.state.ready;
    },
    promt() {
      return this.$store.state.promt;
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
      return this.$refs.authenticator.refresh();
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
    updateLocale() {
      if (!this.$store.state.locale) {
        this.$store.commit('lang', this.$i18n.locale);
      }
      this.$i18n.locale = this.$store.state.locale;
    },
    verify() {
      setTimeout(() => {
        if (this.$store.state.token.uid) {
          this.$service.run('account/verify');
        }
      }, 60 * 1000);
    },
    goBack() {
      if (this.$store.state.back) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    },
    unauthorized() {
      this.$refs.authenticator.unauthorized();
    },
    userDataSync() {
      this.$refs.authenticator.refresh().then(() => {
        this.$service.run('user/load');
      });
    },
  },
  el: '#app',

  store,
  router,
  i18n,
  components: {
    MenuUser,
    Language,
    AccountComponent,
    InfoWidget,
    AuthBoard,
    UpdateAvailable,
    SearchWizard,
    AdTop,
    SearchList,
    SliderFooter,
    DesiresWidget,
    AlertWidget,
    CityWidget,
    RegistrationPromo,
    BottomNav,
    Toast,
    Snackbar,
    Version,
    FailedChunk,
    Authenticator,
    Recaptcha3v,
    PhotoLineWidget,
    FeedbackButtons,
  },
});

global.Layer = new Vue({
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
      if (this.$store.state.back) {
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


// global.window.onerror = (message) => {
//   console.log('window.onerror', message);
//   if (/loading chunk \d* failed./i.test(message)) {
//     console.log('chunk failed', message);
//     global.App.$root.$refs['version-info'].force();
//   }
// };
// defaultSettings - GLOBAL var
// store.commit('search/restore', global.defaultSettings || {});
// store.commit('personal', global.defaultSettings || {}); // TODO: to NS
