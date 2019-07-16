<script>
import _ from 'underscore';
import axios from 'axios';
import hasher from '~legacy/utils/simple-hash';
import CONFIG from '~config/';

import InfoDialog from '~dialogs/InfoDialog';
import MessageItem from './MessageItem';
import ListDate from './ListDate';

import HumanSummary from '~halves/HumanSummary';

const fdate = null; // eslint-disable-line no-unused-vars
const prev = null; // eslint-disable-line no-unused-vars
// TODO: переписать глобальную зависимость

export default {
  props: ['humanId', 'readonly'],
  data() {
    return {
      messages: [],
      response: null,
      error: 0,
      offset: 0,
      newCount: 0,
      batch: 15,
      received: 0,
      attention: false,
      date: null,
      toSlow: false,
      skipScroll: false,
      abuseSuccessHint: false,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    reload() {
      this.offset = 0;
      this.newCount = 0;
      this.messages = [];
      this.load();
    },
    load() {
      // console.log('load MessList data');
      this.response = 0;
      const config = {
        headers: {Authorization: `Bearer ${this.$store.state.token.access}`},
        params: {tid: this.humanId, offset: this.offset, hash: hasher.random()},
      };
      axios.get(`${CONFIG.API_DIALOG}/api/v1/users/${this.userId}/dialog`, config).then(({data}) => {
        this.onLoad(data);
      })
        .catch((error) => {
          this.error = 10;
          this.$Progress.fail();
          console.log(error);
        });
      // setTimeout(() => { this.toSlow = true; }, 7000);
      this.$Progress.start();
    },
    loadNext() {
      this.skipScroll = true;
      this.load();
    },
    onLoad(data) {
      const messages = data;
      this.received = messages ? messages.length : 0;
      if (!messages && !this.messages.length) {
        this.noMessages();
      } else {
        if (this.received) {
          this.messages = _.union(messages.reverse(), this.messages);
        }
        this.offset += this.batch;
        this.scammer();
      }
      this.response = 200;
      this.toSlow = false;
      this.$Progress.finish();
      this.$nextTick(() => {
        // this.scroll();
      });

      const config = {
        headers: {Authorization: `Bearer ${this.$store.state.token.access}`},
      };
      axios.put(`${CONFIG.API_DIALOG}/api/v1/users/${this.userId}/dialog/read`, {tid: this.humanId}, config);
    },
    scroll() {
      if (this.skipScroll) {
        this.skipScroll = false;
        return true; // TODO: проверить и удалить
      }
      const objDiv = document.getElementById('dialog-history');
      console.log('scroll', objDiv.scrollTop);
      objDiv.scrollTop = objDiv.scrollHeight + 30;
      console.log('scroll', objDiv.scrollTop);
      return false;
    },
    noMessages() {
      // TODO: Заменить на компоненты, страрые зависимости
      // quick_mess.ajax_load();
      // notice_post.show();
      // store.commit('intimate/CHECK', false);
    },
    scammer() {
      this.$emit('attention', this.replyCount);
    },
    // setDate(date) {
    //   // this.date = new Date(this.item.date).getDayMonth();
    // },
    remove(index) {
      this.messages.splice(index, 1);
    },
    admit() {
      this.attention = false;
    },
    setNew() {
      this.newCount += 1;
    },
  },
  computed: {
    // items() {
    //     //let arr = this.messages.slice();
    //     return this.messages.slice().reverse();
    // },
    count() {
      return this.messages.length;
    },
    replyCount() {
      return _.where(this.messages, {from: `${this.userId}`}).length;
    },
    more() {
      if (this.received && this.received == this.batch) {
        return true;
      }
      return false;
    },
    userId() {
      return this.$store.state.user.uid;
    },
  },
  components: {
    HumanSummary,
    MessageItem,
    InfoDialog,
    ListDate,
  },
};
</script>

<template>
  <div class="message-list" v-show="!error">

    <HumanSummary :vip="null" :humanId="humanId" :centred="true" v-if="!readonly"/>

    <div class="messages__new" v-show="newCount" @click="load">
      <span class="messages__new-lamp">Новые
      +<b>{{newCount}}</b>
      </span>
    </div>
    <div class="messages__next" @click="loadNext" v-show="more">
      <span class="btn btn-default btn-xs">Следующие</span>
    </div>
    <div class="messages" v-if="count">
      <template v-for="(item, index) in messages">
        <ListDate :list="messages" :index="index"/>
        <MessageItem
          :item="item"
          :index="index"
          :count="count"
          :alert="attention"
          :key="item.id"
          @admit="admit"
          @remove="remove"
          @set-new="setNew"/>
      </template>
    </div>
    <div class="messages__loader" v-show="!error && !response">
      <span>
        <img src="~static/img/icon/mess_loader.gif" v-show="toSlow">
        Загружаем
      </span>
    </div>
  </div>
</template>

<style lang="less">
.message-list {
  flex: 1 0 auto;
  padding: @indent-sm @indent-md 0;
  min-height: 100%;
  // margin-top: @indent-sm;
}

.messages {
  overflow: hidden;
  padding-top: 0px;
  padding-bottom: @indent-sm;

  &__new {
    text-align: center;
    margin-top: 10px;
    &-lamp {
      padding: 3px @indent-sm;
      background-color: @orange;
      color: @white;
      display: inline-block;
      border-radius: 10px;
    }
  }

  &__loader {
    border-top: 1px dotted @gray-dark;
    height: 10px;
    text-align: center;
    margin-top: 8px;
    span {
      padding: 0px 5px;
      background-color: @white;
      font-size: 11px;
      margin: 0px auto 5px;
      position: relative;
      top: -8px;
    }
  }

  &__next {
    text-align: center;
    margin-top: @indent-md;
  }

  &__alert {
    background-color: @alert-sand;
    padding: @indent-xs @indent-md;
  }
}

.form-message__buttons {
  margin: @indent-sm 0 @indent-lg;
  padding: 0;
  color: #888;
}

.form-message__alert {
  padding: @indent-md @indent-md @indent-lg;
  background: @alert-sand;
  .captcha-img__addon {
    padding: 0 @indent-sm;
    background: @white;
  }
}

.form-message__notice() {
  font-size: 12px;
  margin: 0px 0px 5px;
  padding: @indent-xs @indent-sm;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border: 1px solid @gray;
  border-width: 0 1px 1px;
}
.form-message__notice {
  &-regular {
    .form-message__notice;
    background: @light;
    color: @dark-light;
  }
  &-alert {
    .form-message__notice;
    background: @pink-dark;
    color: @white;
    .glyphicon {
      margin-right: 3px;
    }
  }
}

#remove-dialog {
  padding: @indent-xl @indent-lg @indent-lg;
}
</style>
