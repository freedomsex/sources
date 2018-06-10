<script>
import Censoring from '~assets/lib/Censoring/dist/Censoring';
import ConfirmDialog from '~dialogs/ConfirmDialog';

const Censor = new Censoring();
Censor.$filters.disable('url_link');

export default {
  props: ['text', 'passive', 'bypass'],
  data: () => ({
    info: false,
    accept: false,
  }),
  methods: {
    activate(text) {
      const template = '<span class="link_simple" @click="$emit(`info`)">$1</span>';
      return text.replace(/(\*{3,})/g, template);
    },
    message() {
      let {text} = this;
      if (text) {
        text = Censor.filter(this.text);
        if (!this.passive) {
          text = this.activate(text);
        }
      }
      return text;
    },
    confirm() {
      this.$emit('confirm');
      this.accept = true;
      this.info = false;
    },
  },
  computed: {
    transformed() {
      return {
        template: `<span>${this.message()}</span>`,
        props: this.$options.props,
      };
    },
  },
  components: {
    ConfirmDialog,
  },
};
</script>

<template>
  <span>
    <component v-if="!accept && !bypass"
     v-bind:is="transformed"
     @info="info = true"/>
    <span v-else v-html="text"></span>

    <ConfirmDialog v-if="info"
     yesText="Показать"
     @confirm="confirm"
     @close="info = false">
      Игнорируйте номера телефонов и другие контакты
      предоставленные вам сразу в начале знакомства.
      Остерегайтесь мошенничества.
    </ConfirmDialog>
  </span>
</template>

<style lang="less">

</style>
