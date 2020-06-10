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
import ColorContactIcon from '~components/contacts/ColorContactIcon';
import StickersActivity from '~activities/StickersActivity';
import SafeActivity from '~activities/messages/SafeActivity';

import SmartInsert from '~dialogs/SmartInsert';

export default {
  props: ['humanId', 'count', 'initial', 'excess'],
  mixins: [NegativeDetection],
  data() {
    return {
      message: '',
      process: false,
      preview: false,
      photo: false,
      photoIsRemoved: false,
      ignores: {},

      variants: false,

      insert: false,
      notepad: false,
      cliche: false,
      sticker: false,
    };
  },
  mounted() {
    if (this.initial) {
      this.setText(this.$store.state.message.first);
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    human() {
      return this.$store.state.human;
    },
    begin() {
      return this.initial || this.count < 5;
    },
    completed() {
      return !(this.user.city && this.user.age && this.user.name);
    },

    safe() {
      if ((!this.count || this.count < 3) && this.variants) {
        return true;
      }
      return false;
    },
  },
  methods: {
    // reset() {
    // },
    sendPhoto() {
      this.preview = null;
      this.$emit('sendPhoto', this.photo);
    },

    initialChecks() {
      if (!this.initial) {
        return true;
      }
      if (this.message.length > 140 && !this.ignores.twitter) {
        this.problem('twitter');
      } else if (this.completed) {
        this.problem('contacts');
      } else
      if (this.excess && !this.ignores.interest) {
        this.problem('interest');
      } else {
        return true;
      }
      return false;
    },

    sendMessage() {
      if (this.message.length > 500) {
        this.problem('exceed');
      } else if (this.begin && this.isDirt(this.message) && !this.ignores.dirt) {
        this.problem('dirt');
      } else if (this.begin && this.isSpam(this.message) && !this.ignores.spam) {
        this.problem('spam');
      } else if (this.initialChecks()) {
        this.saveFirst();
        this.$emit('sendMessage', this.message);
      }
    },

    saveFirst() {
      if (this.initial) {
        this.$store.commit('message/first', this.message);
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
    ColorContactIcon,
    SmartInsert,
    StickersActivity,
    SafeActivity,
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
        <ColorContactIcon :uid="human.id" :item="human"/>
      </div>
      <div class="send-form__textarea">
        <textarea class="send-form__message-text"
         v-model="message" v-resized
         :disabled="process == true"
         :placeholder="process ? $t('sending') : $t('placeholder')"
         @focus="variants = true"
         @keyup.ctrl.enter.prevent="sendMessage"></textarea>
      </div>

      <div class="send-form__button-send"
        @click="insert = true"v-if="!message">
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
    <StickersActivity v-if="sticker"
      @close="sticker = false"/>


    <SafeActivity v-if="safe"
     :text="message"
     @select="setText"
     @close="variants = false"/>

    <MessangerService
     :id="humanId"
     :reply="human.message"
     @sended="sended"
     @close="close"
     @process="busy"/>

    <HornMessageProblem
     :human="human"
     @ignore="ignore"
     @solve="sendMessage"/>

    <SmartInsert v-if="insert" @close="insert = false"
      @notepad="notepad = true"
      @cliche="cliche = true"
      @sticker="sticker = true"/>

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

.send-form {
  position: relative;
  display: flex;
  width: 100%;
  // min-height: 64px;
    border-top: 1px solid #cccccc;
  align-items: flex-end;
  &__textarea {
    flex: 1 1 auto;
    border: 0px solid gray;
    padding: 5px 0;
    line-height: 1;
    align-self: center;
  }
  &__message-text {
    height: 0;
    overflow: auto;
    min-height: 36px;
    padding: 10px 5px;
    font-size: 14px;
    margin: auto;
    overflow-y: hidden;
    resize: vertical;
  }

  &__button {
    &-send {
      cursor: pointer;
      flex: 0 0 auto;
      color: @dark-light;
      padding: 0 7px 10px;
    }
    &-account {
      flex: 0 0 auto;
      padding: 0 5px 3px;
    }
  }

  i {
    vertical-align: bottom;
  }
}
</style>
