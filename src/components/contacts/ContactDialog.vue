<script>
import api from '~config/api';
import DefaultActivity from '~default-activity/DefaultActivity';

export default {
  extends: DefaultActivity,
  props: ['quick'],
  data() {
    return {
      response: false,
      slow: false,
      error: false,
      amount: 0,
      offset: 0,
      batch: 10,
      max: 100,
      dialog: false,
      modals: {
        acceptSettings: false,
      },
    };
  },
  computed: {
    showLoader() {
      return this.slow && !this.response;
    },
    showAlert() {
      return this.error && this.response;
    },
    showHint() {
      return this.count < 1;
    },
    count() {
      const result = this.contacts ? this.contacts.length : 0;
      return result;
    },
    more() {
      const max = this.offset <= this.max - this.batch;
      const min = this.amount >= this.batch;
      return min && max;
    },
  },
  methods: {
    close() {
      // this.$emit('close');
      this.back();
    },
    reset() {
      this.response = false;
      this.error = false;
      this.slow = false;
    },
    hope() {
      const sec = 2;
      setTimeout(() => { this.slow = true; }, sec * 1000);
      this.reset();
    },
    loaded() {
      // this.received = result ? result.length : 0;
      // if (this.received) {
      //     this.contacts = _.union(this.contacts, result);
      // }
      this.offset += this.batch;
      this.amount = this.count;
      this.response = true;
      this.slow = false;
    },
    bun(index) {
      const item = this.contacts[index];
      console.log('bun', item);
      this.remove(index);
      api.bun.send({
        id: item.message.mess_id,
        tid: item.human_id,
        // text: this.item.message,
        // token: 'super secret token'
      });
    },
    splice(index) {
      this.$store.commit('delete', index);
    },
    error(error) {
      this.response = true;
      this.error = true;
      console.log(error);
    },
    dialogOpen(data) {
      this.dialog = data.id;
      this.title = data.title;
    },
  },
  mounted() {
    this.load();
  },
};
</script>

<template>
  <div class="">

  </div>
</template>

<style lang="less">
#contact-section {
  border-top: 1px solid @gray;
}

.contact-section {
  &__item {
    .link_simple;
    padding: @indent-sm @indent-sm;
    font-size: 14px;
  }
}

.contact-list {
  padding: 0 0 @indent-xs;
  &__next {
    text-align: center;
    margin: 10px 0 15px;
  }
}

.contact-item {
  &:last-child {
    border-bottom-width: 0px;
  }
  display: flex;
  border-bottom: 1px solid @light;
  position: relative;
  background: @white;
  overflow: hidden;
  font-size: 14px;

  &__content {
    .link;
    display: flex;
    flex-direction: column;
    flex: 1 2 auto;
    padding: 7px @indent-sm;
    white-space: nowrap;
    overflow: hidden;
  }

  &__option {
    flex: 0 0 90px;
    align-self: center;
    text-align: right;
    // width: 100px;
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

#captcha-dialog {
  max-width: 400px;
}

.captcha-dialog__caption {
  background: @orange;
  color: @white;
  font-weight: bold;
  font-size: 16px;
  padding: @indent-sm @indent-md;
  .glyphicon {
    float: right;
    color: @white;
  }
}

.captcha-dialog__body {
  padding: @indent-md @indent-md 0;
}

.captcha-dialog__option {
  padding: @indent-md @indent-md 0;
  text-align: right;
}

.captcha-dialog__addon {
  padding: 2px @indent-md;
  background: @white;
}

.message-input {
  min-height: 40px;
  table {
    position: relative;
  }
  margin: 0 @indent-md @indent-md;
}

.message-input__texarea {
  overflow: auto;
  min-height: 36px;
  padding: 10px 5px;
  font-size: 14px;
  margin: 0 0 10px;
  overflow-y: hidden;
  resize: vertical;
  line-height: 1;
}

.message-input__button() {
  position: absolute;
  bottom: 1px;
  display: block;
  width: 36px;
  height: 36px;
  margin: 2px;
  opacity: 0.5;
  cursor: pointer;
}

.message-input__button-account {
  .message-input__button();
  background-image: url("/static/img/icon/account.png");
}

.message-input__button-send {
  .message-input__button();
  background-image: url("/static/img/icon/send.png");
}
</style>
