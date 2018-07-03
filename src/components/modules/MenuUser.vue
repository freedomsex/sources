<script>
import axios from 'axios';
import AppSettings from '~widgets/AppSettings';

export default {
  data() {
    return {
      attempt: 0,
    };
  },
  mounted() {
    this.loadStatus();
  },
  computed: {
    authorized() {
      const {uid} = this.$store.state.user;
      // const {registered: reg} = this.$store.getters;
      return uid > 0 ? 1 : 0;
    },
    newMessage() {
      const {status} = this.$store.state.contacts.intimate;
      return status == false || status < 8;
    },
    newContact() {
      const {status} = this.$store.state.contacts.initial;
      return status == false || status < 8;
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
    search() {
      this.$store.commit('simple', true);
      this.$root.reload();
      this.$router.push('/');
    },
    initial() {
      this.$router.push({name: 'initial'});
    },
    intimate() {
      this.$router.push({name: 'intimate'});
    },
    check() {
      axios
        .get('/mailer/status')
        .then(({data}) => {
          this.onIntimate(data.message);
          this.onInitial(data.contact);
          this.attempt = 0;
        })
        .catch(() => {
          this.attempt += 1;
        });
    },
    loadStatus() {
      const {uid} = this.$store.state.user;
      // console.log('888uid888', uid);
      let delay = !uid ? 2 : 15;
      if (uid) {
        this.check();
      }
      if (this.attempt > 10) {
        delay = 20;
      } else if (this.attempt > 4) {
        delay = 5;
      } else if (this.attempt > 2) {
        delay = 3;
      }
      setTimeout(() => {
        this.loadStatus();
      }, delay * 1000);
    },
    onLoad() {},
    onIntimate(status) {
      let {notified} = this.$store.state.contacts.intimate;
      const {status: current} = this.$store.state.contacts.intimate;
      this.$store.commit('intimate/status', status);

      notified = !(!notified || status != current);
      if (status == 1 && !notified && this.newMessage) {
        const callback = () => this.$router.push({name: 'intimate'});
        this.$store.commit('intimate/notifi', true);
        this.$emit('snackbar', 'Новое сообщение', callback, 'Смотреть', true);
      }
    },
    onInitial(status) {
      let {notified} = this.$store.state.contacts.initial;
      const {status: current} = this.$store.state.contacts.initial;
      this.$store.commit('initial/status', status);

      notified = !(!notified || status != current);
      if (status == 1 && !notified && this.newContact && !this.newMessage) {
        const callback = () => this.$router.push({name: 'initial'});
        this.$store.commit('initial/notifi', true);
        this.$emit('snackbar', 'Новое знакомство', callback, 'Смотреть', true);
      }
    },

    regmy() {
      this.$root.$refs.recaptcha.render(token => this.$store.dispatch('REGISTRATION', token));
      this.$root.recaptcha.execute(); // TODO: global APP dep
      console.log('recaptcha начало проверки');
    },
  },
  components: {
    AppSettings,
  },
};
</script>

<template>
  <nav id="menu-user" class="navbar navbar-inverse navbar-fixed-top">
    <div class="menu-user">
      <div class="menu-user__wrapper">
        <div class="menu-user__logo">
          <AppSettings/>
        </div>
        <div class="menu-user__navbar" v-show="authorized">
          <div class="navbar-button" @click="search()">
            <i class="material-icons">&#xE8B6;</i>
            <span class="navbar-button__title button-search"
              >{{$t('Поиск')}}</span>
          </div>
          <div class="navbar-button" @click="intimate()">
            <i class="material-icons">&#xE0BE;</i>
            <span class="navbar-button__title button-messages"
              >{{$t('Общение')}}</span>
            <span class="menu-user__status" :class="{ active: newMessage }"></span>
          </div>
          <div class="navbar-button" @click="initial()">
            <i class="material-icons">&#xE87E;</i>
            <span class="navbar-button__title button-contacts"
              >{{$t('Знакомства')}}</span>
            <span class="menu-user__status" :class="{ active: newContact }"></span>
          </div>
        </div>
        <div class="menu-user__getlogin" v-show="!authorized" style="display: none;">
          <div class="navbar-button" @click="$router.push('/confirm-sex/register')">
            <div class="hidden-xs">
              {{$t('begin.more')}}
            </div>
            <div class="visible-xs-inline">
              {{$t('begin.less')}}
            </div>
          </div>
        </div>

        <div class="menu-user__account"
         @click="$router.push('/settings/account')"
         v-show="authorized">
          <span class="menu-user__signature" v-text="signature"></span>
          <i class="material-icons" style="font-size: 28px;">&#xE853;</i>
        </div>
        <div class="menu-user__login"
         @click="$router.push('/login')"
         v-show="!authorized">
          {{$t('Войти')}}
        </div>
      </div>
    </div>
  </nav>
</template>

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
    "Поиск": "Search",
    "Общение": "Messages",
    "Знакомства": "Dating",
    "begin": {
      "more": "Get your login and password right now",
      "less": "Get your login now"
    }
  },
  "kz": {
    "Войти": "Кіру",
    "Поиск": "Іздеу",
    "Общение": "Байланыс",
    "Знакомства": "Танысу",
    "begin": {
      "more": "Енді сіздің логиніңізді және құпия сөзіңізді алыңыз",
      "less": "Енді сіздің логиніңізді алыңыз"
    }
  },
  "ua": {
    "Войти": "Увійти",
    "Поиск": "Пошук",
    "Общение": "Спілкування",
    "Знакомства": "Знайомства",
    "begin": {
      "more": "Отримати логін і пароль прямо зараз",
      "less": "Отримати логін зараз"
    }
  }
}
</i18n>

<style lang="less">
.navbar-fixed-top {
  z-index: 1;
}

.menu-bar {
  height: 50px;
  width: 100%;
  background-color: @menu-color;
  &.glass {
    background-color: rgba(255, 255, 255, 0.2);
  }
}

.menu-user {
  max-width: 750px;
  margin: 0 auto;
  color: @white;
  &__wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }

  &__navbar {
    flex: 1 0 auto;
    display: flex;
    &-right {
      flex: 0 0 auto;
      display: flex;
    }
  }

  &__getlogin {
    flex: 1 1 auto;
    display: flex;
    overflow: hidden;
    white-space: nowrap;
  }

  &__login {
    flex: 0 0 auto;
    display: flex;
    margin: auto;
    cursor: pointer;
  }

  &__logo {
    flex: 0 0 auto;
    font-size: 18px;
    margin: auto;
    margin-right: 5px;
    cursor: pointer;
  }

  &__account {
    flex: 0 1 200px;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: flex-end;
    overflow: hidden;
    white-space: nowrap;
    margin: auto;
  }

  &__status {
    background-color: rgba(0, 0, 0, 0);
    width: 10px;
    height: 10px;
    display: inline-block;
    border-radius: 10px;
    vertical-align: middle;
    &.active {
      background-color: @white;
    }
  }
  &__signature {
    border-bottom: 1px dashed @menu-light;
    color: @menu-light;
    font-size: 15px;
    margin: 0px 5px;
    overflow: hidden;
    white-space: nowrap;
    max-width: 150px;
  }
}

.navbar-title {
  height: 50px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 0 @indent-sm;
  cursor: pointer;
  font-weight: bolder;
}

.navbar-button {
  height: 50px;
  white-space: nowrap;
  padding: 0 @indent-sm;
  display: flex;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  a {
    color: @white;
    &:hover {
      text-decoration: none;
    }
  }
  div {
    overflow: hidden;
  }
  .material-icons {
    margin: 0 @indent-xs;
    min-width: 24px;
    vertical-align: middle;
  }
  &:hover {
    background-color: @menu-hover;
  }

  &__title {
    margin: 0 @indent-xs;
    margin-left: 0;
    &.button-search {
      @media (max-width: 640px) {
        display: none;
      }
    }
    &.button-messages {
      @media (max-width: 560px) {
        display: none;
      }
    }
    &.button-contacts {
      @media (max-width: 500px) {
        display: none;
      }
    }

    &.accent {
      border-bottom: 1px dashed #bbcccc;
    }
  }
}

/*-- menu user ---------------------------------------------------------------*/

#menu-user {
  &.navbar {
    margin-bottom: 0px;
  }
}

.navbar {
  border-radius: 0px;
  &.navbar-inverse {
    background: @menu-color;
    border-width: 0px;
  }
}

.navbar-inverse {
  .navbar-nav {
    font-size: 15px;
    li {
      a {
        color: @white;
      }
      .material-icons {
        line-height: 15px;
        max-width: 24px;
        vertical-align: middle;
        position: relative;
        bottom: 1px;
      }
      &:hover {
        background: @menu-hover;
      }
    }
  }
  .navbar-text {
    color: @white;
    cursor: pointer;
  }
}

div.menu_user_outer {
  background: @menu-color;
  height: 55px;
  margin: 0 0 0 0;
  padding: 0;
  text-align: center;
  a {
    color: @light;
    text-decoration: none;
    &:hover {
      color: @white;
    }
  }
}
div.menu_user_inner {
  overflow: hidden;
  padding: 0;
  text-align: left;
  width: 1067px;
}
#home_page {
  //display: inline-block;
  //float: left;
  //margin-left: 15px;
  //margin-top: 17px;
  //width: 35px;
}
ul.menu_user,
ul.menu_user li,
ul.menu_user_right,
ul.menu_user_right li {
  list-style: none;
  display: inline-block;
  float: left;
  margin: 0;
  padding: 0;
}
ul.menu_user_right {
  float: right;
}
ul.menu_user {
  li {
    a {
      &:hover {
        background: @menu-hover;
      }
    }
  }
}

.menu-user {
  &__item {
    list-style: none;
    display: inline-block;
    float: left;
    margin: 0;
    padding: 0;

    &:hover {
      background: @menu-hover;
    }
  }
}

.menu-button {
  color: @white;
  cursor: pointer;
  display: inline-block;
  font-size: 15px;
  height: 55px;
  line-height: 55px;
  padding: 0px 10px;

  img {
    bottom: 1px;
    position: relative;
    vertical-align: middle;
  }
  .glyphicon {
    top: -1px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
}

li.menu_user_link,
li.menu_user_link_shop a {
  color: @white;
  cursor: pointer;
  display: inline-block;
  font-size: 15px;
  height: 55px;
  line-height: 55px;
  padding: 0px 10px;
}

li.menu_user_link {
  img {
    bottom: 1px;
    position: relative;
    vertical-align: middle;
  }
  .glyphicon {
    top: -1px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
}
li.menu_user_link_exit {
  float: left;
  span {
    &:hover {
      background: @menu-color;
    }
  }
}
li.menu_user_name_string {
  span {
    border-bottom: 1px dashed @menu-light;
    color: @menu-light;
    cursor: pointer;
    font-size: 15px;
    line-height: 55px;
    margin: 0px 5px;
  }
}
li.menu_user_link_shop {
  a {
    color: @gray-dark;
    font-size: 13px;
    padding-right: 15px;
  }
}
li.menu_user_link_ear {
  width: 0px;
  width: 350px;
}

/*----------------------------------------------------------------------------*/
</style>
