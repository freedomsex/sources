<script>
import ModalDialog from '~dialogs/ModalDialog';

export default {
  props: ['title', 'type', 'yesText'],
  computed: {
    style() {
      const btn = {
        default: 'btn-default',
        success: 'btn-success',
        warning: 'btn-warning',
        danger: 'btn-danger',
        info: 'btn-info',
      };
      return this.type ? btn[this.type] : 'btn-primary';
    },
    yes() {
      return this.yesText || 'Хорошо';
    },
  },
  methods: {
    confirm() {
      this.$emit('confirm');
      this.$emit('close');
    },
  },
  components: {
    ModalDialog,
  },
};
</script>

<template>
  <ModalDialog @close="$emit('close')">
    <div class="dialog-caption">
      <div class="dialog-caption__title">
        {{title}}
      </div>
      <div class="dialog-caption__option">
        <slot name="option"></slot>
      </div>
    </div>
    <div class="modal-dialog__wrapper capped">
      <slot name="content"></slot>
    </div>
    <slot></slot>
  </ModalDialog>
</template>

<style lang="less">
.dialog-caption {
  background: @menu-color;
  color: @white;
  font-size: 16px;
  padding: (@indent-sm + @indent-sm * 0.2) @indent-sm @indent-sm;
  display: flex;
  &__title {
    flex: 3 1 auto;
    margin-right: 10px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__option {
    flex: 0 0 auto;
    color: @white;
    cursor: pointer;
    a {
      color: @white;
      display: inline-block;
    }
    .material-icons {
      vertical-align: middle;
      position: relative;
      top: -1px;
    }
    .account {
      border-bottom: 1px dashed #bbcccc;
      font-size: 15px;
      padding-bottom: 1px;
    }
  }

  &.warning {
    background: @orange;
  }
}
</style>
