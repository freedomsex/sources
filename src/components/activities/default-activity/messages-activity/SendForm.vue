<script>
// import _ from 'underscore';
import NegativeDetection from '~mixins/NegativeDetection';
import PhotoSend from '~modules/PhotoSend';

import InfoDialog from '~dialogs/InfoDialog';
import MessangerService from '~modules/MessangerService';

export default {
  props: ['human', 'count'],
  mixins: [NegativeDetection],
  data() {
    return {
      message: '',
      reply: '',
      process: false,
      preview: false,
      photo: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    reset() {
      // this.cancelPhoto();
      this.message = '';
      this.photo = null;
    },
    sendPhoto() {
      this.$emit('sendPhoto', this.photo);
    },
    send() {
      this.preview = null;
      this.process = true;
      this.reset();
    },
    select(data) { // select-photo
      console.log('select photo', data);
      this.photo = data;
      this.preview = data;
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
    PhotoSend,
  },
};
</script>

<template>
  <div>
    <div class="send-form">
      <div class="send-form__button-account"
       @click="$router.push(`${this.humanId}/detail`)">
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
       @click="$router.push(`${this.humanId}/uploads`)">
        <i class="material-icons">&#xE3B0;</i>
      </div>
    </div>

    <MessangerService
     :id="human.id"
     @sended="$emit('sended')"
     @close="$emit('close')"
     @process="busy"/>

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

    <div>
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
