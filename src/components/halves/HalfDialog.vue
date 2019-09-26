<script>
import ActivityHeader from '~widgets/ActivityHeader';

export default {
  props: ['caption'],
  data: () => ({

  }),
  components: {
    ActivityHeader,
  },
};
</script>

<template>
  <div class="half-dialog">
    <div class="half-dialog__mask" @click.self="$emit('close')"></div>
    <div class="half-dialog__container">
      <ActivityHeader :glass="true" :back="true" @close="$emit('close')">
        <slot name="caption" slot="caption"></slot>
        <slot name="option" slot="option"></slot>
      </ActivityHeader>

      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
.half-dialog__mask {
  .fixed-dialog-mask;
  // overflow-y: auto;
  // z-index: 2;
}

.half-dialog {
  // min-height: 20vh;
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-end;
  .fixed-container();

  &__container {
    max-width: @activity-width;
    background-color: @white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 1;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    margin: 0 auto;

  }
}
</style>
