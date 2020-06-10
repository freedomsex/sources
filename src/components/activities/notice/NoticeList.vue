<script>
import _ from 'underscore';

export default {
  props: ['list'],
  mounted() {
    this.load();
  },
  computed: {
    uid() {
      return this.$store.state.token.uid;
    },
    texts() {
      return this.$store.state.notice.texts;
    },
    messages() {
      const texts = {};
      _.each(this.texts, (item) => {
        texts[item.textId] = item;
      });
      return texts;
    },
  },
  methods: {
    async load() {
      await this.$service.run('notice/texts');
    },
    t(item) {
      return this.messages[item.textId];
    },
    style(item) {
      if (item.readed) {
        return 'readed';
      }
      return this.t(item).type;
    },
  },
};
</script>

<template>
  <div class="notice-list">
    <template v-for="(item, index) in list" v-if="texts.length">
      <div v-if="!item.deleted">
        <div class="notice-item" v-if="!t(item)">
          <div class="notice-item__body">
            Загрузка сообщения...
          </div>
        </div>
        <div class="notice-item" :class="style(item)" :key="item.id" v-else>
          <div class="notice-item__title">
            {{t(item).title}}
          </div>
          <div class="notice-item__body">
            {{t(item).text}}
          </div>
          <div class="notice-item__options">
            <button class="btn btn-sm"
              :class="item.readed ? 'btn-default' : 'btn-primary'"
              @click="$service.run('notice/read', item.id)"
              :disabled="item.readed">
              <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
              Прочитано
            </button>
            <button class="btn btn-default btn-sm"
              @click="$service.run('notice/delete', item.id)">
              <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
              Удалить
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="less">
.notice-list {
  padding: 0;
  .notice-item {
    padding: @indent-md @indent-md;
    border: 1px solid @gray-light;
    border-width: 0 0 1px 5px;

    &__title {
      margin-bottom: @indent-xs;
      font-weight: bold;
      font-size: @font-md;
    }
    &__body {
      // margin-bottom: @indent-sm;
    }
    &__options {
      margin-top: @indent-sm;
      .glyphicon {
        margin-right: 2px;
      }
    }

    &.success {
      border-left-color: @green;
    }
    &.info {
      border-left-color: @purpur;
    }
    &.warning {
      border-left-color: @orange;
    }
    &.danger {
      border-left-color: @red-dark;
    }

    &.readed {
      background-color: @light;
    }

  }
  &__item {

  }
}

</style>
