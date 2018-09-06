<script>
import ScrollBodyPrevent from '~modules/ScrollBodyPrevent';

export default {
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
  components: {
    ScrollBodyPrevent,
  },
};
</script>

<template>
  <div class="modal-dialog__mask" transition="modal">
    <div class="modal-dialog__overlay" @click="$emit('close')">
      <div class="modal-dialog__container" @click.stop>
        <slot></slot>
      </div>
    </div>
    <ScrollBodyPrevent/>
  </div>
</template>

<style lang="less">
.modal-dialog__mask {
  .fixed-dialog-mask;
  overflow-y: auto;
}

.modal-dialog {
  &__overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100%;
  }

  &__wrapper {
    padding: @indent-md;
    text-align: left;
    white-space: normal;
    &.capped {
      padding-top: @indent-sm;
    }
  }
  &__container {
    min-width: 200px;
    max-width: 400px;
    // max-height: 100%;
    // overflow: auto;
    background: @white;
    color: @dark;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    border-radius: 4px;
    position: relative;
    margin: 10px;
    z-index: 1;

    .btn {
      text-transform: uppercase;
    }
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
      .material-icons {
        vertical-align: middle;
        position: relative;
        top: -1px;
        font-size: 20px;
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
