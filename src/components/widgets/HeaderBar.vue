<script>
export default {
  props: [],
  data: () => ({}),
};
</script>

<template>
  <div class="header-bar">
    <div class="header-bar__wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
.header-bar {
  position: fixed;
  top: 0;
  width: 100%;
  color: @white;
  background-color: @menu-color;
  box-shadow: 0 -3px 10px 0 rgba(0, 0, 0, 0.08);
  z-index: 1;

  &.glass {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &__wrapper {
    max-width: @document-width;
    margin: 0 auto;

    &.centred {
      text-align: center;
    }
  }
}
</style>
