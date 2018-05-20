<script>
import _ from 'underscore';
import api from '~config/api';

export default {
  props: ['url', 'disabled', 'tags'],
  data() {
    return {
      query: '',
      items: [],
      enable: true,
      init: true,
    };
  },
  computed: {
    suggested() {
      return this.items.length;
    },
  },
  methods: {
    load() {
      api.user.get({q: this.query}, 'tag/suggest').then((response) => {
        this.loaded(response.data);
      });
    },
    reset() {
      this.query = '';
      this.items = [];
    },
    clear() {
      this.items = [];
    },
    suggest: _.debounce(() => {
      this.init = false;
      this.load();
    }, 500),
    select(item) {
      if (!this.saved(item)) {
        this.$emit('select', item);
      }
      this.reset();
    },
    loaded(data) {
      if (data && data.length) {
        this.items = data;
      } else {
        // this.clear();
      }
    },
    saved(tag) {
      return !!_.findWhere(this.tags, {tag});
    },
  },
};
</script>

<template>
  <div>
    <div class="dropdown suggest-input form-inline">
      <input class="form-control"
       type="text"
       autocomplete="off"
       v-model="query"
       :disabled="disabled"
       @focus="load"
       @keyup="suggest"
       placeholder="Ваше текст">

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
