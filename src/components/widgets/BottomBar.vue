<script>
export default {
  props: ['centred'],
  data: () => ({}),
};
</script>

<template>
  <div class="bottom-bar">
    <div class="bottom-bar__wrapper" :class="{centred}">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
.bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: @white;
  box-shadow: 0 -3px 10px 0 rgba(0, 0, 0, 0.08);
  white-space: nowrap;
  overflow: hidden;
  z-index: 1;

  &__wrapper {
    max-width: @document-width;
    margin: 0 auto;

    &.centred {
      text-align: center;
    }
  }
}
</style>
