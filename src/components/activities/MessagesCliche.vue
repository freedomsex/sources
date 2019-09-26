<script>
import lscache from 'lscache';
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
      this.process = true;
      const result = value || this.default.tab;
      const uri = `static/json/cliche/${result}.json?v=${this.version}`;
      this.$api.res(uri, 'raw').load().then(({data}) => {
        this.texts = data;
        this.active = result;
        this.process = false;
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
      this.$store.commit('message/first', text);
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
  <ActivityActions caption="Готовые сообщения" @close="$emit('close')">
    <div class="cliche-header">
      <button class="btn btn-sm" :class="buttonStyle('public')"
       @click="load('public')">Познакомиться</button>
      <button class="btn btn-sm" :class="buttonStyle('virt')"
       @click="load('virt')">Вирт</button>
      <button class="btn btn-sm" :class="buttonStyle('sex')"
       @click="load('sex')">Секс</button>
      <span class="btn btn-link btn-sm" v-if="process">Загружаю...</span>
    </div>

    <div class="list-view" v-if="texts && texts.length">
      <div class="list-item" v-for="item in texts" @click="select(item.text)">
        <div class="list-item__body">
          {{item.text}}
        </div>
      </div>
    </div>

  </ActivityActions>
</template>

<style lang="less">
.cliche-header {
  padding: @indent-sm;
  border-bottom: 1px solid @gray-light;
}

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
