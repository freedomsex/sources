<script>
import api from '~config/api';
import CaptchaDialog from '~dialogs/CaptchaDialog';

export default {
  props: ['id', 'reply'],
  data() {
    return {
      captcha: false,
      text: null,
      photo: null,
      token: null,
      code: null,
      active: false,
    };
  },
  mounted() {
    this.$parent.$on('sendMessage', this.sendMessage);
    this.$parent.$on('sendPhoto', this.sendPhoto);
  },
  methods: {
    reset() {
      this.text = null;
      this.photo = null;
      this.captcha = false;
      this.resetRecaptcha();
    },
    cancel() {
      // this.$emit('process', false);
      this.resetRecaptcha();
      this.captcha = false;
    },
    resetRecaptcha() {
      this.$root.$refs.recaptcha.reset();
    },

    sendMessage(text) {
      if (text) {
        this.text = text;
        this.send();
      }
    },
    sendPhoto(photo) {
      if (photo && photo.alias) {
        this.photo = photo;
        this.send();
      }
    },
    send(token) {
      this.$emit('process', true);
      this.$store.commit('grecaptchaTokenUpdate', token);
      const params = {
        id: this.id,
        captcha: {
          code: this.code,
          token: this.token,
        },
        token: this.$store.state.grecaptchaToken,
      };
      if (this.photo) {
        params.photo = this.photo.alias;
      } else {
        params.mess = this.text;
        params.re = this.reply;
      }
      api.messages.send(params).then(({data}) => {
        this.onMessageSend(data);
      }).catch((error) => {
        this.onError(error);
      });
    },
    onMessageSend({saved, error}) {
      this.$emit('process', false);
      if (!saved && error) {
        if (error == 'need_captcha') {
          this.captcha = true;
        }
        if (error == 'need_verify') {
          this.$root.$refs.recaptcha.render(this.send, 'recaptcha-messenger');
          this.$root.$refs.recaptcha.execute2v();
        }
      } else {
        this.sended();
      }
    },
    onError() {
      this.$emit('process', false);
    },
    sended() {
      const {text} = this;
      this.$emit('process', false);
      this.$emit('sended');
      this.reset();
      this.$store.dispatch('notes/UPDATE', text);
    },
    setCode({token, code}) {
      this.token = token;
      this.code = code;
      this.send();
    },
    close() {
      this.reset();
      this.$emit('close');
    },
  },
  components: {
    CaptchaDialog,
  },

  destroyed() {
    this.resetRecaptcha();
  },
};
</script>

<template>
  <div>
    <slot></slot>
    <div id="recaptcha-messenger" class="g-recaptcha"></div>
    <CaptchaDialog v-if="captcha"
     @close="close"
     @cancel="cancel"
     @send="setCode"/>
  </div>
</template>

<style lang="less">
.g-recaptcha {
  display: none;
}
</style>
