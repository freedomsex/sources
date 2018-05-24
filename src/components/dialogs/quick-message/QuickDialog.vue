<script>
import api from '~config/api';
import ModalDialog from '~dialogs/ModalDialog';

import LoadingWall from '~dialogs/LoadingWall';
import LoadingCover from '~dialogs/LoadingCover';
import AttentionWall from '~dialogs/AttentionWall';
import CaptchaDialog from '~dialogs/CaptchaDialog';
import Recaptcha from '~modules/Recaptcha';
import Notepad from '~default-activity/Notepad';
import MessagesCliche from '~default-activity/MessagesCliche';
import ContactWizard from '~dialogs/ContactWizard';
import InfoDialog from '~dialogs/InfoDialog';

export default {
  extends: ModalDialog,
  props: ['humanId', 'message', 'index'],
  data() {
    return {
      text: '',
      captcha: false,
      loading: false,
      confirm: false,
      ignore: false,
      addition: false,
      code: null,
      modals: {
        cliche: false,
        notepad: false,
      },
      interests: {
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
    };
  },
  // beforeRouteLeave(to, from, next) {

  // },
  mounted() {
    this.reload();
    console.log('reply', this.reply);
  },
  computed: {
    caption() {
      return this.reply ? 'Быстрый ответ' : 'Написать сообщение';
    },
    human() {
      return this.$store.state.search.human;
    },
    user() {
      return this.$store.state.user;
    },
    tags() {
      return 'tags' in this.human ? this.human.tags : [];
    },
    hold() {
      return this.ignore ? 0 : this.human.hold;
    },
    added() {
      return !(this.user.city && this.user.age && this.user.name);
    },
  },
  methods: {
    reload() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 4 * 1000);
      this.$store
        .dispatch('search/HUMAN', this.humanId)
        .then(() => {
          this.loaded();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    isDirt() {
      const word = /\w{0,5}[хx]([хx\s\!@#\$%\^&*+-\|\/]{0,6})[уy]([уy\s\!@#\$%\^&*+-\|\/]{0,6})[ёiлeеюийя]\w{0,7}|\w{0,6}[пp]([пp\s\!@#\$%\^&*+-\|\/]{0,6})[iие]([iие\s\!@#\$%\^&*+-\|\/]{0,6})[3зс]([3зс\s\!@#\$%\^&*+-\|\/]{0,6})[дd]\w{0,10}|[сcs][уy]([уy\!@#\$%\^&*+-\|\/]{0,6})[4чkк]\w{1,3}|\w{0,4}[bб]([bб\s\!@#\$%\^&*+-\|\/]{0,6})[lл]([lл\s\!@#\$%\^&*+-\|\/]{0,6})[yя]\w{0,10}|\w{0,8}[её][bб][лске@eыиаa][наи@йвл]\w{0,8}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[uу]([uу\s\!@#\$%\^&*+-\|\/]{0,6})[н4ч]\w{0,4}|\w{0,4}[еeё]([еeё\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[нn]([нn\s\!@#\$%\^&*+-\|\/]{0,6})[уy]\w{0,4}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[оoаa@]([оoаa@\s\!@#\$%\^&*+-\|\/]{0,6})[тnнt]\w{0,4}|\w{0,10}[ё]([ё\!@#\$%\^&*+-\|\/]{0,6})[б]\w{0,6}|\w{0,4}[pп]([pп\s\!@#\$%\^&*+-\|\/]{0,6})[иeеi]([иeеi\s\!@#\$%\^&*+-\|\/]{0,6})[дd]([дd\s\!@#\$%\^&*+-\|\/]{0,6})[oоаa@еeиi]([oоаa@еeиi\s\!@#\$%\^&*+-\|\/]{0,6})[рr]\w{0,12}/i; // eslint-disable-line no-useless-escape
      return !!word.test(this.text);
    },
    isPhone() {
      const word = /\d.*\d.*\d.*\d.*\d.*\d.*\d.*/i;
      return !!word.test(this.text);
    },
    isLink() {
      const word = /(https?:\/\/(www\.)?)/i;
      return !!word.test(this.text);
    },
    isSpam() {
      return this.isPhone() || this.isLink();
    },
    proxy() {
      if (this.added) {
        this.addition = true;
      } else if (this.isDirt() && !this.dirt.ignore) {
        this.dirt.show = true;
      } else if (this.isSpam() && !this.spam.ignore) {
        this.spam.show = true;
      } else {
        this.send();
      }
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
      console.log('cancel');
    },
    send(token) {
      this.$store.commit('grecaptchaTokenUpdate', token);
      const params = {
        id: this.humanId,
        mess: this.text,
        captcha_code: this.code,
        token: this.$store.state.grecaptchaToken,
      };
      api.messages
        .send(params)
        .then(({data}) => {
          this.onMessageSend(data);
        })
        .catch((error) => {
          this.onError(error);
        });
      //  this.sended();
      this.processTimeout(5);
    },
    setCode(code) {
      this.code = code;
      this.send();
    },
    onMessageSend({saved, error}) {
      if (!saved && error) {
        if (error == 'need_captcha') {
          this.captcha = true;
        }
        if (error == 'need_verify') {
          this.processTimeout(5);
          this.$refs.recaptcha.render(this.send);
          this.$refs.recaptcha.execute();
        }
      } else {
        this.$store.dispatch('notes/UPDATE', this.text);
        this.sended();
      }
    },
    sended() {
      this.process = false;
      this.$emit('sended');
      this.close();
      this.$refs.recaptcha.reset();
    },
    account() {
      this.$router.push(`${this.humanId}/detail`);
    },
    onError() {
      this.process = false;
    },
    visited() {
      this.$store.dispatch('visited/ADD', this.humanId);
    },
    close() {
      this.back();
      // this.$emit('close');
    },
    setText(text) {
      this.text = text;
    },
  },
  components: {
    LoadingWall,
    LoadingCover,
    AttentionWall,
    CaptchaDialog,
    Recaptcha,
    Notepad,
    MessagesCliche,
    ContactWizard,
    InfoDialog,
    ModalDialog,
  },
};
</script>

<template>
  <div>
    <ModalDialog @close="close">
      <div class="dialog-caption">
        <div class="dialog-caption__title">{{caption}}</div>
        <div class="dialog-caption__option" @click="account()">
          <span class="account">Анкета</span>
          <i class="material-icons">&#xE853;</i>
        </div>
      </div>
      <div class="modal-dialog__wrapper capped">
        <div class="modal-dialog__section">
          <div class="human-dialog__desire" v-show="tags.length" @click="account()">
            <span class="desire-tag__item-simple"
             v-for="(tag, index) in tags" :key="index"
             v-show="tag">{{tag}}</span>
          </div>

          <div slot="content"
           class="human-dialog__text"
           :class="reply ? 'message' : 'warning'"
           v-show="information"
           @click="action()">
            {{information}}
          </div>
        </div>
        <div class="modal-dialog__section">
          <div class="dialog-form">
            <div class="dialog-form__textarea">
              <textarea class="dialog-form__message-text"
               rows="1"
               placeholder="Введите текст"
               v-model="text" v-resized
               @keyup.ctrl.enter.prevent="proxy()"></textarea>
            </div>
            <div class="dialog-form__button-paste" @click="modals.cliche = true" v-if="!reply">
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

          <button class="btn btn-default" @click="modals.notepad = true">
            <i class="material-icons">&#xE14F;</i>
            Блокнот
          </button>
        </div>
      </div>
      <LoadingWall :show="loading"/>
      <LoadingCover :show="process"/>
    </ModalDialog>

    <AttentionWall v-if="hold"
     :show="hold"
     @promt="cancel"
     @close="close"/>
    <CaptchaDialog v-if="captcha"
     @close="close"
     @cancel="cancel"
     @send="setCode"/>
    <Recaptcha ref="recaptcha"
     @cancel="close"/>

    <Notepad v-if="modals.notepad"
     @select="setText"
     @cliche="modals.cliche = true"
     @close="modals.notepad = false"/>
    <MessagesCliche v-if="modals.cliche"
     @select="setText"
     @close="modals.cliche = false"/>

    <ContactWizard v-if="addition"
      :humanCity = "human.city"
      :humanAge = "human.age"
      @approve=""
      @close="addition = false"/>


    <InfoDialog v-if="interests.show && !interests.ignore"
      text="Учитывайте интересы собеседника.
      Потребуется подтверждение, если не совпадает
      желаемый город или возраст.
      Вирт интересен далеко не всем."
      @close="interests.ignore = true"/>

    <InfoDialog v-if="dirt.show && !dirt.ignore"
      text="Оскорбления в любой форме запрещены. На вас поступят жалобы,
      что грозит блокировкой анкеты. Возможно потребуется подтверждение."
      @close="dirt.ignore = true"/>

    <InfoDialog v-if="spam.show && !spam.ignore"
      text="Не отправляйте номера телефонов, ссылки, мессенджеры в начале знакомства.
      Так поступают мошенники, потребуется подтверждение."
      @close="spam.ignore = true"/>

  </div>
</template>

<style lang="less">
.dialog-caption {
  background: @menu-color;
  color: @white;
  font-size: 16px;
  padding: (@indent-sm + @indent-sm * 0.2) @indent-md @indent-sm;
  display: flex;
  &__title {
    flex: 3 1 auto;
    margin-right: 10px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__option {
    flex: 0 0 auto;
    color: @white;
    cursor: pointer;
    a {
      color: @white;
      display: inline-block;
    }
    .material-icons {
      vertical-align: middle;
      position: relative;
      top: -1px;
    }
    .account {
      border-bottom: 1px dashed #bbcccc;
      font-size: 15px;
      padding-bottom: 1px;
    }
  }

  &.warning {
    background: @orange;
  }
}

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
  &__desire {
    margin-bottom: @indent-sm;
    position: relative;
    font-size: 14px;
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
    }
  }
}

.desire-tag__item-simple {
  .link_simple();
  &:after {
    content: '•';
    color: @gray;
    padding: 0 @indent-xs;
    position: relative;
    top: 1px;
  }
  &:last-child:after {
    display: none;
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
