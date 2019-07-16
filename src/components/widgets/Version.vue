<script>
import axios from 'axios';
import ConfirmDialog from '~dialogs/ConfirmDialog';

export default {
  props: [],
  components: {
    ConfirmDialog,
  },
  data: () => ({
    updated: null,
    delay: 15,
    skip: false,
    version: null,
    hosted: null,
    major: false,
    minor: false,
    patch: false,
  }),
  watch: {
    $route() {
      this.request();
    },
  },
  mounted() {
    this.reset();
    this.updated = this.now();
    this.version = APP_VERSION;
    this.hosted = this.version;
  },
  updated() {
    this.request();
  },
  computed: {
    misc() {
      return this.major || this.minor || this.patch;
    },
    alert() {
      return this.major || this.minor;
    },
    style() {
      if (this.major) {
        return 'major';
      } if (this.minor) {
        return 'minor';
      }
      return '';
    },
  },
  methods: {
    now() {
      return String(new Date().getTime()).slice(0, -3);
    },
    expect() {
      return (this.now() - this.updated) > this.delay;
    },
    request() {
      if (this.expect()) {
        axios.get('/sync/version').then(({data}) => {
          this.handle(data.version);
        });
      }
    },
    handle(version) {
      this.hosted = version;
      this.updated = this.now();
      const current = this.version.split('.', 3);
      const hosted = version.split('.', 3);
      this.major = (current[0] !== hosted[0]);
      this.minor = (current[1] !== hosted[1]);
      this.patch = (current[2] !== hosted[2]);
      this.notify();
    },
    notify(force) {
      if (force || this.alert) {
        this.$store.commit('updateAvailable', 1);
      }
    },
    reset() {
      this.$store.commit('updateAvailable', 0);
    },
    refresh() {
      this.skip = false;
      this.request();
    },
    force() {
      this.skip = false;
      this.major = true;
      this.notify(true);
    },
  },

  created() {
    global.addEventListener('focus', this.refresh);
  },
  destroyed() {
    global.removeEventListener('focus', this.refresh);
  },
};
</script>

<i18n>
{
  "en": {
    "refresh": "Reload",
    "caption": "New version",
    "message": "A new version is available. Please refresh the page. The old version may not work stably.",
    "needed": "Refresh page",
    "details": {
      "patch": "Minor site changes.",
      "minor": "Some interface changes.",
      "major": "Significant interface changes."
    }
  },
  "kz": {
    "refresh": "Жаңарту",
    "caption": "Жаңа нұсқа",
    "message": "Жаңа нұсқа қол жетімді. Пожалуйста, бетті жаңартыңыз. Ескі нұсқасы тұрақсыз болуы мүмкін.",
    "needed": "Жаңарту бетін",
    "details": {
      "patch": "Өзгерістер аз.",
      "minor": "Кейбір интерфейс өзгереді.",
      "major": "Айтарлықтай интерфейс өзгереді."
    }
  },
  "ua": {
    "refresh": "Оновити",
    "caption": "Нова версія",
    "message": "Доступна нова версія. Будь ласка, поновіть сторінку. Стара версія може працювати нестабільно.",
    "needed": "Оновлення сторінку",
    "details": {
      "patch": "Зміни незначні.",
      "minor": "Деякі зміни інтерфейсу.",
      "major": "Значні зміни інтерфейсу."
    }
  },
  "ru": {
    "refresh": "Обновить",
    "caption": "Новая версия",
    "message": "Доступна новая версия. Пожалуйста, обновите страницу. Старая версия может работать нестабильно.",
    "needed": "Обновите страницу",
    "details": {
      "patch": "Изменения незначительные.",
      "minor": "Некоторые изменения интерфейса.",
      "major": "Значимые изменения интерфейса."
    }
  }
}
</i18n>

<template>
  <div>
    <div class="version-status">
      <div class="version-status__info" :class="style" @click="refresh">
        <span class="glyphicon glyphicon-remove-sign major" v-if="major"></span>
        <span class="glyphicon glyphicon-exclamation-sign minor" v-else-if="minor"></span>
        <span class="glyphicon glyphicon-exclamation-sign patch" v-else-if="patch"></span>
        <span class="glyphicon glyphicon-ok-sign" v-else></span>
        {{version}}
        <span v-show="misc">
          → {{hosted}}
          <span class="splitter"> • </span>
          <b>{{$t('needed')}}</b>
        </span>
      </div>
    </div>

    <ConfirmDialog v-if="!skip && alert" :yesText="$t('refresh')" style="z-index: 1000;"
      @confirm="$root.redirectHome()"
      @close="skip = true">
      <div slot="title">{{$t('caption')}}</div>
         {{$t('message')}}
         <span v-if="major">{{$t('details.major')}}</span>
         <span v-else-if="minor">{{$t('details.minor')}}</span>
         <span v-else-if="patch">{{$t('details.patch')}}</span>
    </ConfirmDialog>

  </div>
</template>

<style lang="less">
.version-status {
  position: relative;
  text-align: center;

  @major-color: @red-dark;
  @minor-color: @orange-dark;

  &__info {
    display: inline-block;
    padding: 5px 10px;

    &.major {
      border: 2px solid @major-color;
      border-radius: 10px;
    }
    &.minor {
      border: 2px solid @minor-color;
      border-radius: 10px;
    }
  }


  .splitter {
    color: @gray-dark;
    padding: 0 @indent-xs;
    line-height: 1;
  }

  .glyphicon {
    position: relative;
    line-height: 1;
    margin-right: 3px;
    // font-size: 16px;
    color: @green-dark;
    top: 2px;

    &.major {
      color: @major-color;
    }
    &.minor {
      color: @minor-color;
    }
    &.patch {
      color: @purpur-dark;
    }
  }
}
</style>
