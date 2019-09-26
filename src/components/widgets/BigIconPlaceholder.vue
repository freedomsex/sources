<script>
export default {
  props: ['icon', 'text'],
};
</script>

<template>
  <div class="big-icon-placeholder">
    <div class="big-icon__info">
      <i class="material-icons" v-html="icon"></i>
      <div class="big-icon__text">
        {{text}}
      </div>
    </div>

    <div class="big-icon__space">
      <div class="big-icon__hint">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.big-icon-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  color: @gray;

  .big-icon {
    &__info {
      flex: 2 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i {
        font-size: 120px;
        color: @gray-light;
      }
    }

    &__text {
      font-size: 20px;
    }

    &__space {
      flex: 1 1 auto;
    }

    &__hint {
      display: block;
          text-align: center;
      // border: 2px solid @gray;
      // background-color: @light;
      // padding: @indent-sm;
      border-radius: 10px;
      font-size: 14px;
      max-width: 350px;
      margin: 0 auto;
      color: @gray-dark;
    }
  }

  .big-icon-space {
    text-align: center;
  }
}
</style>
