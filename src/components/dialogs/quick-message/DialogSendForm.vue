<script>
import NegativeDetection from '~mixins/NegativeDetection';

import Notepad from '~default-activity/Notepad';
import MessagesCliche from '~default-activity/MessagesCliche';
import LoadingCover from '~dialogs/LoadingCover';
import MessangerService from '~modules/MessangerService';
import HornMessageProblem from '~modules/HornMessageProblem';

export default {
  props: ['human', 'reply', 'excess'],
  mixins: [NegativeDetection],
  data() {
    return {
      message: '',
      process: false,
      modals: {
        cliche: false,
        notepad: false,
      },
      ignores: {},
    };
  },
  mounted() {
    this.setText(this.$store.state.message.first);
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    added() {
      return !(this.user.city && this.user.age && this.user.name);
    },
  },
  methods: {
    proxy() {
      if (this.message.length > 500) {
        this.problem('exceed');
      } else if (!this.reply && this.message.length > 140 && !this.ignores.twitter) {
        this.problem('twitter');
      } else if (this.added) {
        this.problem('contacts');
      } else
      if (!this.reply && this.excess && !this.ignores.interest) {
        this.problem('interest');
      } else
      if (this.isDirt(this.message) && !this.ignores.dirt) {
        this.problem('dirt');
      } else if (this.isSpam(this.message) && !this.ignores.spam) {
        this.problem('spam');
      } else {
        this.$emit('sendMessage', this.message);
        this.$store.commit('message/saveFirst', this.message);
      }
    },
    problem(type) {
      this.$emit('problem', type);
    },
    ignore(type) {
      this.ignores[type] = true;
    },
    setText(text) {
      this.message = text;
    },
    busy(value = false) {
      this.process = value;
    },
  },
  components: {
    Notepad,
    MessagesCliche,
    MessangerService,
    HornMessageProblem,
    LoadingCover,
  },
};
</script>

<template>
  <div>
    <div class="modal-dialog__section">
      <div class="dialog-form">
        <div class="dialog-form__textarea">
          <textarea class="dialog-form__message-text"
           rows="1"
           placeholder="Введите текст"
           v-model="message" v-resized
           @keyup.ctrl.enter.prevent="proxy()"></textarea>
        </div>
        <div class="dialog-form__button-paste"
         @click="modals.cliche = true" v-if="!reply">
          <i class="material-icons">&#xE02F;</i>
        </div>
      </div>
    <!--           <div class="dialog-form__hint" @click="$router.push('/help/simplest/ru')">
        <span aria-hidden="true" class="glyphicon glyphicon-info-sign"></span>
        Используйте простые фразы или шаблоны из блокнота.
      </div> -->
    </div>

    <div class="modal-dialog__options">
      <button class="btn btn-primary" @click="proxy()">
        <i class="material-icons">&#xE163;</i>
        Отправить
      </button>

      <button class="btn btn-default"
       @click="modals.notepad = true">
        <i class="material-icons">&#xE14F;</i>
        Блокнот
      </button>
    </div>

    <MessangerService
     :id="human.id"
     :reply="reply"
     @sended="$emit('sended')"
     @close="$emit('close')"
     @process="busy"/>

    <LoadingCover :show="process"/>

    <Notepad v-if="modals.notepad"
      @select="setText"
      @cliche="modals.cliche = true"
      @close="modals.notepad = false"/>
    <MessagesCliche v-if="modals.cliche"
      @select="setText"
      @close="modals.cliche = false"/>

    <HornMessageProblem
     :human="human"
     @ignore="ignore"
     @solve="proxy"/>
  </div>
</template>

<style lang="less">

</style>
