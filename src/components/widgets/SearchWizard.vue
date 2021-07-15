<script>
import Vuex from 'vuex';

export default {
  data() {
    return {
      //
    };
  },
  computed: Vuex.mapState({
    range(state) {
      const {up, to} = state.search;
      let range = '';
      if (up && to) {
        range = `${up} - ${to}`;
      } else if (up && !to) {
        range = ` ${this.$t('up')} ${up}`;
      } else if (!up && to) {
        range = ` ${this.$t('to')} ${to}`;
      }
      return range ? this.$t('ageRange', {range}) : '';
    },
    who(state) {
      const {sex} = state.user;
      let who = this.$t('anyBody');
      if (sex) {
        who = sex == 2 ? this.$t('guy') : this.$t('girl');
      }
      return who;
    },
    say(state) {
      const where = state.user.city ? '' : this.$t('anyCity');
      return this.who + this.range + where;
    },
    desires() {
      const count = this.$store.state.desires.list.length;
      return count || 0;
    },
  }),
  mounted() {},
};
</script>

<i18n>
{
  "ru": {
    "settings": "Настроить поиск",
    "anyBody": " знакомства с кем угодно ",
    "ageRange": " в возрасте {range} лет ",
    "up": "от",
    "to": "до",
    "guy": " знакомства с парнем ",
    "girl": " знакомства с девушкой ",
    "anyCity": ", из любого города "
  },
  "en": {
    "Вы ищете": "Your search",
    "settings": "Customize search",
    "Желания": "Desires",
    "anyBody": " dating anyone ",
    "ageRange": " at the age of {range} years ",
    "up": "up",
    "to": "to",
    "guy": " dating with a guy ",
    "girl": " dating with a girl ",
    "anyCity": ", from any city "
  },
  "kz": {
    "Вы ищете": "Сіз іздейсіз",
    "settings": "Іздеуді теңшеу",
    "Желания": "Қалаулар",
    "anyBody": " кез келген адаммен танысу ",
    "ageRange": " жастағы {range} жыл ",
    "up": "бастап",
    "to": "дейін",
    "guy": " жігітпен танысу ",
    "girl": " қызбен танысу ",
    "anyCity": ", кез келген қаладан "
  },
  "ua": {
    "Вы ищете": "Ви шукаєте",
    "settings": "Налаштувати пошук",
    "Желания": "Бажання",
    "anyBody": " знайомства з ким завгодно ",
    "ageRange": " у віці {range} років ",
    "up": "від",
    "to": "до",
    "guy": " знайомства з хлопцем ",
    "girl": " знайомства з дівчиною ",
    "anyCity": ", з будь-якого міста "
  }
}
</i18n>

<template>
  <nav class="search-wizard">
    <div @click="$router.push('/settings/search')" style="display: none;" v-show="say">
      <i class="material-icons">&#xE8B4;</i>
      {{ $t('Вы ищете') }}: {{ say }} &nbsp;
      <div class="clearfix visible-xs"></div>
      <button class="btn btn-primary btn-sm">
        <span aria-hidden="true" class="glyphicon glyphicon-cog"></span>
        {{ $t('settings') }}
      </button>
      <button class="btn btn-default btn-sm" @click.stop="$router.push('/settings/desires')">
        <span aria-hidden="true" class="glyphicon glyphicon-flash"></span>
        {{ $t('Желания') }} ({{ desires }})
      </button>
    </div>
  </nav>
</template>

<style lang="less">
.search-wizard {
  padding: @indent-md @indent-md;
  text-align: center;
  margin-top: 0px;
  color: @dark-light;
  min-height: 30px;
  border-bottom: 2px solid @gray-light;

  .material-icons {
    vertical-align: middle;
    position: relative;
    top: -3px;
  }
  .clearfix {
    margin-bottom: @indent-xs;
  }
}
</style>
