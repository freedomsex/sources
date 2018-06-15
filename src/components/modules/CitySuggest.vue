<script>
import api from '~config/api';
import hasher from '~legacy/utils/simple-hash';

export default {
  props: ['city'],
  data() {
    return {
      query: '',
      cities: [],
      enable: true,
    };
  },
  mounted() {
    if (!this.query && this.city && this.city.length > 2) {
      this.query = this.city;
    }
  },
  computed: {
    suggested() {
      return this.cities.length;
    },
  },
  methods: {
    load() {
      if (!this.query.length) {
        return this.reset();
      }
      api.user.get({q: this.query, hash: hasher.random()}, 'town/suggest').then((response) => {
        this.loaded(response.data.cities);
      });
      return null;
    },
    reset() {
      this.cities = [];
    },
    select(item) {
      this.query = item;
      this.$emit('select', item);
      this.reset();
    },
    loaded(data) {
      if (data && data.length) {
        this.cities = data;
      } else {
        this.reset();
      }
    },
    fallback() {
      // Если не работают подсказки и нельзя выбрать
      if (!this.cities || !this.suggested) {
        this.$emit('select', this.query);
      }
    },
  },
};
</script>

<template>
  <div class="city-suggest-ed">
    <input class="city-suggest-ed__input form-control"
      type="text" autocomplete="off" placeholder="Введите название"
      v-model="query"
      @keyup="load()"
      @blur="fallback()">
    <ul class="dropdown-menu" v-show="suggested">
      <li v-for="(item, index) in cities"
        :key="index" @click="select(item)">
        <a href="#" @click.prevent>{{item}}</a></li>
    </ul>
  </div>
</template>

<style lang="less">
.city-suggest-ed {
  position: relative;
  .dropdown-menu {
    display: block;
    right: 0;
    > li > a {
      padding-left: 12px;
    }
  }
  &__input {
    width: 100%;
  }
}
</style>
