<script>
import HeaderBar from '~widgets/HeaderBar';

import AppSettings from '~widgets/AppSettings';
import Notifications from '~modules/Notifications';
import ColorContactIcon from '~components/contacts/ColorContactIcon';

export default {
  data() {
    return {
      attempt: 0,
    };
  },
  components: {
    AppSettings,
    HeaderBar,
    Notifications,
    ColorContactIcon,
  },
  mounted() {
    // do something after mounting vue instance
  },
  computed: {
    authorized() {
      return this.$store.state.authorized;
    },
    item() {
      return this.$store.state.user;
    },
    signature() {
      let results = 'Кто вы?';
      const {name, city, age, sex} = this.$store.state.user;
      if (sex) {
        results = sex == 1 ? 'Парень' : 'Девушка';
        results = name || results;
        return `${results} ${age || ''} ${city || ''}`;
      }
      return results;
    },
  },
  methods: {
    regmy() {
      this.$root.$refs.recaptcha.render(token => this.$store.dispatch('REGISTRATION', token));
      this.$root.recaptcha.execute(); // TODO: global APP dep
      console.log('recaptcha начало проверки');
    },
  },
};
</script>

<i18n>
{
  "ru": {
    "begin": {
      "more": "Получить логин и пароль прямо сейчас",
      "less": "Получить логин сейчас"
    }
  },
  "en": {
    "Войти": "Sign in",
    "begin": {
      "more": "Get your login and password right now",
      "less": "Get your login now"
    }
  },
  "kz": {
    "Войти": "Кіру",
    "begin": {
      "more": "Енді сіздің логиніңізді және құпия сөзіңізді алыңыз",
      "less": "Енді сіздің логиніңізді алыңыз"
    }
  },
  "ua": {
    "Войти": "Увійти",
    "begin": {
      "more": "Отримати логін і пароль прямо зараз",
      "less": "Отримати логін зараз"
    }
  }
}
</i18n>

<template>
  <HeaderBar :fixed="true">
    <div class="header-bar__wrapper">
      <div class="header-bar__container">
        <div class="menu-user__logo">
          <AppSettings/>
        </div>

        <div class="header-bar__navbar" v-show="authorized">
          <div class="header-bar__button" @click="$router.push('/settings/account')">
            <span class="header-bar__title limit" v-text="signature"></span>
            <ColorContactIcon :item="item" size="small-icon"/>
          </div>
          <Notifications />
        </div>

        <div class="header-bar__button" v-show="!authorized"
          @click="$router.push('/confirm-sex/register')"
          style="display: none;">
          <div class="header-bar__title hidden-xs">
            {{$t('begin.more')}}
          </div>
          <div class="header-bar__title visible-xs-inline">
            {{$t('begin.less')}}
          </div>
        </div>

        <div class="header-bar__button"
          @click="$router.push('/login')"
          v-show="!authorized">
          <span class="header-bar__title">{{$t('Войти')}}</span>
        </div>
      </div>
    </div>

  </HeaderBar>
</template>


<style lang="less">

.menu-user {
  &__logo {
    // flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: 18px;
    margin-right: 5px;
    cursor: pointer;
  }

  &__status {
    width: 10px;
    height: 10px;
    position: absolute;
    bottom: 0px;
    right: -3px;
    display: inline-block;
    border-radius: 10px;
    box-shadow: 0 0 0 2px @menu-color;
    vertical-align: middle;
    background-color: @pink-dark;
  }
}
</style>
