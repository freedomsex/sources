<script>
import api from '~config/api';
import CaptchaDialog from '~dialogs/CaptchaDialog';
import Recaptcha from '~modules/Recaptcha';

export default {
  props: ['id', 'reply'],
  data() {
    return {
      captcha: false,
      text: null,
      photo: null,
      token: null,
      code: null,
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
      this.$emit('process', true);
    },
    onMessageSend({saved, error}) {
      if (!saved && error) {
        if (error == 'need_captcha') {
          this.captcha = true;
        }
        if (error == 'need_verify') {
          this.$refs.recaptcha.render(this.send);
        }
      } else {
        this.sended();
      }
      this.$emit('process', false);
    },
    onError() {
      this.$emit('process', false);
    },
    sended() {
      const {text} = this;
      this.$emit('process', false);
      this.$emit('sended');
      this.reset();
      this.$refs.recaptcha.reset();
      this.$store.dispatch('notes/UPDATE', text);
    },
    setCode({token, code}) {
      this.token = token;
      this.code = code;
      this.send();
    },
    cancel() {
      // this.$emit('process', false);
      this.captcha = false;
    },
    close() {
      this.reset();
      this.$emit('close');
    },
  },
  components: {
    CaptchaDialog,
    Recaptcha,
  },
};
</script>

<template>
  <div>
    <slot></slot>
    <CaptchaDialog v-if="captcha"
     @close="close"
     @cancel="cancel"
     @send="setCode"/>
    <Recaptcha ref="recaptcha"
     @cancel="close"/>
  </div>
</template>

<style lang="less">

</style>
