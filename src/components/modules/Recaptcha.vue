<script>
import InfoDialog from '~dialogs/InfoDialog';

export default {
  props: ['success', 'failed', 'expired'],
  data() {
    return {
      sitekey: '6LdxP0YUAAAAAMzR_XFTV_G5VVOhyPnXLjdudFoe',
      widgetId: null,
      show: true,
      error: false,
    };
  },
  // watch: {
  //   widgetId() {
  //
  //   },
  // },
  methods: {
    execute() {
      this.show = true;
      console.log('execute widgetId', this.widgetId);
      this.$nextTick(() => {
        window.grecaptcha.execute(this.widgetId);
      });
    },
    reset() {
      if (window.grecaptcha && this.widgetId) {
        this.show = false;
        this.error = false;
        // this.$store.commit('stopScrolling', false);
        this.$nextTick(() => {
          window.grecaptcha.reset(this.widgetId);
        });
      }
    },
    verify(token) {
      this.$store.commit('grecaptchaTokenUpdate', token);
      this.reset();
      this.$emit('verify');
    },
    render(callback) {
      this.show = true;
      if (this.widgetId === null && window.grecaptcha) {
        this.widgetId = window.grecaptcha.render('g-recaptcha', {
          sitekey: this.sitekey,
          size: 'invisible',
          'expired-callback': this.onError,
          'error-callback': this.onError,
          callback,
        });
        console.log('recaptcha ready', this.widgetId);
      }
      this.execute();
    },
    onError() {
      this.error = true;
    },
  },
  components: {
    InfoDialog,
  },
};
</script>

<template>
  <div v-show="show">
    <div id="g-recaptcha" class="g-recaptcha"></div>
    <InfoDialog v-if="error" :close="reset()">
      Во время проверки Google reCAPTCHA произошла ошибка или время ожидания истекло. Повторите при необходимости.
    </InfoDialog>
  </div>
</template>

<style lang="less">

</style>
