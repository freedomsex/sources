<script>
export default {
  props: ['show', 'text'],
  data() {
    return {
      hope: false,
    };
  },
  computed: {
    loader() {
      return this.text ? this.text : 'Загружаем';
    },
  },
  mounted() {
    this.hope = false;
    setTimeout(() => {
      this.hope = true;
    }, 3000);
  },
};
</script>

<template>
  <div class="loading-wall" v-if="show">
    <div class="loading-wall__wrapper">
      <div class="loading-wall__loader" v-show="hope">{{loader}}...</div>
    </div>
  </div>
</template>

<style lang="less">
.loading-wall {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: @white;
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
