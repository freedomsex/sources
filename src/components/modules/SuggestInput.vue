<script>
import _ from 'underscore';
import api from '~config/api';

export default {
  props: ['url', 'disabled', 'tags', 'title', 'default', 'params'],
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
      const query = this.$refs.text.value || this.query;
      const params = _.assign({q: query}, this.params);
      api.user.get(params, this.url).then(({data}) => {
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
    suggest: _.debounce(function f() {
      this.init = false;
      this.load();
    }, 500),
    // suggest(event) {
    //   this.init = false;
    //   console.log({query: this.query, event});
    //   this.load();
    // },
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
    fallback: _.debounce(function f() {
      // Если не работают подсказки и нельзя выбрать
      if (this.query && !this.suggested) {
        this.$emit('select', this.query);
      }
    }, 400),
  },
};
</script>

<template>
  <div>
    <div class="dropdown suggest-input form-inline">
      <input class="form-control" type="text" ref="text"
       autocomplete="off"
       v-model="query"
       :disabled="disabled"
       @focus="load()"
       @keyup="suggest()"
       @blur="fallback()"
       :placeholder="title || 'Введите текст'">

      <ul class="dropdown-menu" v-show="suggested">
        <li v-for="(item, index) in items"
         :key="index"
         :class="{disabled: saved(item)}"
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
    z-index: 1;
    > li > a {
      padding-left: 12px;
    }
  }
}
</style>
