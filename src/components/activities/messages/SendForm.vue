<script>
// import _ from 'underscore';
import NegativeDetection from '~mixins/NegativeDetection';
import PhotoSend from '~modules/PhotoSend';

import Notepad from '~activities/Notepad';
import MessagesCliche from '~activities/MessagesCliche';
import InfoDialog from '~dialogs/InfoDialog';
import Toast from '~widgets/Toast';
import MessangerService from '~modules/MessangerService';
import HornMessageProblem from '~modules/HornMessageProblem';

export default {
  props: ['humanId', 'count', 'reply'],
  mixins: [NegativeDetection],
  data() {
    return {
      message: '',
      process: false,
      preview: false,
      photo: false,
      photoIsRemoved: false,
      ignores: {},
      notepad: false,
      cliche: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    begin() {
      return this.count < 5;
    },
  },
  methods: {
    // reset() {
    // },
    sendPhoto() {
      this.preview = null;
      this.$emit('sendPhoto', this.photo);
    },
    sendMessage() {
      if (this.message.length > 500) {
        this.problem('exceed');
      } else if (this.begin && this.isDirt(this.message) && !this.ignores.dirt) {
        this.problem('dirt');
      } else if (this.begin && this.isSpam(this.message) && !this.ignores.spam) {
        this.problem('spam');
      } else {
        this.$emit('sendMessage', this.message);
      }
    },
    sended() {
      // this.reset();
      // this.cancelPhoto();
      this.message = '';
      this.photo = null;
      this.$emit('sended');
    },
    select(data) { // select-photo
      console.log('select photo', data);
      this.photo = data;
      this.preview = data;
    },
    close() {
      this.$emit('close');
    },
    problem(type) {
      this.$emit('problem', type);
    },
    ignore(type) {
      this.ignores[type] = true;
    },

    busy(value = false) {
      this.process = value;
    },
    setText(text) {
      this.message = text;
    },
  },
  components: {
    Notepad,
    MessagesCliche,
    InfoDialog,
    MessangerService,
    HornMessageProblem,
    PhotoSend,
    Toast,
  },
};
</script>

<i18n>
{
  "ru": {
    "sending": "Отправляю...",
    "placeholder": "Введите текст"
  },
  "en": {
    "sending": "Sending...",
    "placeholder": "Enter text"
  }
}
</i18n>

<template>
  <div>
    <div class="send-form">
      <div class="send-form__button-account"
       @click="$router.push(`${humanId}/detail`)">
        <i class="material-icons">&#xE853;</i>
      </div>
      <div class="send-form__textarea">
        <textarea class="send-form__message-text"
         v-model="message" v-resized
         :disabled="process == true"
         :placeholder="process ? $t('sending') : $t('placeholder')"
         @keyup.ctrl.enter.prevent="sendMessage"></textarea>
      </div>
      <div class="send-form__button-send"
       @click="notepad = true" v-if="!message">
        <i class="material-icons">&#xE14F;</i>
      </div>
      <div class="send-form__button-send"
       @click="sendMessage" v-if="message">
        <i class="material-icons">&#xE163;</i>
      </div>
      <div class="send-form__button-send" v-else
       @click="$router.push(`${humanId}/uploads`)">
        <i class="material-icons">&#xE3B0;</i>
      </div>
    </div>

    <Notepad v-if="notepad"
      @select="setText"
      @cliche="cliche = true"
      @close="notepad = false"/>
    <MessagesCliche v-if="cliche"
      @select="setText"
      @close="cliche = false"/>

    <MessangerService
     :id="humanId"
     :reply="reply"
     @sended="sended"
     @close="close"
     @process="busy"/>

    <HornMessageProblem
     @ignore="ignore"
     @solve="sendMessage"/>

    <router-view @close="$root.goBack()" @select="select"/>

    <!-- <incoming-photo :humanId="incoming"  v-if="incoming" @close="incoming = false"/> -->
    <PhotoSend v-if="preview"
     :photo="photo"
     :options="true"
     @send="sendPhoto"
     @close="preview = false"
     @removed="photoIsRemoved = true"/>

    <Toast v-if="photoIsRemoved"
     @close="photoIsRemoved = false">
      Фото удалено
    </toast>

  </div>
</template>

<style lang="less">

</style>
