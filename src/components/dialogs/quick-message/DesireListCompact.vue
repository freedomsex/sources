<script>
export default {
  props: ['tags'],
  methods: {
    count() {
      return this.tags.length > 0;
    },
  },
};
</script>

<template>
  <div class="desires-compact" v-show="count" @click="$emit('select')">
    <span class="desires-compact__item" v-show="tag"
     v-for="(tag, index) in tags" :key="index">{{tag}}</span>
  </div>
</template>

<style lang="less">
.desires-compact {
  margin-bottom: @indent-xs;

  &__item {
    .link_simple();
    &:after {
      content: '•';
      color: @gray;
      padding: 0 @indent-xs;
      position: relative;
      top: 1px;
    }
    &:last-child:after {
      display: none;
    }
  }
}
</style>
