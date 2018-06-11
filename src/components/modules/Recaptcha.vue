<script>
export default {
  props: ['success', 'failed', 'expired'],
  data() {
    return {
      sitekey: '6LdxP0YUAAAAAMzR_XFTV_G5VVOhyPnXLjdudFoe',
      widgetId: null,
      show: true,
    };
  },
  methods: {
    execute() {
      this.show = true;
      window.grecaptcha.execute(this.widgetId);
    },
    reset() {
      if (window.grecaptcha) {
        window.grecaptcha.reset(this.widgetId);
        this.show = false;
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
          // 'expired-callback': this.$emit('cancel'),
          // 'error-callback': this.$emit('cancel'),
          callback,
        });
        console.log('recaptcha ready', this.widgetId);
      }
    },
  },
};
</script>

<template>
  <div v-show="show">
    <div id="g-recaptcha" class="g-recaptcha"></div>
  </div>
</template>

<style lang="less">
</style>
