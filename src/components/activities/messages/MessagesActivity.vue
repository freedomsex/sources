<script>
import ActivityActions from '~activities/ActivityActions';
import Toast from '~widgets/Toast';
import CaptchaDialog from '~dialogs/CaptchaDialog';
import SendForm from '~modules/SendForm';
import HumanTitle from '~assets/HumanTitle';
import MessageList from './MessageList';

export default {
  props: ['humanId', 'title'],
  data() {
    return {
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
    this.$store.dispatch('human/load', this.humanId);
  },
  computed: {
    human() {
      return this.$store.state.human;
    },
    caption() {
      return HumanTitle(this.human);
    },
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
    SendForm,
  },
};
</script>

<template>
  <div>
    <ActivityActions :caption="caption" @close="close">

      <template slot="option">
        <div class="header-bar__button" @click="videochat">
          <i class="material-icons">&#xE04B;</i>
        </div>
        <div class="header-bar__button" @click="$router.push(`${humanId}/incoming`)">
          <i class="material-icons">&#xE3B6;</i>
        </div>
      </template>

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
    // border-top: 1px solid @gray;
    // background: @light;
  }
}

</style>
