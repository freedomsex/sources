<script>
import CensoredText from '~components/CensoredText';
import ConfirmDialog from '~dialogs/ConfirmDialog';
import InfoDialog from '~dialogs/InfoDialog';
import ColorContactIcon from './ColorContactIcon';

export default {
  props: ['item', 'index', 'idle', 'quick'],
  data() {
    return {
      account: false,
      detail: false,
      confirm: {
        remove: false,
        accept: false,
      },
    };
  },
  components: {
    ConfirmDialog,
    InfoDialog,
    CensoredText,
    ColorContactIcon,
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
    acceptRemove() {
      return this.$store.state.accepts.removeContacts;
    },
    userpic() {
      return this.item.userpic ? this.item.userpic.source : '';
    },
  },
  methods: {
    show() {
      // this.$emit('show');
      this.humanPush();
      if (this.idle && !this.acceptSettings) {
        this.$emit('accept');
      } else if (this.quick) {
        this.reply();
      } else {
        // this.anketa();
        this.dialog();
      }
    },
    humanPush() {
      this.$store.commit('human/save', this.item.user);
      this.$store.commit('human/save', {
        id: this.humanId,
        message: this.message,
        userpic: this.item.userpic,
      });
    },
    reply() {
      this.$emit('read', this.index);
      this.$router.push({name: 'quickReply',
        params: {
          humanId: this.humanId,
          index: this.index,
        }});
    },
    dialog() {
      this.$emit('read', this.index);
      // this.$emit('dialog', {id: this.humanId, title: this.title});
      this.$router.push({name: 'dialog', params: {humanId: this.humanId}});
    },
    confirmBun() {
      this.confirm = 'doit';
    },
    close() {
      this.detail = false;
      console.log('close');
    },
    accept() {
      this.$store.commit('accepts/confirm', 'removeContacts');
      this.confirm.accept = false;
    },
    bun() {
      this.$emit('bun', this.index);
    },
    remove(confirm) {
      if (!this.acceptRemove) {
        this.confirm.accept = true;
      } else if (!confirm) {
        this.confirm.remove = true;
      } else {
        this.$emit('remove', this.index);
      }
    },
    sended() {
      this.$emit('sended', this.index);
      this.close();
    },
  },
};
</script>

<template>
  <div class="contact-item" :class="{idle: idle}">
    <div class="contact-item__photo" @click="show">
      <ColorContactIcon :uid="humanId" :item="{name, city, age}" :src="userpic"/>
    </div>
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

        <span class="contact-item__message" :class="{idle: idle}">
          <CensoredText :text="message"
           :bypass="sent" :passive="true"/>
        </span>
      </div>
    </div>
    <div class="contact-item__edit"
     :class="{idle: idle}"
     @click="remove(false)">
      <i class="material-icons">&#xE14C;</i>
    </div>

    <ConfirmDialog v-if="confirm.remove"
      yesText="Удалить и наказать"
      noText="Удалить"
      @confirm="bun()"
      @cancel="remove(true)"
      @close="confirm.remove = false">
      <span slot="title">Накажите как следует</span>
      За резкие слова, за оскорбления, хамство
      или бессмысленные сообщения,
      накажите всех, кого считаете нужным.
      Наказание действует сразу.
    </ConfirmDialog>

    <InfoDialog v-if="confirm.accept"
      @close="confirm.accept = false"
      @confirm="accept()">
      <span slot="title">Удаляем навсегда</span>
      Контакты удаляются без возможности возобновить общение
      с собеседником. Обменивайтесь реальными контактами с теми
      кто вам интересен сразу.
    </InfoDialog>

  </div>
</template>

<style lang="less">

.contact-item {
  &:last-child {
    border-bottom-width: 0px;
  }
  display: flex;
  align-items: center;
  border-bottom: 1px solid @light;
  position: relative;
  background: @white;
  overflow: hidden;
  font-size: 14px;
    padding: 7px @indent-sm;

  &__photo {
    margin-right: @indent-sm;
    flex: 0 0 auto;
    position: relative;
  }

  &__content {
    .link;
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    flex: 1 2 auto;
    white-space: nowrap;
    overflow: hidden;
    min-height: 40px;
  }

  &__edit {
    flex: 0 0 auto;
    padding: 5px 0px 5px 5px;
    font-size: 0px;
    color: @gray;
    cursor: pointer;
  }

  &__info {
    flex: 1 1 auto;
    .user-list__name {
      color: @dark;
    }
    .user-list__age {
      color: @red;
    }
    .user-list__city {
      color: @link-color;
    }
    .idle {
      color: @gray-dark;
    }
  }

  &__preview {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    //padding-top: @indent-xs;
  }

  &.idle {
    background: @light;
    border-color: @white;
  }

  &__message {
    flex: 1 1 auto;
    color: @gray-dark;
    overflow: hidden;
    display: inline-block;
    font-style: italic;
    white-space: nowrap;
    margin-left: @indent-xs;
    vertical-align: middle;
    text-overflow: ellipsis;

    &.idle {
      color: @gray-light;
    }
  }

  &__status {
    &-send {
      flex: 0 0 10px;
      color: @gray;
      font-size: 12px;
    }

    &-read {
      flex: 0 0 8px;
      background-color: @purpur-dark;
      width: 8px;
      height: 8px;
      display: inline-block;
      border-radius: 10px;
      vertical-align: middle;

      &.idle {
        background-color: @gray-light;
      }
    }
  }
}

.message-item {
  &__bunn {
    .btn-circle;
    background-color: #337ab7;
    margin: @indent-xs @indent-sm;
    margin-right: 1px;

    &.idle {
      background-color: @gray;
    }
  }

  &__bunn-alert {
    .btn-circle;
    background-color: #d9534f;
    margin: @indent-xs @indent-sm;
    margin-right: 1px;
  }

  &__remove {
    .btn-circle;
    background-color: @gray-light;
    margin: @indent-xs @indent-sm;
    margin-left: 1px;

    &.idle {
      background-color: @gray-light;
    }
  }
}
</style>
