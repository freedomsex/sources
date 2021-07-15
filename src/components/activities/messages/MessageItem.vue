<script>
import axios from 'axios';
import CONFIG from '~config/';
import PhotoSend from '~modules/PhotoSend';
import Toast from '~widgets/Toast';
import ConfirmDialog from '~dialogs/ConfirmDialog';
import InfoDialog from '~dialogs/InfoDialog';

import CensoredText from '~components/CensoredText';

let prev = null;

export default {
  props: ['item', 'index', 'count', 'alert'],
  data() {
    return {
      showOption: false,
      fixOption: false,
      alertOption: false,
      showDialog: false,
      photo: false,
      photoNotFound: false,
      confirm: {
        remove: false,
        accept: false,
      },
    };
  },
  mounted() {
    if (!this.sent && !this.index && this.count < 5) {
      this.fix();
      this.alertOption = true;
    }
    if (!this.sent && !this.read) {
      this.$emit('set-new');
    }
    // console.log('item', this.index +'+'+ this.date);
  },
  computed: {
    uid() {
      return this.$store.state.token.uid;
    },
    attention() {
      return this.alert || this.alertOption ? 1 : 0;
    },
    option() {
      if (!this.index && this.alert) {
        return true;
      }
      return this.showOption || this.fixOption ? 1 : 0;
    },
    sent() {
      return !this.uid || this.uid == this.item.fromId ? 1 : 0;
    },
    read() {
      return this.item.readed != 0;
    },
    time() {
      return this.$moment(this.item.added).format('HH:mm');
    },
    alias() {
      let result = false;
      const text = this.item.message;
      const old = /.+images.intim?.(.{32})\.(jpg)/i;
      const now = /\[\[IMG:(.{32})\]\]/i;
      result = old.test(text) ? old.exec(text) : false;
      result = !result && now.test(text) ? now.exec(text) : result;
      if (result) {
        result = result[1];
      }
      return result;
    },
    image() {
      const image = this.pathName(this.alias);
      return image ? `${CONFIG.API_PHOTO}/res/photo/preview/${image}.png` : false;
    },
    previous() {
      const p = prev;
      prev = this.item.fromId;
      return !!(!p || p == prev);
    },
    acceptRemove() {
      return this.$store.state.accepts.removeMessages;
    },
  },
  methods: {
    fix() {
      this.showOption = true;
      this.alertOption = false;
      if (!this.alert) {
        this.fixOption = this.alert ? false : !this.fixOption;
      } else {
        this.$emit('admit');
      }
    },
    bun() {
      const data = {
        id: this.item.id,
        tid: this.item.fromId,
      };
      this.$api
        .res('mess/bun', 'raw')
        .post(data)
        .then(() => {
          this.$emit('remove', this.index);
        })
        .catch(() => {
          console.log('error');
        });
    },
    cancel() {
      this.confirm.remove = false;
      console.log('cancel');
    },
    remove() {
      const data = {
        id: this.item.id,
      };
      this.$api
        .res('mess/delete', 'raw')
        .post(data)
        .then(() => {
          // this.$emit('remove', this.index);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$emit('remove', this.index);
    },
    confirmRemove(confirm) {
      if (!this.acceptRemove) {
        this.confirm.accept = true;
      } else if (!confirm) {
        this.confirm.remove = true;
      } else {
        this.remove();
      }
    },
    play() {
      const config = {
        headers: {Authorization: `Bearer ${this.$store.state.token.access}`},
        params: {tid: this.item.fromId},
      };
      const url = `${CONFIG.API_PHOTO}/api/v1/users/${this.uid}/sends/${this.alias}.jpg`;
      axios
        .get(url, config)
        .then((response) => {
          this.preview(response.data.photo);
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status == '404') {
            this.photoNotFound = true;
          }
        });
    },
    preview(photo) {
      const {_links: links} = photo;
      if (links.origin.href) {
        this.photo = {
          thumb: links.thumb.href,
          photo: links.origin.href,
          alias: photo.alias,
          height: photo.height,
          width: photo.width,
        };
      }
    },
    pathName(name) {
      if (!name || name.length < 10) {
        return null;
      }
      const path = [name.substr(0, 2), name.substr(2, 2), name.substr(4, 3)];
      return `${path.join('/')}/${name}`;
    },
    accept() {
      this.$store.commit('accepts/confirm', 'removeMessages');
      this.confirm.accept = false;
    },
  },
  components: {
    CensoredText,
    Toast,
    PhotoSend,
    ConfirmDialog,
    InfoDialog,
  },
};
</script>

<template>
  <div class="message-item" @mouseleave="showOption = false">
    <div class="message-item__spliter" v-show="!previous"></div>
    <div :class="[sent ? 'message-item__sent' : 'message-item__received']">
      <div class="message-item__balloon" @mouseover="showOption = true" @click="fix">
        <div v-if="image" class="message-image" :style="{backgroundImage: 'url(' + image + ')'}">
          <div class="message-image__play" @click="play">
            <img src="~static/img/play.png" />
          </div>
          <span class="message-image__info">
            <span class="message-image__status" v-show="!read"></span>
            <span class="message-image__time">{{ time }}</span>
          </span>
        </div>
        <span v-else>
          <CensoredText :text="item.message" :bypass="sent" />
          <span class="message-info">
            <span class="message-info__status" v-show="!read"></span>
            <span class="message-info__time">{{ time }}</span>
          </span>
        </span>
      </div>
      <span
        class="message-item__remove"
        :class="attention ? 'message-item__bunn-alert' : 'message-item__remove'"
        v-show="option"
        @click="confirmRemove(false)"
      >
        <span aria-hidden="true" class="glyphicon glyphicon-remove"></span>
      </span>
    </div>

    <span v-if="confirm.remove">
      <ConfirmDialog
        v-if="sent"
        yesText="Удалить сообщение"
        @confirm="remove()"
        @close="confirm.remove = false"
      >
        <span slot="title">Автоочистка</span>
        Все сообщения из переписки удаляются автоматически в течении недели. Удалять сообщение на
        которые уже поступила жалоба бессмысленно.
      </ConfirmDialog>

      <ConfirmDialog
        v-else
        yesText="Наказать и удалить"
        noText="Удалить"
        @confirm="bun()"
        @cancel="remove()"
        @close="confirm.remove = false"
      >
        <span slot="title">Очень важно</span>
        Мы никогда не узнаем о нарушениях, если удалить без наказания. Нажмите "Наказать и удалить"
        у всех сообщений которые вызывают негатив.
      </ConfirmDialog>
    </span>

    <InfoDialog v-if="confirm.accept" @close="confirm.accept = false" @confirm="accept()">
      <span slot="title">Удаляем отовсюду</span>
      Сообщение пропадет как из вашей истории переписки, так и из переписки вашего собеседника.
      Сообщения удаляются без возможности восстановить.
    </InfoDialog>

    <PhotoSend v-if="photo" :photo="photo" @close="photo = false" />
    <Toast v-if="photoNotFound" @close="photoNotFound = false">Фото не найдено</Toast>
  </div>
</template>

<style lang="less">
.message-balloon() {
  display: inline-block;
  overflow: hidden;
  padding: @indent-sm @indent-sm;
  max-width: 80%;
  word-wrap: break-word;
  font-size: 14px;
  border: 1px solid @gray-light;
  border-radius: 4px;
  color: @dark;
  float: left;
  text-align: left;
}

.message-item__info {
  padding: @indent-sm @indent-sm;
}

.message-item {
  display: block;
  margin: 2px 0;
  &__sent {
    text-align: right;
    .message-item__balloon {
      .message-balloon;
      background: #d9e6f6;
      float: right;
    }
    &:after {
      .clear-fix;
    }
  }

  &__received {
    .message-item__balloon {
      .message-balloon;
      background: white;
    }
    &:after {
      .clear-fix;
    }
  }
}

.message-image {
  .link;
  position: relative;
  background-color: rgba(0, 0, 0, 0.3);
  background-size: cover;
  width: 200px;
  height: 150px;
  text-align: center;
}

.message-image__info {
  font-size: 0;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 20px 5px 5px 5px;
  text-align: right;
  background: linear-gradient(to bottom right, transparent 70%, rgba(0, 0, 0, 0.3));
}

.message-image__time {
  color: @white;
  font-size: 11px;
  margin-left: 5px;
}

.message-image__status {
  .message-info__status;
  background-color: @white;
}

.message-image__play {
  .btn-circle;
  display: inline-block;
  margin-top: 42px;
  border-color: transparent;
  background-color: rgba(0, 0, 0, 0.3);
  img {
    width: 48px;
    height: 48px;
    opacity: 0.7;
    &:hover {
      opacity: 0.9;
    }
  }
}

.message-info {
  font-size: 0;
  display: inline-block;
  white-space: nowrap;
  float: right;
  margin-left: 7px;
  margin-top: 5px;
}

.message-info__time {
  color: @gray-dark;
  font-size: 11px;
  margin-left: 5px;
}

.message-info__status {
  background-color: @purpur-dark;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 10px;
}

.message-item__date {
  height: 14px;
  text-align: center;
  margin: @indent-sm auto @indent-md;
  span {
    background-color: @white;
    font-size: 14px;
    font-weight: normal;
    position: relative;
    color: @gray-dark;
  }
}

.message-item__options {
  min-height: @indent-lg + 2;
}

.message-item__spliter {
  min-height: @indent-sm;
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

.message-item__delete {
  padding: @indent-xs @indent-sm + 1;
  display: inline-block;
  font-size: @font-sm;
  transition: color 0.2s ease;
  -moz-transition: color 0.2s ease;
  -o-transition: color 0.2s ease;
  -webkit-transition: color 0.2s ease;
}
</style>
