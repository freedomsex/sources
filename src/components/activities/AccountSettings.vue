<script>
import Vuex from 'vuex';
import _ from 'underscore';
import InfoDialog from '~dialogs/InfoDialog';
import SuggestInput from '~modules/SuggestInput';
import ActivityActions from '~activities/ActivityActions';
import UploadProfilePhoto from '~activities/photos/UploadProfilePhoto';

export default {
  props: ['root'],
  data() {
    return {
      selectCity: '',
      selectSex: 0,
      selectAge: 0,
      selectName: '',
      nameAlert: false,
      sexAlert: {
        show: false,
        ignore: false,
      },
    };
  },
  components: {
    ActivityActions,
    InfoDialog,
    SuggestInput,
    UploadProfilePhoto,
  },
  mounted() {
    // do something after mounting vue instance
    // console.log(this.$store.state.user.sex);
    // console.log(this.sex);
  },
  computed: Vuex.mapState({
    sex(state) {
      const sex = Number(state.user.sex);
      if (sex) {
        return sex == 1 ? 1 : 2;
      }
      return 0;
    },
    city(state) {
      return state.user.city;
    },
    age(state) {
      return state.user.age;
    },
    name(state) {
      const {name} = state.user;
      const auto = !name && this.sex ? this.autoName() : '';
      return name || auto;
    },
    range: () => _.range(18, 81),
  }),
  created() {
    /* globals defaultSettings:false */
    const {city, age} = defaultSettings; // TODO: GLOBAL defaultSettings var
    this.selectCity = this.city ? this.city : city;
    this.selectAge = this.age ? this.age : age;
    this.selectSex = this.sex;
    this.selectName = this.name;
  },
  methods: {
    autoName() {
      const variant = [];
      variant[1] = ['Саша', 'Дима', 'Сергей', 'Иван', 'Максим', 'Валера', 'Николай'];
      variant[2] = ['Оля', 'Юля', 'Настя', 'Алена', 'Катя', 'Маргарита', 'Татьяна'];
      const x = Math.floor(Math.random() * 7);
      return this.sex ? variant[this.sex][x] : '';
    },
    saveSex() {
      this.$service.run('user/sex', {sex: this.selectSex, token: null});
      this.resetName();
    },
    sexPrerequisites() {
      if (!this.sexAlert.ignore) {
        this.sexAlert.show = true;
      }
    },
    saveCity(city) {
      if (city) {
        this.selectCity = city;
      }
      if (this.selectCity !== this.city) {
        this.$service.run('user/city', this.selectCity);
        this.$root.reload();
      }
    },
    saveAge() {
      if (this.selectAge !== this.age) {
        this.$service.run('user/age', this.selectAge);
      }
    },
    saveName(name) {
      this.selectName = name;
      this.$service.run('user/name', name).catch(() => {
        this.resetName();
        this.nameAlert = true;
      });
    },
    resetName() {
      this.selectName = this.name;
    },
    randomAge() {
      this.selectAge = _.random(19, 30);
      this.saveAge();
    },
    save() {
      this.saveCity();
      this.saveAge();
      this.saveName(this.selectName);
    },
    close() {
      this.save();
      this.$emit('close');
      // --
    },
  },
};
</script>

<template>
  <ActivityActions caption="Аккаунт" type="wrapped" @close="close">

    <template slot="option">
      <UploadProfilePhoto />
    </template>

    <div class="activity-section">
      <div class="activity-section__title">Мой город:</div>
      <div class="form-inline">
        <SuggestInput url="town/suggest"
         title="Введите название"
         :default="selectCity"
         @select="saveCity"/>
      </div>
    </div>

    <div class="activity-section">
      <div class="activity-section__title">Кто вы:</div>
      <div class="radio">
        <span @click="sexPrerequisites">
          <label class="radio-inline">
            <input type="radio" v-model.number="selectSex"
            @change.prevent="saveSex"
            :disabled="!sexAlert.ignore"
            :value="2">
            Девушка
          </label>
          <label class="radio-inline">
            <input type="radio" v-model.number="selectSex"
            @change.prevent="saveSex"
            :disabled="!sexAlert.ignore"
            :value="1">
            Парень
          </label>
        </span>
      </div>
    </div>

    <InfoDialog v-if="sexAlert.show && !sexAlert.ignore"
     @close="sexAlert.show = false"
     @confirm="sexAlert.ignore = true">
     <div slot="title">Не меняйте ваш пол</div>
      Вы сможете изменить пол, но это может привести
      к блокированию анкеты в будущем. Заведите новую анкету
      если указан не ваш пол.
    </InfoDialog>

    <div class="activity-section">
      <div class="activity-section__title">Возраст:</div>
      <div class="form-inline">
        <select class="form-control" v-model.number="selectAge" @change="saveAge">
          <option v-for="(item, index) in range"
           :value="item" >{{item ? item : ''}}</option>
        </select>
        <button class="btn btn-success" v-if="!selectAge" @click="randomAge()">
          <span aria-hidden="true" class="glyphicon glyphicon-arrow-left"></span>
        </button>
      </div>
    </div>

    <div class="activity-section">
      <div class="activity-section__title">Имя:</div>
      <div class="form-inline">
        <SuggestInput url="name/suggest"
         :default="selectName"
         :params="{sex}"
         title="Ваше имя"
         @select="saveName"/>
      </div>

      <InfoDialog @close="nameAlert = false" v-if="nameAlert">
        Есть ограничение, вы можете указать простое, обычное имя.
        Некоторые могут не сохраниться и это нормально.
        Можно указать не своё, любое.
      </InfoDialog>

    </div>

    <div class="activity-section">
      <div class="activity-section__tile">
        <span class="activity-section__link" @click="$router.push('other')">
          Другие настройки
        </span>
      </div>
      <div class="activity-section__tile">
        <span class="activity-section__link" @click="$router.push('/login')">
          Уже есть анкета?
        </span>
      </div>
    </div>

  </ActivityActions>
</template>

<style lang="less">
.city-list__item {
  margin: 0 @indent-xs @indent-xs 0;
}
</style>
