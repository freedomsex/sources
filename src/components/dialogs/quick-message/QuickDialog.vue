<script>
import LoadingWall from '~dialogs/LoadingWall';
import AttentionWall from '~dialogs/AttentionWall';
import AccentDialog from '~dialogs/AccentDialog';
import CensoredText from '~components/CensoredText';

import Loadable from '~mixins/Loadable';
import DesireListCompact from '~modules/DesireListCompact';
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
  },
  computed: {
    reply: () => false,
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
  },
  methods: {
    information: () => '',
    reload() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 4 * 1000);
      this.$service.run('human/load', this.humanId).then(() => {
        this.loaded();
      }).catch(() => {
        this.loading = false;
      });
    },
    loaded() {
      this.loading = false;
      this.visited();
    },
    remove() {
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
      this.$service.run('visits/save', this.humanId);
    },
    close() {
      this.$emit('close');
    },
    sended() {
      this.close();
    },
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
          <div class="human-dialog__text warning" v-if="information()"
           @click="action()">
            {{information()}}
          </div>
        </div>

        <DialogSendForm
        :key="humanId"
        :human="human"
        :reply="message"
        :excess="information()"
        @sended="sended"
        @close="close"/>

      </div>

      <LoadingWall :show="loading"/>
    </AccentDialog>

    <AttentionWall v-if="!ignore && human.hold"
     :show="human.hold"
     @promt="cancel"
     @close="close"/>
  </div>
</template>

<style lang="less">
// .human-dialog {
//   &__input {
//     border-width: 0px;
//   }
//   &__body {
//     padding: @indent-sm @indent-md 0;
//   }
//   &__text {
//     padding: @indent-sm @indent-sm;
//     background: @light;
//     // margin-bottom: @indent-xs;
//     cursor: pointer;
//     &.message {
//       background: @light;
//     }
//     &.warning {
//       background: @alert-sand;
//       border-left: 3px solid @orange-light;
//     }
//   }
// }
//
// .human-dialog__form {
//   position: relative;
//   padding-bottom: @indent-sm;
//   &-send {
//     .btn-circle;
//     background: @menu-color;
//     position: absolute;
//     padding: @indent-sm;
//     right: @indent-sm;
//     bottom: @indent-sm;
//     .glyphicon {
//       position: relative;
//       left: -2px;
//     }
//   }
//   &-anketa {
//     width: 40px;
//     position: absolute;
//     left: @indent-sm;
//     bottom: @indent-sm;
//   }
//   &-input {
//     margin: 0 55px 0 45px;
//     padding: @indent-sm @indent-sm;
//     &:empty:not(:focus):before {
//       color: @gray-dark;
//       content: attr(placeholder);
//       display: block;
//     }
//   }
// }
</style>
