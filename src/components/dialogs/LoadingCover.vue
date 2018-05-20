<script>
export default {
  props: ['show', 'text'],
  computed: {
    loader() {
      return this.text ? this.text : 'Отправляю';
    },
  },
};
</script>

<template>
  <div class="loading-cover" v-if="show">
    <div class="loading-cover__wrapper">
      <div class="loading-cover__loader">{{loader}}...</div>
    </div>
  </div>
</template>

<style lang="less">
.loading-cover {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(222, 222, 222, 0.5);
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  &__wrapper {
    position: relative;
    top: 50%;
  }
  &__loader {
    display: inline-block;
    border: 1px solid @gray-dark;
    padding: @indent-xs @indent-sm;
    background: @gray-light;
    border-radius: 2px;
    position: relative;
    top: -10px;
    z-index: 1000;
  }
}
</style>
