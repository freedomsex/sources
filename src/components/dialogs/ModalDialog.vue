<script>
import ActivityActions from '~components/activities/ActivityActions';

export default {
  extends: ActivityActions,
  methods: {
    onEsc(event) {
      if (event.keyCode === 27) {
        this.close();
      }
    },
  },
  mounted() {
    // Close the modal when the escape key is pressed.
    // const self = this;
    document.addEventListener('keydown', this.onEsc);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onEsc);
  },
};
</script>

<template>
  <div class="modal-dialog__mask" transition="modal" @click="close">
    <div class="modal-dialog__container" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
.modal-dialog__mask {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-dialog {
  &__wrapper {
    padding: @indent-md;
    text-align: left;
    &.capped {
      padding-top: @indent-sm;
    }
  }
  &__container {
    min-width: 200px;
    max-width: 400px;
    max-height: 100%;
    background: @white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    overflow: auto;
    border-radius: 4px;
    position: relative;
    margin: 10px;
    z-index: 1;
  }
  &__caption {
    font-size: @font-lg;
    font-weight: bold;
  }
  &__body {
    font-size: 14px;
    margin: @indent-xs 0 @indent-md;
  }
  &__section {
    margin: 0 0 @indent-sm;
  }
  &__footer {
    text-align: right;
  }
  &__centred {
    text-align: center;
  }
  &__options {
    button {
      .material-icons {
        vertical-align: middle;
        position: relative;
        top: -1px;
        font-size: 20px;
      }
    }
  }
}

.modal-enter,
.modal-leave {
  opacity: 0;
}

.modal-enter .modal-dialog__container,
.modal-leave .modal-dialog__container {
  transform: scale(1.1);
}
</style>
