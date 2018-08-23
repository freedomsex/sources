<script>
export default {
  props: ['list', 'private'],
  methods: {
    source(item) {
      const {_links: links} = item;
      return this.private ? links.thumb.href : links.galery.href;
    },
  },
};
</script>

<template>
  <div>
    <div class="galery-photo" v-if="list.length > 0">
      <img class="galery-photo__item" v-for="(item, index) in list"
       :src="source(item)"
       @click="$emit('show', index)">
    </div>
    <div class="galery-photo__placeholder">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">

.galery-photo {
  margin: 0 -5px;
  //background: @gray;
  &__item {
    width: 100px;
    height: 100px;
    @media (max-width: 400px) {
      @indent: (20 * 2 + 2 - 5 * 2) / 3;
      width: ~'calc(33.33vmin - @{indent}px)';
      height: ~'calc(33.33vmin - @{indent}px)';
    }
    @media (max-width: 540px) and (min-width: 400px) {
      @indent: (20 * 2 + 2 - 5 * 2) / 4;
      width: ~'calc(25vmin - @{indent}px)';
      height: ~'calc(25vmin - @{indent}px)';
    }
    border: 5px solid @white;
    position: relative;
  }

  &__placeholder {
    color: @gray-dark;
    background: @light;
    padding: @indent-md @indent-md;
  }

}
</style>
