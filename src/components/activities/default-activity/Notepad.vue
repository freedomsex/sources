<script>
import ActivityActions from '../ActivityActions';

export default {
  data() {
    return {
      writes: [],
    };
  },
  mounted() {
    this.$store.dispatch('notes/WRITES').then((data) => {
      this.writes = data;
    });
  },
  methods: {
    cliche() {
      this.$emit('cliche');
      this.close();
    },
    select(text) {
      // this.$store.dispatch('notes/ITEM', id).then((item) => {
      // })
      // this.$store.dispatch('notes/UPDATE', {id, count: item.count});
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
    <span slot="caption">Блокнот</span>
    <div class="menu-user__navbar-right" slot="option">
      <div class="navbar-button" @click="cliche()">
        <div class="navbar-button__title accent">Шаблоны</div>
        <i class="material-icons">&#xE02F;</i>
      </div>
    </div>
    <div class="activity-section" v-if="writes && writes.length">
      <div class="list-view">
        <div class="list-view__item notepad-item" v-for="item in writes"
         @click="select(item.text)">{{item.text}}</div>
      </div>
    </div>
  </ActivityActions>
</template>

<style lang="less">
.notepad-item {
  font-style: italic;
  font-size: 14px;
}
</style>
