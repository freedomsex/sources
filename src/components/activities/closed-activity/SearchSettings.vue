<script>
import Vuex from 'vuex';
import _ from 'underscore';
import Tooltip from '~widgets/Tooltip';
import ClosedActivity from './ClosedActivity';

export default {
  extends: ClosedActivity,
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
  computed: Vuex.mapState({
    userSex: state => Number(state.user.sex), // GLOBAL
    who() {
      if (this.userSex) {
        return this.userSex == 1 ? 2 : 1;
      } // [~!!!~] READ_ONLY
      return 0;
    },
    city(state) {
      /* globals defaultSettings:false */
      const {city} = defaultSettings; // TODO: GLOBAL defaultSettings var
      return state.user.city ? state.user.city : city; // [~!!!~] READ_ONLY
    },
    up(state) {
      return this.age(state.user.up);
    },
    to(state) {
      return this.age(state.user.to);
    },
    any(state) {
      return state.user.any;
    },
    virt(state) {
      return state.user.virt == true;
    },
    virgin(state) {
      // Хак для пустых настроек
      if (state.user.city != this.city) {
        return false;
      }
      // Хак для старых настроек NOT Range
      if (state.user.up != this.up) {
        return false;
      }
      if (state.user.to != this.to) {
        return false;
      }
      return (
        this.selectCity == this.city &&
        this.selectUp == this.up &&
        this.selectTo == this.to &&
        this.checkedAny == this.any &&
        this.checkedVirt == this.virt
      );
    },
  }),
  created() {
    const {city, up, to} = defaultSettings; // GLOBAL
    this.selectCity = this.city ? this.city : city;
    this.selectUp = this.up ? this.up : this.age(up);
    this.selectTo = this.to ? this.to : this.age(to);
    this.checkedAny = this.any;
    this.checkedVirt = this.virt;
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
      console.log(data);
      if (!this.virgin) {
        this.$store.dispatch('SAVE_SEARCH', data);
        console.log(this.$store.state.user);
      }
    },
    close() {
      this.save();
      this.back();
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
    ClosedActivity,
    Tooltip,
  },
};
</script>

<template>
  <ClosedActivity @close="close">
    <span slot="caption">Настроить поиск</span>
    <div class="activity-section">
      <div class="activity-section__title">Мой город:</div>
      <div class="form-inline" @click="$router.push({path: 'account', query: {back: 'search'}})">
        <input class="form-control" type="text" :value.trim="city" disabled>
        <button class="btn btn-default"> Изменить </button>
      </div>
    </div>


    <div class="activity-section">
      <div>
        <label>
          <input type="checkbox" v-model="checkedAny" @change="tooltipAnyForce()">
          Искать в любом городе
        </label>
        <Tooltip :force="tooltip.any" @close="tooltip.any = false"
          text="Мы находим для вас подходящие анкеты в вашем городе.
          Если вы хотите искать по всем городам, отметьте эту настройку."/>
      </div>
      <div>
        <label>
          <input type="checkbox" v-model="checkedVirt" @change="tooltipVirtForce()">
          Виртуальный секс
        </label>
        <Tooltip :force="tooltip.virt" @close="tooltip.virt = false"
          text="Наш сайт для реальных знакомств. Отметьте опцию,
          если хотите попробовать виртуальный секс.
          Предлагать вирт всем подряд запрещено."/>
      </div>
    </div>

    <div class="activity-section">
      <div class="activity-section__title">Возраст:</div>
      <div class="form-inline">
        <div class="input-group">
          <div class="input-group-addon">От</div>
          <select class="form-control" v-model.number="selectUp">
            <option v-for="(item, index) in ageRange" :value="item" >{{item ? item : ''}}</option>
          </select>
        </div> &nbsp; - &nbsp;

        <div class="input-group">
          <div class="input-group-addon">До</div>
          <select class="form-control" v-model.number="selectTo">
            <option v-for="(item, index) in ageRange" :value="item" >{{item ? item : ''}}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="activity-section">
      <span class="activity-section__link"
       @click="$router.push('/help/heterosexual')">Парни находят девушек</span>
      <span class="activity-section__link"
       @click="$router.push('/help/how-it-works')">Больше возможностей</span>
    </div>

  </ClosedActivity>
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
