<script>
import HeaderBar from '~widgets/HeaderBar';

export default {
  props: ['back', 'caption', 'glass'],
  computed: {
    backButton() {
      return this.back || this.caption;
    },
  },
  components: {
    HeaderBar,
  },
};
</script>

<template>
  <HeaderBar :glass="glass" :caption="caption">
    <div class="header-bar__container">
      <div class="header-bar__button caption" @click="$emit('close')" v-if="backButton">
        <i class="material-icons">&#xE5C4;</i>
        <span class="header-bar__title">
          {{caption}}
        </span>
      </div>

      <div class="header-bar__navbar">
        <slot name="option"></slot>
      </div>
    </div>

  </HeaderBar>
</template>
