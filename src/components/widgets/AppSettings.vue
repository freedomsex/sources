<script>
export default {
  props: [],
  data: () => ({
    open: false,
  }),
  computed: {
    muted() {
      return this.$store.state.mute;
    },
    lang() {
      return this.$store.state.locale;
    },
  },
  methods: {
    toggle() {
      this.open = this.open != true;
    },
    refresh() {
      this.$root.redirectHome();
    },
    mute() {
      this.$store.commit('mute');
    },
    switchLang() {
      if (this.lang == 'ru') {
        this.$store.commit('lang', 'en');
      } else {
        this.$store.commit('lang', 'ru');
      }
      this.$root.updateLocale();
    },
  },
};
</script>

<i18n>
{
  "ru": {
    "refresh": "Обновить",
    "notifications": "Уведомлений нет",
    "sound": "Звук",
    "on": "включен",
    "off": "отключен",
    "lang": "Язык"
  },
  "en": {
    "refresh": "Refresh",
    "notifications": "No notifications",
    "sound": "Sound",
    "on": "on",
    "off": "off",
    "lang": "Language"
  }
}
</i18n>

<template>
  <div class="app-settings" @click="toggle">
    <img src="~static/img/logo.png"
      style="width: 27px; height: 20px; border-width: 0;"
      border="0" >
    <div class="app-settings__menu" v-show="open">
      <div class="app-settings__menu-item" @click="refresh">
        <span aria-hidden="true" class="glyphicon glyphicon-refresh"></span>
        <span>{{$t('refresh')}}</span>
      </div>
        <div class="app-settings__menu-item">
          <span aria-hidden="true" class="glyphicon glyphicon-bell"></span>
          <span>{{$t('notifications')}}</span>
        </div>
      <div class="app-settings__menu-item" @click="mute">
        <span aria-hidden="true"
         :class="!muted ? 'glyphicon-volume-up' : 'glyphicon-volume-off'"
         class="glyphicon"></span>
        <span>{{$t('sound')}} {{!muted ? $t('on') : $t('off')}}</span>
      </div>
      <div class="app-settings__menu-item" @click="switchLang">
        <span aria-hidden="true" class="glyphicon glyphicon-globe"></span>
        <span>{{$t('lang')}}</span>: {{lang}}
      </div>
    </div>
  </div>
</template>

<style lang="less">
.app-settings {
  position: relative;
  &__menu {
    min-width: 200px;
    background-color: @white;
    border: 1px solid @gray;
    position: absolute;
    margin-top: 12px;
    margin-left: -10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    &-item {
      color: @dark-light;
      vertical-align: middle;
      font-size: 14px;
      padding: @indent-sm @indent-md;
      position: relative;
      span {
        display: inline-block;
      }
      .glyphicon {
        font-size: 16px;
      }
    }
  }
}
// .dropdown-menu {
//   display: inline-block;
//   > li > a {
//     padding-left: 12px;
//   }
// }
</style>
