<script>
import LoadingWall from '~dialogs/LoadingWall';
import AttentionWall from '~dialogs/AttentionWall';
import AccentDialog from '~dialogs/AccentDialog';
import CensoredText from '~components/CensoredText';

import Loadable from '~mixins/Loadable';
import DesireListCompact from './DesireListCompact';
import DialogSendForm from './DialogSendForm';


export default {
  mixins: [Loadable],
  props: ['humanId', 'message', 'index'],
  data() {
    return {
      // text: '',
      loading: false,
      confirm: false,
      ignore: false,
      code: null,
    };
  },
  // beforeRouteLeave(to, from, next) {

  // },
  mounted() {
    this.reload();
    console.log('reply', this.reply);
  },
  computed: {
    reply: () => false,
    information: () => '',
    caption() {
      return this.reply ? 'Быстрый ответ' : 'Написать сообщение';
    },
    human() {
      return this.$store.state.human;
    },
    user() {
      return this.$store.state.user;
    },
    tags() {
      return (this.human && 'tags' in this.human) ? this.human.tags : [];
    },
    hold() {
      return this.ignore ? 0 : this.human.hold;
    },
  },
  methods: {
    reload() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 4 * 1000);
      this.$store.dispatch('human/load', this.humanId).then(() => {
        this.loaded();
      }).catch(() => {
        this.loading = false;
      });
    },
    loaded() {
      this.loading = false;
      this.visited();
      // console.log('hold:', this.human.hold);
      // console.log('tags:', this.human);
      // this.process = false;
    },
    remove() {
      console.log('::remove:: (!)');
      this.$emit('remove');
    },
    cancel() {
      this.captcha = false;
      this.confirm = false;
      this.ignore = true;
    },
    account() {
      this.$router.push(`${this.humanId}/detail`);
    },
    visited() {
      this.$store.dispatch('visited/ADD', this.humanId);
    },
    close() {
      this.$emit('close');
    },
    sended() {
      this.close();
    },
    // send(text) {
    //   this.text = text;
    // },
  },
  components: {
    AccentDialog,
    LoadingWall,
    AttentionWall,
    DesireListCompact,
    DialogSendForm,
    CensoredText,
  },
};
</script>

<template>
  <div>
    <AccentDialog :title="caption" @close="close">
      <span slot="option" @click="account()">
        <span class="account">Анкета</span>
        <i class="material-icons">&#xE853;</i>
      </span>

      <div slot="content">
        <div class="modal-dialog__section">
          <DesireListCompact :tags="tags" @select="account()"/>

          <div class="human-dialog__text message" v-if="message">
            <CensoredText :text="message" :passive="true"/>
          </div>
          <div class="human-dialog__text warning" v-if="information"
           @click="action()">
            {{information}}
          </div>
        </div>

        <DialogSendForm
        :human="human"
        :reply="reply"
        :excess="information"
        @sended="sended"
        @close="close"/>

      </div>

      <LoadingWall :show="loading"/>
    </AccentDialog>

    <AttentionWall v-if="hold"
     :show="hold"
     @promt="cancel"
     @close="close"/>
  </div>
</template>

<style lang="less">

.dialog-form {
  position: relative;
  display: flex;
  width: 100%;
  // min-height: 64px;
  border: 0px solid red;
  align-items: flex-end;
  &__textarea {
    flex: 1 1 auto;
    border: 0px solid gray;
    // padding: 7px 0;
    margin-bottom: @indent-xs;
    line-height: 1;
    align-self: center;
  }
  &__message-text {
    height: 0;
    overflow: auto;
    min-height: 36px;
    max-height: 100px;
    padding: 10px 5px;
    font-size: 14px;
    margin: auto;
    overflow-y: auto;
    resize: vertical;
  }

  &__button {
    &-paste {
      cursor: pointer;
      flex: 0 0 auto;
      color: @dark-light;
      padding: 0 0 12px 5px;
    }
  }

  i {
    vertical-align: bottom;
  }

  &__hint {
    font-size: @font-sm;
    color: @gray-dark;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    // margin-bottom: @indent-xs;
  }
}

.human-dialog {
  &__input {
    border-width: 0px;
  }
  &__body {
    padding: @indent-sm @indent-md 0;
  }
  &__text {
    padding: @indent-sm @indent-sm;
    background: @light;
    margin-bottom: @indent-xs;
    cursor: pointer;
    &.message {
      background: @light;
    }
    &.warning {
      background: @alert-sand;
      border-left: 3px solid @orange-light;
    }
  }
}

.human-dialog__form {
  position: relative;
  padding-bottom: @indent-sm;
  &-send {
    .btn-circle;
    background: @menu-color;
    position: absolute;
    padding: @indent-sm;
    right: @indent-sm;
    bottom: @indent-sm;
    .glyphicon {
      position: relative;
      left: -2px;
    }
  }
  &-anketa {
    width: 40px;
    position: absolute;
    left: @indent-sm;
    bottom: @indent-sm;
  }
  &-input {
    margin: 0 55px 0 45px;
    padding: @indent-sm @indent-sm;
    &:empty:not(:focus):before {
      color: @gray-dark;
      content: attr(placeholder);
      display: block;
    }
  }
}
</style>
