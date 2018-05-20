<script>
import ClosedActivity from '~closed-activity/ClosedActivity';
import CitySuggest from '~modules/CitySuggest';
import AccountSettings from './AccountSettings';

export default {
  extends: AccountSettings,
  data() {
    return {
      cities: [
        'Москва',
        'Санкт-Петербург',
        'Минск',
        'Алматы',
        'Краснодар',
        'Екатеринбург',
        'Новосибирск',
        'Киев',
        'Омск',
        'Воронеж',
        'Нижний Новгород',
        'Бишкек',
        'Челябинск',
        'Самара',
        'Красноярск',
        'Уфа',
        'Казань',
        'Иркутск',
        'Волгоград',
        'Харьков',
        'Саратов',
        'Ростов-на-Дону',
        'Одесса',
        'Барнаул',
        'Пермь',
        'Тюмень',
        'Ташкент',
        'Гомель',
        'Томск',
        'Хабаровск',
        'Тольятти',
        'Астана',
        'Ставрополь',
        'Тула',
        'Астрахань',
        'Гродно',
        'Пенза',
        'Оренбург',
        'Владивосток',
        'Чита',
        'Рязань',
        'Караганда',
        'Тверь',
        'Ульяновск',
        'Кемерово',
        'Сургут',
        'Ярославль',
        'Улан-Удэ',
        'Брянск',
        'Шымкент',
        'Витебск',
        'Симферополь',
        'Калининград',
        'Сочи',
        'Липецк',
        'Ижевск',
        'Курск',
        'Белгород',
        'Павлодар',
        'Брест',
        'Могилев',
        'Запорожье',
        'Киров',
        'Новокузнецк',
        'Кривой Рог',
        'Калуга',
        'Усть-Каменогорск',
        'Севастополь',
        'Тамбов',
        'Днепропетровск',
        'Чебоксары',
        'Иваново',
        'Смоленск',
        'Донецк',
        'Душанбе',
        'Владимир',
        'Орел',
        'Магнитогорск',
        'Кострома',
        'Нижневартовск',
      ],
    };
  },
  methods: {
    select(city) {
      this.saveCity(city);
      this.back();
    },
    close() {
      this.saveCity();
      this.back();
    },
  },
  components: {
    ClosedActivity,
    CitySuggest,
  },
};
</script>

<template>
  <ClosedActivity @close="close">
    <span slot="caption">Мой город</span>
    <div class="activity-section">
      <div class="form-inline">
        <CitySuggest :city="selectCity" @select="select"/>
      </div>
    </div>
    <div class="activity-section">
      <span class="city-list__item btn btn-default btn-xs"
       v-for="item in cities"
       @click="select(item)"> {{item}} </span>
    </div>
  </ClosedActivity>
</template>

<style lang="less">
</style>
