<script>
import api from '~config/api';
import CaptchaDialog from '~dialogs/CaptchaDialog';
import Recaptcha from '~modules/Recaptcha';

export default {
  props: ['id', 'reply', 'photo'],
  data() {
    return {
      captcha: false,
    };
  },
  mounted() {
    this.$parent.$on('send', this.listen);
  },
  methods: {
    listen(text) {
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
        captcha_code: this.code,
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
          this.$refs.recaptcha.execute();
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
      this.$emit('sended');
      this.$emit('process', false);
      this.$refs.recaptcha.reset();
      this.$store.dispatch('notes/UPDATE', this.text);
    },
    setCode(code) {
      this.code = code;
      this.send();
    },
    cancel() {
      this.$emit('process', false);
      this.captcha = false;
    },
    close() {
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
