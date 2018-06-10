<script>
import NegativeDetection from '~mixins/NegativeDetection';

import Notepad from '~default-activity/Notepad';
import MessagesCliche from '~default-activity/MessagesCliche';
import ContactWizard from '~dialogs/ContactWizard';
import InfoDialog from '~dialogs/InfoDialog';
import LoadingCover from '~dialogs/LoadingCover';
import MessangerService from '~modules/MessangerService';

export default {
  props: ['human', 'reply', 'excess'],
  mixins: [NegativeDetection],
  data() {
    return {
      message: '',
      captcha: false,
      process: false,
      modals: {
        cliche: false,
        notepad: false,
      },
      negative: {
        contacts: false,
        interest: {
          show: false,
          ignore: false,
        },
        dirt: {
          show: false,
          ignore: false,
        },
        spam: {
          show: false,
          ignore: false,
        },
      },
    };
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
    isNegative(type) {
      return this.negative[type].ignore == false;
    },
    proxy() {
      if (this.added) {
        this.problem('contacts');
      } else if (this.excess && this.isNegative('interest')) {
        this.problem('interest');
      } else if (this.isDirt(this.message) && this.isNegative('dirt')) {
        this.problem('dirt');
      } else if (this.isSpam(this.message) && this.isNegative('spam')) {
        this.problem('spam');
      } else {
        this.$emit('send', this.message);
      }
    },
    problem(type) {
      this.negative[type].show = true;
    },
    ignore(type) {
      this.negative[type].ignore = true;
      this.negative[type].show = false;
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
    ContactWizard,
    InfoDialog,
    MessangerService,
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
     @sended="$emit('sended')"
     @close="$emit('close')"
     @process="busy"/>

    <LoadingCover :show="process"/>

    <div>
      <Notepad v-if="modals.notepad"
       @select="setText"
       @cliche="modals.cliche = true"
       @close="modals.notepad = false"/>
      <MessagesCliche v-if="modals.cliche"
       @select="setText"
       @close="modals.cliche = false"/>

      <ContactWizard v-if="negative.contacts"
        :humanCity = "human.city"
        :humanAge = "human.age"
        @approve=""
        @close="negative.contacts = false"/>

      <InfoDialog v-if="negative.interest.show"
       @close="ignore('interest')">
       <div slot="title">Учитывайте интересы</div>
        Потребуется подтверждение, если не совпадает
        желаемый город, возраст или пол.
        Вирт интересен далеко не всем.
      </InfoDialog>

      <InfoDialog v-if="negative.dirt.show"
        @close="ignore('dirt')">
        <div slot="title">Поступят жалобы</div>
        Оскорбления в любой форме запрещены. На вас поступят жалобы,
        что грозит блокировкой анкеты.
        Возможно потребуется подтверждение.
      </InfoDialog>

      <InfoDialog v-if="negative.spam.show"
       @close="ignore('spam')">
        <div slot="title">Не сейчас</div>
        Не отправляйте номера телефонов, ссылки, мессенджеры в начале знакомства.
        Так поступают мошенники, потребуется подтверждение.
      </InfoDialog>

      <InfoDialog v-if="0">
       <div slot="title">Комфортное начало</div>
        Используйте шаблоны из блокнота, простые фразы
        или текст менее 140 символов для начала общения.
        Исключите цифры в первых сообщениях.
      </InfoDialog>

    </div>
  </div>
</template>

<style lang="less">

</style>
