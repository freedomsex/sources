<script>

export default {
  props: ['success', 'failed', 'expired'],
  data() {
    return {
      v2sitekey: '6LdxP0YUAAAAAMzR_XFTV_G5VVOhyPnXLjdudFoe',
      v3sitekey: '6LdLtqsUAAAAAGJqPSXbPI15hsVih30moVc_rQ4Z',
      widgetId: null,
      active: false,
      error: false,
      expand: false,
    };
  },
  methods: {
    onload() {
      this.render();
    },

    execute2v() {
      this.$nextTick(() => {
        global.grecaptcha.execute();
      });
    },
    execute3v(page) {
      const action = page || 'homepage';
      return global.grecaptcha.execute(this.v3sitekey, {action}).then(token => token);
    },

    reset() {
      if (global.grecaptcha && this.active) {
        this.error = false;
        this.active = false;
        global.grecaptcha.reset();
        document.getElementById('g-recaptcha').innerHTML = '';
      }
    },
    render(callback, id) {
      this.active = true;
      const element = id || 'g-recaptcha';
      global.grecaptcha.render(element, {
        sitekey: this.v2sitekey,
        size: 'invisible',
        badge: 'inline',
        'expired-callback': this.onError,
        'error-callback': this.onError,
        callback,
      });
      // this.execute();
    },
    onError() {
      this.error = true;
    },
  },
};
</script>

<template>
  <div class="recaptcha-widget">
    <div id="g-recaptcha" class="g-recaptcha"></div>

    <div class="recaptcha-widget__alert" v-if="error" @click="reset()">
      Во время проверки Google reCAPTCHA произошла ошибка или время ожидания истекло. Повторите при необходимости.
    </div>
    <div class="notation">
      Защита от спама
      <a href="https://www.google.com/recaptcha" target="_blank" rel="nofollow">
        reCAPTCHA
      </a> <i>·</i>
      <a rel="nofollow" href="https://www.google.com/intl/ru/policies/privacy/" target="_blank" class="notation__link">
        Конфиденциальность
      </a> <i>·</i>
      <a rel="nofollow" href="https://www.google.com/intl/ru/policies/terms/" target="_blank" class="notation__link">
        Условия использования
      </a>
    </div>
  </div>
</template>

<style lang="less">
.grecaptcha-badge { visibility: hidden; }

.recaptcha-widget {
  &__alert {
    background-color: @pink-light;
  }

  .g-recaptcha {
    display: none;
  }
  .notation {
    text-align: center;
    margin: 10px auto;
    margin-top: 15px;
    max-width: 750px;
    color: #666666;
    font-size: 10px;

    &__link {
      font-size: 10px;
      color: #666666;
      cursor: pointer;
      text-decoration: none;
    }
  }
}

</style>
