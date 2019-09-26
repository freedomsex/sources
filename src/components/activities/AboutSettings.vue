<script>
import Vuex from 'vuex';
import ActivityActions from '~activities/ActivityActions';

export default {
  props: [],
  data() {
    return {
      inputGrowth: '',
      inputWeight: '',
      selectFigure: null,
      process: false,
      virgin: true,
    };
  },
  computed: Vuex.mapState({
    growth(state) {
      return state.about.growth;
    },
    weight(state) {
      return state.about.weight;
    },
    figure(state) {
      return state.about.figure;
    },
  }),
  mounted() {
    this.$service.run('user/anketa').then(() => {
      this.init();
      this.process = false;
    }).catch(() => {
      this.process = false;
    });
    this.process = true;
    this.init();
  },
  methods: {
    init() {
      this.inputGrowth = this.growth ? this.growth : '';
      this.inputWeight = this.weight ? this.weight : '';
      this.selectFigure = this.figure;
    },
    deflower() {
      this.virgin = false;
    },
    close() {
      this.save();
      this.$emit('close');
    },
    save() {
      if (!this.virgin) {
        this.$service.run('user/about', {
          growth: this.inputGrowth,
          weight: this.inputWeight,
          figure: this.selectFigure,
        });
      }
    },
  },
  components: {
    ActivityActions,
  },
};
</script>

<template>
  <ActivityActions caption="Данные" type="wrapped" @close="close">
    <div class="activity-section">
      <div class="activity-section__title">Ваш рост</div>
      <div class="form-inline">
        <div class="input-group">
          <input class="form-control" type="text" size="3"
           v-model.number="inputGrowth" @change="deflower" :disabled="process">
          <div class="input-group-addon">См</div>
        </div>
      </div>
    </div>
    <div class="activity-section">
      <div class="activity-section__title">Ваш вес</div>
      <div class="form-inline">
        <div class="input-group">
          <input class="form-control" type="text" size="3"
           v-model.number="inputWeight" @change="deflower" :disabled="process">
          <div class="input-group-addon">Кг</div>
        </div>
      </div>
    </div>
    <div class="activity-section">
      <div class="activity-section__title">Телосложение, фигура</div>
      <div class="radio">
        <label>
          <input type="radio" id="input-figure"
           v-model.number="selectFigure" value="2" @change="deflower" :disabled="process">
          Спортивная
        </label>
      </div>
      <div class="radio">
        <label>
          <input type="radio" id="input-figure"
           v-model.number="selectFigure" value="3" @change="deflower" :disabled="process">
          Обычная
        </label>
      </div>
      <div class="radio">
        <label>
          <input type="radio" id="input-figure"
           v-model.number="selectFigure" value="5" @change="deflower" :disabled="process">
          Полная
        </label>
      </div>
      <div class="radio">
        <label>
          <input type="radio" id="input-figure"
           v-model.number="selectFigure" value="6" @change="deflower" :disabled="process">
          Худая
        </label>
      </div>
      <div class="radio">
        <label>
          <input type="radio" id="input-figure"
           v-model.number="selectFigure" value="0" @change="deflower" :disabled="process">
          Не указывать
        </label>
      </div>
    </div>

  </ActivityActions>
</template>

<style lang="less">
</style>
