<script>
// import _ from 'underscore';
import NegativeDetection from '~mixins/NegativeDetection';
import PhotoSend from '~modules/PhotoSend';

import InfoDialog from '~dialogs/InfoDialog';
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
    // isDirt: _.debounce(function () {
    // const word = /\w{0,5}[хx]([хx\s\!@#\$%\^&*+-\|\/]{0,6})[уy]([уy\s\!@#\$%\^&*+-\|\/]{0,6})[ёiлeеюийя]\w{0,7}|\w{0,6}[пp]([пp\s\!@#\$%\^&*+-\|\/]{0,6})[iие]([iие\s\!@#\$%\^&*+-\|\/]{0,6})[3зс]([3зс\s\!@#\$%\^&*+-\|\/]{0,6})[дd]\w{0,10}|[сcs][уy]([уy\!@#\$%\^&*+-\|\/]{0,6})[4чkк]\w{1,3}|\w{0,4}[bб]([bб\s\!@#\$%\^&*+-\|\/]{0,6})[lл]([lл\s\!@#\$%\^&*+-\|\/]{0,6})[yя]\w{0,10}|\w{0,8}[её][bб][лске@eыиаa][наи@йвл]\w{0,8}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[uу]([uу\s\!@#\$%\^&*+-\|\/]{0,6})[н4ч]\w{0,4}|\w{0,4}[еeё]([еeё\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[нn]([нn\s\!@#\$%\^&*+-\|\/]{0,6})[уy]\w{0,4}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[оoаa@]([оoаa@\s\!@#\$%\^&*+-\|\/]{0,6})[тnнt]\w{0,4}|\w{0,10}[ё]([ё\!@#\$%\^&*+-\|\/]{0,6})[б]\w{0,6}|\w{0,4}[pп]([pп\s\!@#\$%\^&*+-\|\/]{0,6})[иeеi]([иeеi\s\!@#\$%\^&*+-\|\/]{0,6})[дd]([дd\s\!@#\$%\^&*+-\|\/]{0,6})[oоаa@еeиi]([oоаa@еeиi\s\!@#\$%\^&*+-\|\/]{0,6})[рr]\w{0,12}/i; // eslint-disable-line no-useless-escape
    //   this.dirt = !!word.test(this.message);
    //   return this.dirt;
    // }, 700),
  },
  components: {
    InfoDialog,
    MessangerService,
    HornMessageProblem,
    PhotoSend,
  },
};
</script>

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
         :placeholder="process ? 'Отправляю...' : 'Введите текст'"
         @keyup.ctrl.enter.prevent="sendMessage"></textarea>
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
