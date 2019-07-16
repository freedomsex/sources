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
      <div class="galery-photo__item" v-for="(item, index) in list"
       :style="{backgroundImage: `url(${source(item)})`}"
       @click="$emit('show', index)"></div>
    </div>
    <div class="galery-photo__placeholder" v-else>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
@import '~styles/galery-photo.less';
</style>
