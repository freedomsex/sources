<script>
import lscache from 'lscache';
import api from '~config/api';
import ActivityActions from '~activities/ActivityActions';

export default {
  data() {
    return {
      texts: [],
      version: 3,
      active: null,
      process: true,
      default: {
        size: 12,
        color: '4E8714',
        tab: 'public',
      },
    };
  },
  mounted() {
    const active = lscache.get('cliche-active');
    this.load(active);
  },
  methods: {
    load(value) {
      const result = value || this.default.tab;
      api.raw.load(null, `static/json/cliche/${result}.json?v=${this.version}`).then(({data}) => {
        this.texts = data;
        this.active = result;
        lscache.set('cliche-active', this.active, 3 * 24 * 60 * 60);
      });
    },
    size(value) {
      const result = value ? this.default.size + value : this.default.size;
      return `${result}px`;
    },
    color(value) {
      const result = value || this.default.color;
      return `#${result}`;
    },
    style(item) {
      return {
        fontSize: this.size(item.size),
        color: this.color(item.color),
      };
    },
    buttonStyle(value) {
      return this.active == value ? 'btn-primary' : 'btn-default';
    },
    select(text) {
      this.$store.commit('message/saveFirst', text);
      this.$emit('select', text);
      this.$emit('close');
    },
  },
  components: {
    ActivityActions,
  },
};
</script>

<template>
  <ActivityActions type="wrapped" @close="$emit('close')">
    <span slot="caption">Готовые сообщения</span>
    <div class="activity-section">
      <button class="btn btn-sm" :class="buttonStyle('public')"
       @click="load('public')">Познакомиться</button>
      <button class="btn btn-sm" :class="buttonStyle('virt')"
       @click="load('virt')">Вирт</button>
      <button class="btn btn-sm" :class="buttonStyle('sex')"
       @click="load('sex')">Секс</button>
    </div>
    <div class="activity-section" v-if="texts && texts.length">
      <span class="cliche-item" :style="style(item)" @click="select(item.text)"
       v-for="item in texts" >{{item.text}}</span> &nbsp;
    </div>
    <div class="activity__loader" v-else>Загружаю...</div>
  </ActivityActions>
</template>

<style lang="less">
.cliche-item {
  line-height: 2;
  margin-right: @indent-sm;
  margin-bottom: @indent-xs;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-color: @gray;
  cursor: pointer;
}
</style>
