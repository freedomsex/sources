<script>
import Languages from '~assets/Languages';
import InfoDialog from '~dialogs/InfoDialog';
import ActivityActions from '~activities/ActivityActions';

export default {
  data: () => ({
    alert: false,
  }),
  computed: {
    lang() {
      return this.$store.state.locale;
    },
    list() {
      return Languages;
    },
  },
  methods: {
    switchLang(locale) {
      this.$store.commit('lang', locale);
      this.$root.updateLocale();
      this.alert = true;
    },
    close() {
      this.alert = false;
      this.$emit('close');
    },
  },
  components: {
    ActivityActions,
    InfoDialog,
  },
};
</script>

<i18n>
{
  "ru": {
    "alert": "Перевод не полный. Использован машинный перевод. Создайте тему на форуме или напишите разработчикам, чтобы исправить."
  },
  "en": {
    "Язык": "Language",
    "alert": "Translation is not complete. Machine translation was used. Create a topic on the forum or write to the developers to fix it."
  },
  "kz": {
    "Язык": "Тіл",
    "alert": "Аударма аяқталған жоқ. Машиналық аударма пайдаланылды. Форумда тақырып жасаңыз немесе оны түзетуге әзірлеушілерге жазыңыз."
  },
  "ua": {
    "Язык": "Мова",
    "alert": "Переклад не повний. Використаний машинний переклад. Створіть тему на форумі або напишіть розробникам, щоб виправити."
  }
}
</i18n>

<template>
  <ActivityActions @close="$emit('close')">
    <span slot="caption">{{$t('Язык')}}</span>
      <div class="activity-section">
        <div class="list-view">
          <div class="list-item" v-for="(item, index) in list"
           @click="switchLang(index)"
           :key="index">
            <input type="radio" :checked="index == lang">
            {{item}}
          </div>
        </div>
      </div>

      <InfoDialog v-if="alert"
        @close="close">
        {{$t('alert')}}
      </InfoDialog>
  </ActivityActions>
</template>

<style lang="less">
.list-view {
  .list-item {
    input {
      margin: 0;
      margin-right: 5px;
    }
  }
}
</style>
