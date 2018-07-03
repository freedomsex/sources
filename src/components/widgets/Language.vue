<script>
import Languages from '~assets/Languages';

export default {
  computed: {
    lang() {
      return this.$store.state.locale;
    },
    list() {
      return Languages;
    },
  },
};
</script>

<template>
  <div class="language-settings" @click="$router.push('/languages')">
    <div class="language-settings__logo">{{lang}}</div>
    {{list[lang]}}
  </div>
</template>

<style lang="less">
.language-settings {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 3px;
  padding: 4px 7px 4px 4px;
  display: inline-block;
  cursor: pointer;
  color: #444;
  &__logo {
    padding: 2px 3px;
    border: 1px solid #444;
    border-radius: 3px;
    display: inline-block;
    text-transform: uppercase;
  }
}
</style>
