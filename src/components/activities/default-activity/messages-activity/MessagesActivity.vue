<script>
import _ from 'underscore';
import api from '~config/api';
import DefaultActivity from '~default-activity/DefaultActivity';
import Recaptcha from '~modules/Recaptcha';
import Toast from '~widgets/Toast';
import CaptchaDialog from '~dialogs/CaptchaDialog';
import PhotoSend from '~modules/PhotoSend';
import MessageList from './MessageList';

export default {
  extends: DefaultActivity,
  props: ['humanId', 'title'],
  data() {
    return {
      message: '',
      caption: '',
      reply: '',
      code: '',
      show: true,
      process: false,
      approve: true,
      dirt: false,
      alert: false,
      captcha: false,
      virification: false,
      preview: false,
      photo: false,
      photoIsRemoved: false,
    };
  },
  // beforeRouteUpdate(to, from, next) {
  //     this.photo = this.preview;
  //     console.log('MessagesActivity', this.photo);
  //     next();
  // },
  mounted() {
    if (this.title) {
      this.caption = this.title;
    }
  },
  methods: {
    reset() {
      // this.cancelPhoto();
      this.show = true;
      this.process = false;
      this.approve = true;
      this.message = '';
      this.photo = null;
    },
    isDirt: _.debounce(function () {
      const word = /\w{0,5}[хx]([хx\s\!@#\$%\^&*+-\|\/]{0,6})[уy]([уy\s\!@#\$%\^&*+-\|\/]{0,6})[ёiлeеюийя]\w{0,7}|\w{0,6}[пp]([пp\s\!@#\$%\^&*+-\|\/]{0,6})[iие]([iие\s\!@#\$%\^&*+-\|\/]{0,6})[3зс]([3зс\s\!@#\$%\^&*+-\|\/]{0,6})[дd]\w{0,10}|[сcs][уy]([уy\!@#\$%\^&*+-\|\/]{0,6})[4чkк]\w{1,3}|\w{0,4}[bб]([bб\s\!@#\$%\^&*+-\|\/]{0,6})[lл]([lл\s\!@#\$%\^&*+-\|\/]{0,6})[yя]\w{0,10}|\w{0,8}[её][bб][лске@eыиаa][наи@йвл]\w{0,8}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[uу]([uу\s\!@#\$%\^&*+-\|\/]{0,6})[н4ч]\w{0,4}|\w{0,4}[еeё]([еeё\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[нn]([нn\s\!@#\$%\^&*+-\|\/]{0,6})[уy]\w{0,4}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[оoаa@]([оoаa@\s\!@#\$%\^&*+-\|\/]{0,6})[тnнt]\w{0,4}|\w{0,10}[ё]([ё\!@#\$%\^&*+-\|\/]{0,6})[б]\w{0,6}|\w{0,4}[pп]([pп\s\!@#\$%\^&*+-\|\/]{0,6})[иeеi]([иeеi\s\!@#\$%\^&*+-\|\/]{0,6})[дd]([дd\s\!@#\$%\^&*+-\|\/]{0,6})[oоаa@еeиi]([oоаa@еeиi\s\!@#\$%\^&*+-\|\/]{0,6})[рr]\w{0,12}/i; // eslint-disable-line no-useless-escape
      this.dirt = !!word.test(this.message);
      return this.dirt;
    }, 700),

    attention(count) {
      if (count < 3) {
        this.alert = true;
      } else {
        this.alert = false;
      }
    },
    close() {
      // this.$emit('close');
      this.back();
    },
    cancel() {
      this.captcha = false;
      this.confirm = false;
      this.ignore = true;
      console.log('cancel');
    },
    select(data) {
      this.photo = data;
      this.preview = data;
    },
    sendMessage(token) {
      this.$store.commit('grecaptchaTokenUpdate', token);
      const data = {
        id: this.humanId,
        captcha_code: this.code,
        token: this.$store.state.grecaptchaToken,
      };
      if (this.photo && this.photo.alias) {
        data.photo = this.photo.alias;
      } else {
        data.mess = this.message;
        data.re = this.reply;
      }
      this.$store.commit('intimate/notifi', false);
      api.messages
        .send(data)
        .then(({data: res}) => {
          this.onMessageSend(res);
        })
        .catch(() => {
          this.onError();
        });
      this.preview = null;
      this.process = true;
    },
    setCode(code) {
      this.code = code;
      this.sendMessage();
    },
    onMessageSend({error}) {
      if (error) {
        if (error == 'need_captcha') {
          this.captcha = true;
        }
        if (error == 'need_verify') {
          this.virification = true;
          this.$refs.recaptcha.render(this.sendMessage);
          this.$refs.recaptcha.execute();
        }
        this.onError();
      } else {
        this.sended();
      }
      this.process = false;
    },
    sended() {
      // MessList.messages.unshift(data.message);
      this.$refs.messages.reload();
      this.reset();
      this.$refs.recaptcha.reset();
    },
    onError() {
      this.process = false;
    },
    account() {
      this.$router.push(`${this.humanId}/detail`);
    },
    uploads() {
      this.$router.push(`${this.humanId}/uploads`);
    },
    incoming() {
      this.$router.push(`${this.humanId}/incoming`);
    },
    // preview() {
    //     this.$router.push(this.humanId + '/preview')
    // },
    videochat() {
      window.open(`/videochat.php?to=${this.humanId}`,
        'videochat',
        'width=432, height=280, resizable=yes, scrollbars=yes');
    },
  },
  components: {
    DefaultActivity,
    MessageList,
    PhotoSend,
    CaptchaDialog,
    Toast,
    Recaptcha,
  },
};
</script>

<template>
  <div>
    <DefaultActivity @close="close">
      <span slot="caption">{{caption}}</span>

      <div class="menu-user__navbar-right" slot="option">
        <div class="navbar-button">
          <i class="material-icons" @click="videochat">&#xE04B;</i>
        </div>
        <div class="navbar-button">
          <i class="material-icons" @click="incoming()">&#xE3B6;</i>
        </div>
      </div>

      <div class="message-dialog" key="humanId">
        <div id="dialog-history" class="message-dialog__history">
          <MessageList
           :humanId="humanId"
           ref="messages"
           @attention="attention"/>
        </div>
        <div class="messages__alert" v-show="alert" @click.self="alert = false">
          Игнорируйте номера телефонов, ссылки и мессенджеры.
          Наказывайте мошенников. Узнайте о том, как избежать обмана.
          <a href="/блог/как-не-попасть-на-уловки-мошенников/" target="_blank">Подробнее...</a>
        </div>
        <div class="message-dialog__tools">
          <div class="send-form">
            <div class="send-form__button-account" @click="account()">
              <i class="material-icons">&#xE853;</i>
            </div>
            <div class="send-form__textarea">
              <textarea class="send-form__message-text"
               v-model="message" v-resized
               :disabled="process == true"
               :placeholder="process ? 'Отправляю...' : 'Введите текст'"
               @keyup.ctrl.enter.prevent="sendMessage"></textarea>
            </div>
            <div class="send-form__button-send" @click="sendMessage" v-if="message">
              <i class="material-icons">&#xE163;</i>
            </div>
            <div class="send-form__button-send" @click="uploads()" v-else>
              <i class="material-icons">&#xE3B0;</i>
            </div>
          </div>
        </div>
      </div>
      <!-- <incoming-photo :humanId="incoming"  v-if="incoming" @close="incoming = false"/> -->
      <PhotoSend v-if="preview"
       :photo="photo"
       :options="true"
       @send="sendMessage"
       @close="preview = false"
       @removed="photoIsRemoved = true"/>
      <CaptchaDialog v-if="captcha"
       @close="close"
       @cancel="cancel"
       @send="setCode"/>
      <Toast v-if="photoIsRemoved" @close="photoIsRemoved = false">Фото удалено</toast>

      <router-view @select="select"/>
    </DefaultActivity>
    <Recaptcha ref="recaptcha" @cancel="close"/>
  </div>
</template>

<style lang="less">
.message-dialog {
  display: flex;
  flex: 1 1 auto;
  border: 0px solid gray;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  height: 100%;
  &__history {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    flex: 1 1 auto;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: auto;
  }
  &__tools {
    flex: none;
    border-top: 1px solid @gray;
    background: @light;
  }
}

.send-form {
  position: relative;
  display: flex;
  width: 100%;
  // min-height: 64px;
  border: 0px solid red;
  align-items: flex-end;
  &__textarea {
    flex: 1 1 auto;
    border: 0px solid gray;
    padding: 7px 0;
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
      padding: 0 10px 12px;
    }
    &-account {
      cursor: pointer;
      flex: 0 0 auto;
      color: @dark-light;
      padding: 0 10px 12px;
    }
  }

  i {
    vertical-align: bottom;
  }
}
</style>
