<script>
import _ from 'underscore';

export default {
  props: ['id', 'tag', 'added'],
  data() {
    return {
      active: false,
      error: false,
    };
  },
  methods: {
    activate() {
      this.active = true;
      _.delay(() => {
        this.active = false;
      }, 3000);
    },
    select() {
      this.activate();
      this.$emit('select', this.tag);
    },
  },
};
</script>

<template>
  <div class="desire-item"
   :class="{active: active, error: error, added: added}"
   @click="select">{{tag}}</div>
</template>

<style lang="less">
.desire-item {
  background-color: @white;
  background-image: url(~static/img/icon/desire_corner.png);
  background-position: left top;
  background-repeat: no-repeat;
  border-radius: @radius-xs;
  border: 1px solid @gray;
  color: @dark-light;
  cursor: pointer;
  display: inline-block;
  font-size: @font-sm;
  font-style: normal;
  margin-bottom: @indent-sm;
  margin-right: @indent-xs;
  padding: @indent-xs+2 @indent-sm;
  line-height: 1;
  &.deleted {
    background-color: @gray;
    text-decoration: line-through;
  }
  &.active {
    background-color: @yellow-light;
    border-color: @orange-light;
  }
  &.error {
    background-color: @pink-light;
    border-color: @pink;
  }
  &.added {
    background-image: url(~static/img/icon/desire_corner_blue.png);
    border-color: @purpur-dark;
  }
  &.process {
    background: @white;
    border-color: @light;
    color: @gray-dark;
  }
}
</style>
