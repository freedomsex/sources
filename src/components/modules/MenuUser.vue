<script>
import HeaderBar from '~widgets/HeaderBar';

import InfoDialog from '~dialogs/InfoDialog';
import AppSettings from '~widgets/AppSettings';

export default {
  data() {
    return {
      attempt: 0,
      notificaton: false,
    };
  },
  computed: {
    authorized() {
      const {uid} = this.$store.state.user;
      // const {registered: reg} = this.$store.getters;
      return uid > 0 ? 1 : 0;
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
  components: {
    AppSettings,
    HeaderBar,
    InfoDialog,
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
  <HeaderBar>
    <div class="menu-user">
      <div class="menu-user__logo">
        <AppSettings/>
      </div>

      <div class="menu-user__navbar" v-show="authorized">
        <div class="menu-button" @click="$router.push('/settings/account')">
          <span class="menu-button__title limit" v-text="signature"></span>
          <i class="material-icons">&#xE853;</i>
        </div>
        <div class="menu-button" @click="notificaton = true">
          <i class="material-icons">&#xE7F4;</i>
        </div>
      </div>

      <div class="menu-button" v-show="!authorized"
        @click="$router.push('/confirm-sex/register')"
        style="display: none;">
        <div class="menu-button__title hidden-xs">
          {{$t('begin.more')}}
        </div>
        <div class="menu-button__title visible-xs-inline">
          {{$t('begin.less')}}
        </div>
      </div>

      <div class="menu-button"
       @click="$router.push('/login')"
       v-show="!authorized">
        <span class="menu-button__title">{{$t('Войти')}}</span>
      </div>
    </div>

    <InfoDialog v-if="notificaton"
      @close="notificaton = false">
      <div slot="title">Уведомлений нет</div>
      Здесь будут информационные уведомления и
      уведомления от службы поддержки.
    </InfoDialog>

  </HeaderBar>
</template>


<style lang="less">

.menu-user {
  width: 100%;
  min-height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  white-space: nowrap;
  background-color: @menu-color;
  color: @white;

  &__logo {
    // flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: 18px;
    margin: 0 5px 0 10px;
    cursor: pointer;
  }

  &__navbar {
    display: flex;
    align-items: stretch;
  }

  .menu-button {
    font-size: 0;
    display: flex;
    align-items: center;
    padding: 5px 8px;
    overflow: hidden;
    white-space: nowrap;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background-color: @menu-hover;
    }

    &__title {
      font-size: 15px;
      margin: 0px 5px;
      position: relative;
      // top: 1px;
      overflow: hidden;
      white-space: nowrap;
      // font-weight: bold;

      &.limit {
        max-width: 150px;
      }
    }

    a {
      color: #ffffff;

      &:hover {
        text-decoration: none;
      }
    }
  }
}


//
// .navbar-title {
//   height: 50px;
//   display: flex;
//   align-items: center;
//   white-space: nowrap;
//   padding: 0 @indent-sm;
//   cursor: pointer;
//   font-weight: bolder;
// }
//
// .navbar-button {
//   height: 50px;
//   white-space: nowrap;
//   padding: 0 @indent-sm;
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   overflow: hidden;
//   a {
//     color: @white;
//     &:hover {
//       text-decoration: none;
//     }
//   }
//   div {
//     overflow: hidden;
//   }
//   .material-icons {
//     margin: 0 @indent-xs;
//     min-width: 24px;
//     vertical-align: middle;
//   }
//   &:hover {
//     background-color: @menu-hover;
//   }
//
//   &__title {
//     margin: 0 @indent-xs;
//     margin-left: 0;
//     &.button-search {
//       @media (max-width: 640px) {
//         display: none;
//       }
//     }
//     &.button-messages {
//       @media (max-width: 560px) {
//         display: none;
//       }
//     }
//     &.button-contacts {
//       @media (max-width: 500px) {
//         display: none;
//       }
//     }
//
//     &.accent {
//       border-bottom: 1px dashed #bbcccc;
//     }
//   }
// }
//
// /*-- menu user ---------------------------------------------------------------*/
//
// #menu-user {
//   &.navbar {
//     margin-bottom: 0px;
//   }
// }
//
// .navbar {
//   border-radius: 0px;
//   &.navbar-inverse {
//     background: @menu-color;
//     border-width: 0px;
//   }
// }
//
// .navbar-inverse {
//   .navbar-nav {
//     font-size: 15px;
//     li {
//       a {
//         color: @white;
//       }
//       .material-icons {
//         line-height: 15px;
//         max-width: 24px;
//         vertical-align: middle;
//         position: relative;
//         bottom: 1px;
//       }
//       &:hover {
//         background: @menu-hover;
//       }
//     }
//   }
//   .navbar-text {
//     color: @white;
//     cursor: pointer;
//   }
// }
//
// div.menu_user_outer {
//   background: @menu-color;
//   height: 55px;
//   margin: 0 0 0 0;
//   padding: 0;
//   text-align: center;
//   a {
//     color: @light;
//     text-decoration: none;
//     &:hover {
//       color: @white;
//     }
//   }
// }
// div.menu_user_inner {
//   overflow: hidden;
//   padding: 0;
//   text-align: left;
//   width: 1067px;
// }
// #home_page {
//   //display: inline-block;
//   //float: left;
//   //margin-left: 15px;
//   //margin-top: 17px;
//   //width: 35px;
// }
// ul.menu_user,
// ul.menu_user li,
// ul.menu_user_right,
// ul.menu_user_right li {
//   list-style: none;
//   display: inline-block;
//   float: left;
//   margin: 0;
//   padding: 0;
// }
// ul.menu_user_right {
//   float: right;
// }
// ul.menu_user {
//   li {
//     a {
//       &:hover {
//         background: @menu-hover;
//       }
//     }
//   }
// }
//
// .menu-user {
//   &__item {
//     list-style: none;
//     display: inline-block;
//     float: left;
//     margin: 0;
//     padding: 0;
//
//     &:hover {
//       background: @menu-hover;
//     }
//   }
// }
//
// .menu-button {
//   color: @white;
//   cursor: pointer;
//   display: inline-block;
//   font-size: 15px;
//   height: 55px;
//   line-height: 55px;
//   padding: 0px 10px;
//
//   img {
//     bottom: 1px;
//     position: relative;
//     vertical-align: middle;
//   }
//   .glyphicon {
//     top: -1px;
//     position: relative;
//     display: inline-block;
//     vertical-align: middle;
//   }
// }
//
// li.menu_user_link,
// li.menu_user_link_shop a {
//   color: @white;
//   cursor: pointer;
//   display: inline-block;
//   font-size: 15px;
//   height: 55px;
//   line-height: 55px;
//   padding: 0px 10px;
// }
//
// li.menu_user_link {
//   img {
//     bottom: 1px;
//     position: relative;
//     vertical-align: middle;
//   }
//   .glyphicon {
//     top: -1px;
//     position: relative;
//     display: inline-block;
//     vertical-align: middle;
//   }
// }
// li.menu_user_link_exit {
//   float: left;
//   span {
//     &:hover {
//       background: @menu-color;
//     }
//   }
// }
// li.menu_user_name_string {
//   span {
//     border-bottom: 1px dashed @menu-light;
//     color: @menu-light;
//     cursor: pointer;
//     font-size: 15px;
//     line-height: 55px;
//     margin: 0px 5px;
//   }
// }
// li.menu_user_link_shop {
//   a {
//     color: @gray-dark;
//     font-size: 13px;
//     padding-right: 15px;
//   }
// }
// li.menu_user_link_ear {
//   width: 0px;
//   width: 350px;
// }

/*----------------------------------------------------------------------------*/
</style>
