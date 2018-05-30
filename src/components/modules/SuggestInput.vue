<script>
import _ from 'underscore';
import api from '~config/api';

export default {
  props: ['url', 'disabled', 'tags', 'title', 'default'],
  data() {
    return {
      query: '',
      items: [],
      enable: true,
      init: true,
    };
  },
  mounted() {
    this.query = this.default;
  },
  computed: {
    suggested() {
      return this.items.length;
    },
  },
  methods: {
    load() {
      api.user.get({q: this.query}, this.url).then(({data}) => {
        this.loaded(data);
      });
    },
    reset() {
      if (!this.default) {
        this.query = '';
      }
      this.items = [];
    },
    clear() {
      this.items = [];
    },
    suggest: _.debounce(function () {
      this.init = false;
      this.load();
    }, 500),
    select(item) {
      if (!this.saved(item)) {
        this.$emit('select', item);
        this.query = item;
      }
      this.reset();
    },
    loaded(data) {
      if (data && Array.isArray(data) && data.length) {
        this.items = data;
      } else {
        // this.clear();
      }
    },
    saved(tag) {
      return this.tags && !!_.findWhere(this.tags, {tag});
    },
  },
};
</script>

<template>
  <div>
    <div class="dropdown suggest-input form-inline">
      <input class="form-control" type="text"
       autocomplete="off"
       v-model="query"
       :disabled="disabled"
       @focus="load"
       @keyup="suggest"
       :placeholder="title || 'Введите текст'">

      <ul class="dropdown-menu" v-show="suggested">
        <li v-for="(item, index) in items"
         :key="index" :class="{disabled: saved(item)}"
         @click="select(item)">
          <a href="#" @click.prevent>
            {{item}}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less">
.suggest-input {
  &__hint {
    color: @dark-light;
    margin: @indent-xs 0 @indent-xs;
  }
  .dropdown-menu {
    display: inline-block;
    > li > a {
      padding-left: 12px;
    }
  }
}
</style>
