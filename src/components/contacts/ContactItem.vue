<script>
import RemoveContact from '~dialogs/remove-confirm/RemoveContact';

export default {
  props: ['item', 'index', 'idle', 'quick'],
  data() {
    return {
      account: false,
      detail: false,
      confirm: false,
    };
  },
  computed: {
    name() {
      let result = 'Парень или девушка';
      if (this.item.user) {
        result = this.item.user.sex == 2 ? 'Девушка' : 'Парень';
        if (this.item.user.name) {
          result = this.item.user.name;
        }
      }
      return result;
    },
    age() {
      return this.item.user && this.item.user.age ? this.item.user.age : '';
    },
    city() {
      return this.item.user && this.item.user.city ? this.item.user.city : '';
    },
    title() {
      return `${this.name} ${this.age} ${this.city}`;
    },
    message() {
      return this.item.message ? this.item.message.text : '';
    },
    unread() {
      return this.item.message ? this.item.message.unread : 0;
    },
    sent() {
      return this.item.message
        ? this.item.message.sender == this.$store.state.user.uid
        : 0;
    },
    humanId() {
      return this.item.human_id;
    },
    acceptSettings() {
      return this.$store.state.accepts.settings;
    },
  },
  methods: {
    show() {
      // this.$emit('show');
      if (this.idle && !this.acceptSettings) {
        this.$emit('accept');
      } else if (this.quick) {
        this.reply();
      } else {
        // this.anketa();
        this.dialog();
      }
    },
    reply() {
      this.$emit('read', this.index);
      console.log('item show', {
        humanId: this.humanId,
        message: this.message,
        index: this.index,
      });
      this.$router.push({
        name: 'quickReply',
        params: {
          humanId: this.humanId,
          message: this.message,
          index: this.index,
        },
      });
    },
    dialog() {
      this.$emit('read', this.index);
      // this.$emit('dialog', {id: this.humanId, title: this.title});
      this.$router.push({
        name: 'dialog',
        params: {humanId: this.humanId, title: this.title},
      });
    },
    confirmBun() {
      this.confirm = 'doit';
      console.log('confirmBun');
    },
    confirmRemove() {
      // this.$emit('remove');
      // console.log('initial-item REMOVE');
      this.confirm = !this.quick ? 'some' : 'must';
    },
    close() {
      this.detail = false;
      console.log('close');
    },
    bun() {
      console.log('bun1', this.index);
      this.$emit('bun', this.index);
    },
    remove() {
      console.log('remove=remove', this.index);
      this.$emit('remove', this.index);
    },
    cancel() {
      this.confirm = false;
      console.log('cancel');
    },
    sended() {
      this.$emit('sended', this.index);
      this.close();
    },
  },
  components: {
    RemoveContact,
  },
};
</script>

<template>
  <div class="contact-item" :class="{idle: idle}">
    <div class="contact-item__content" @click="show">
      <div class="contact-item__info">
        <span class="user-list__name" :class="{idle: idle}">{{name}}</span>
        <span class="user-list__age" :class="{idle: idle}" v-show="age">{{age}}</span>
        <span class="user-list__city" :class="{idle: idle}" v-show="city">{{city}}</span>
      </div>
      <div class="contact-item__preview">

        <span class="contact-item__status-read" :class="{idle: idle}" v-if="unread"></span>
        <span aria-hidden="true"
         class="glyphicon glyphicon-chevron-left contact-item__status-send"
         v-else v-show="sent"></span>

        <span class="contact-item__message" :class="{idle: idle}" v-html="message"></span>
      </div>
    </div>
    <div class="contact-item__option">
      <span class="message-item__bunn" :class="{idle: idle}"
        v-show="!sent" @click="confirmBun">
        <span aria-hidden="true" class="glyphicon glyphicon-thumbs-down"></span>
      </span>
      <span class="message-item__remove" :class="{idle: idle}" @click="confirmRemove">
        <span aria-hidden="true" class="glyphicon glyphicon-remove"></span>
      </span>
    </div>

    <RemoveContact v-show="confirm"
      :show="confirm"
      @bun="bun"
      @close="cancel"
      @remove="remove"/>
  </div>
</template>

<style lang="less">
</style>
