<script>
import OptionDialog from '~dialogs/OptionDialog';

export default {
  props: ['loader', 'alert', 'hint'],
  computed: {
    hasContext() {
      return !!this.$slots.context;
    },
    hasHint() {
      return !!this.$slots.hint;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
  components: {
    OptionDialog,
  },
};
</script>

<template>
  <OptionDialog @close="close">
    <div class="contact-dialog">
      <div class="option_tab">
        <div align="left" class="option_cap">
          <slot name="caption">Заголовок</slot>
        </div>
        <div class="tab_context" v-if="hasContext">
          <slot name="context">Описание</slot>
        </div>
        <div class="option_loader">
          <div class="option_loader__label" v-show="loader"></div>
          <div class="option_loader__alert" v-show="alert"></div>
        </div>
        <slot></slot>
        <div class="hint_context" v-show="hint" v-if="hasHint">
          <slot name="hint">Подсказка</slot>
        </div>
      </div>
    </div>
  </OptionDialog>
</template>

<style lang="less">
</style>
