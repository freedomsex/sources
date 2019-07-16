<script>
import _ from 'underscore';
import Tooltip from '~widgets/Tooltip';
import ActivityActions from '~activities/ActivityActions';

export default {
  props: ['root'],
  data() {
    return {
      ageRange: [0, 16, 17, 18, 20, 23, 25, 27, 30, 35, 40, 45, 50, 60, 80],
      selectUp: 0,
      selectTo: 0,
      selectCity: '',
      checkedAny: 0,
      checkedVirt: 0,
      tooltip: {
        any: false,
        virt: false,
      },
    };
  },
  created() {
    const {city, up, to} = global.defaultSettings; // GLOBAL
    this.selectCity = this.city ? this.city : city;
    this.selectUp = this.up ? this.up : this.age(up);
    this.selectTo = this.to ? this.to : this.age(to);
    this.checkedAny = this.any;
    this.checkedVirt = this.virt;
  },
  computed: {
    userSex() {
      return Number(this.$store.state.user.sex);
    },
    who() {
      if (this.userSex) {
        return this.userSex == 1 ? 2 : 1;
      } // [~!!!~] READ_ONLY
      return 0;
    },
    city() {
      const {city} = global.defaultSettings; // TODO: GLOBAL defaultSettings var
      return this.$store.state.user.city ? this.$store.state.user.city : city; // [~!!!~] READ_ONLY
    },
    up() {
      return this.age(this.$store.state.search.up);
    },
    to() {
      return this.age(this.$store.state.search.to);
    },
    any() {
      return this.$store.state.search.any;
    },
    virt() {
      return this.$store.state.search.virt == true;
    },
    virgin() {
      // Хак для пустых настроек
      if (this.$store.state.user.city != this.city) {
        return false;
      }
      // Хак для старых настроек NOT Range
      if (this.$store.state.search.up != this.up) {
        return false;
      }
      if (this.$store.state.search.to != this.to) {
        return false;
      }
      return (
        this.selectCity == this.city
        && this.selectUp == this.up
        && this.selectTo == this.to
        && this.checkedAny == this.any
        && this.checkedVirt == this.virt
      );
    },
  },
  methods: {
    age(age) {
      const value = Number(age);
      if (!value) {
        return 0;
      }
      const min = _.min(this.ageRange);
      const max = _.max(this.ageRange);
      if (value <= min) {
        return min;
      }
      if (value >= max) {
        return max;
      }
      return _.find(this.ageRange, (item, index, list) => {
        if (index && index < list.length) {
          if (value > list[index - 1] && value < list[index + 1]) {
            return true;
          }
        }
        return false;
      });
    },
    save() {
      const data = {
        up: this.selectUp,
        to: this.selectTo,
        any: this.checkedAny,
        virt: this.checkedVirt,
      };
      if (!this.virgin) {
        this.$store.dispatch('SAVE_SEARCH', data);
        this.$store.commit('search/restore', data);
      }
    },
    close() {
      this.save();
      this.$emit('close');
      this.$root.reload();
    },
    tooltipAnyForce() {
      if (this.checkedAny) {
        this.tooltip.any = true;
      }
    },
    tooltipVirtForce() {
      if (this.checkedVirt) {
        this.tooltip.virt = true;
      }
    },
  },
  components: {
    ActivityActions,
    Tooltip,
  },
};
</script>

<i18n>
{
  "ru": {
    "settings": "Настроить поиск",
    "myCity": "Мой город",
    "change": "Изменить",
    "anyCity": "Искать в любом городе",
    "anyHint": "Мы находим для вас подходящие анкеты в вашем городе. Если вы хотите искать по всем городам, отметьте эту настройку.",
    "virt": "Виртуальный секс",
    "virtHint": "Наш сайт для реальных знакомств. Отметьте опцию, если хотите попробовать виртуальный секс. Предлагать вирт всем подряд запрещено.",
    "age": "Возраст",
    "up": "От",
    "to": "До",
    "hetero": "Парни находят девушек",
    "more": "Больше возможностей"
  },
  "en": {
    "settings": "Customize search",
    "myCity": "My city",
    "change": "Change",
    "anyCity": "Search in any city",
    "anyHint": "We find suitable profiles for you in your city. If you want to search in all cities, check this box.",
    "virt": "Virtual sex",
    "virtHint": "Our site for real dating. Check the box if you want to try virtual sex. It is forbidden to offer Wirth all to one.",
    "age": "Age",
    "up": "Up",
    "to": "To",
    "hetero": "Guys find girls",
    "more": "More possibilities"
  }
}
</i18n>

<template>
  <ActivityActions :caption="$t('settings')" type="wrapped" @close="close">
    <div class="activity-section">
      <div class="activity-section__title">{{$t('myCity')}}:</div>
      <div class="form-inline" @click="$router.push({path: 'account', query: {back: 'search'}})">
        <input class="form-control" type="text" :value.trim="city" disabled>
        <button class="btn btn-default"> {{$t('change')}} </button>
      </div>
    </div>


    <div class="activity-section">
      <div>
        <label>
          <input type="checkbox" v-model="checkedAny"
           @change="tooltipAnyForce()">
          {{$t('anyCity')}}
        </label>
        <Tooltip :force="tooltip.any"
         @close="tooltip.any = false">
          {{$t('anyHint')}}
        </Tooltip>
      </div>
      <div>
        <label>
          <input type="checkbox" v-model="checkedVirt"
           @change="tooltipVirtForce()">
          {{$t('virt')}}
        </label>
        <Tooltip :force="tooltip.virt"
         @close="tooltip.virt = false">
          {{$t('virtHint')}}
        </Tooltip>
      </div>
    </div>

    <div class="activity-section">
      <div class="activity-section__title">{{$t('age')}}:</div>
      <div class="form-inline">
        <div class="input-group">
          <div class="input-group-addon">{{$t('up')}}</div>
          <select class="form-control" v-model.number="selectUp">
            <option v-for="(item, index) in ageRange" :value="item" >{{item ? item : ''}}</option>
          </select>
        </div> &nbsp; - &nbsp;

        <div class="input-group">
          <div class="input-group-addon">{{$t('to')}}</div>
          <select class="form-control" v-model.number="selectTo">
            <option v-for="(item, index) in ageRange" :value="item" >{{item ? item : ''}}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="activity-section">
      <div class="activity-section__tile">
        <span class="activity-section__link"
         @click="$router.push('/help/heterosexual')">
          {{$t('hetero')}}
        </span>
      </div>
      <div class="activity-section__tile">
        <span class="activity-section__link"
         @click="$router.push('/help/how-it-works')">
          {{$t('more')}}
        </span>
      </div>
    </div>

  </ActivityActions>
</template>

<style lang="less">
.town_line {
  color: @dark;
  font-size: 11px;
  padding: 3px 4px;
  b {
    font-size: 12px;
  }
  i {
    font-size: 10px;
  }
  &:hover {
    background: DodgerBlue;
    color: White;
  }
}
.suggest_wrap {
  display: block;
  margin: 0px;
  position: relative;
}
.suggest_block {
  background: White;
  border: 1px solid DarkGray;
  cursor: pointer;
  display: none;
  left: 0px;
  margin: 0px;
  max-height: 400px; // TODO: suggest_block - что это за размер
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  right: 0px;
  text-align: left;
  z-index: 100;
}
.suggest_line {
  color: @dark;
  font-size: 11px;
  padding: 3px 4px;
  &:hover {
    background: DodgerBlue;
    color: White;
  }
}
</style>
