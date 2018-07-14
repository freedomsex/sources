<script>
import ActivityActions from '~activities/ActivityActions';
import Recaptcha from '~modules/Recaptcha';
import Toast from '~widgets/Toast';
import CaptchaDialog from '~dialogs/CaptchaDialog';
import SendForm from './SendForm';
import MessageList from './MessageList';

export default {
  props: ['humanId', 'title'],
  data() {
    return {
      caption: '',
      reply: '',
      show: true,
      count: 0,

      dirt: false,
      alert: false,
      captcha: false,
      virification: false,
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
    sended() {
      this.$store.commit('intimate/notifi', false);
      // MessList.messages.unshift(data.message);
      this.$refs.messages.reload();
    },
    attention(count) {
      this.count = count;
      if (count < 3) {
        this.alert = true;
      } else {
        this.alert = false;
      }
    },
    cancel() {
      this.captcha = false;
      this.confirm = false;
      this.ignore = true;
      console.log('cancel');
    },
    close() {
      this.$emit('close');
    },
    // preview() {
    //     this.$router.push(this.humanId + '/preview')
    // },
    videochat() {
      window.open(`/videochat.php?to=${this.humanId}`, 'videochat',
        'width=432, height=280, resizable=yes, scrollbars=yes');
    },
  },
  components: {
    ActivityActions,
    MessageList,
    CaptchaDialog,
    Toast,
    Recaptcha,
    SendForm,
  },
};
</script>

<template>
  <div>
    <ActivityActions @close="close">
      <span slot="caption">{{caption}}</span>

      <div class="menu-user__navbar-right" slot="option">
        <div class="navbar-button">
          <i class="material-icons" @click="videochat">&#xE04B;</i>
        </div>
        <div class="navbar-button">
          <i class="material-icons"
           @click="$router.push(`${humanId}/incoming`)">&#xE3B6;</i>
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
          <a href="http://docs.freedomsex.info/blog/#/Как-пользоваться/Осторожно-мошенники" target="_blank">Подробнее...</a>
        </div>
        <div class="message-dialog__tools">
          <SendForm
           :humanId="humanId"
           :count="count"
           @sended="sended"
           @close="close"/>
        </div>
      </div>

    </ActivityActions>
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
