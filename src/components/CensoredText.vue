<script>
import Censoring from '~assets/lib/Censoring/dist/Censoring';
import NumbersSayCensor from '~assets/lib/Censoring/src/plugins/NumbersSayCensor';
import PurifyRuCensor from '~assets/lib/Censoring/src/plugins/PurifyRuCensor';
import ConfirmDialog from '~dialogs/ConfirmDialog';

Censoring.use(NumbersSayCensor);
Censoring.use(PurifyRuCensor);
const Censor = new Censoring();
Censor.$filters.disable('url_link');

export default {
  props: ['text', 'passive', 'bypass'],
  data: () => ({
    info: false,
    accept: false,
    triggers: [],
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
        this.triggers = Censor.$filters.triggers;
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
    triggered(name) {
      return this.triggers.indexOf(name) >= 0;
    },
    alert() {
      if (this.triggered('purify_words')) {
        this.info = 'purify';
      } else {
        this.info = 'scram';
      }
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
     @info="alert()"/>
    <span v-else v-html="text"></span>

    <ConfirmDialog v-if="info == 'scram'"
     yesText="Показать"
     @confirm="confirm"
     @close="info = false">
      Игнорируйте номера телефонов и другие контакты
      предоставленные вам сразу в начале знакомства.
      Остерегайтесь мошенничества.
    </ConfirmDialog>

    <ConfirmDialog v-if="info == 'purify'"
     yesText="Показать"
     @confirm="confirm"
     @close="info = false">
      Любые оскорбления на сайте запрещены. Нажмите дизлайк
      у тех сообщений, которые вас оскорбили.
      Наказание начинает действовать моментально.
    </ConfirmDialog>
  </span>
</template>

<style lang="less">

</style>
