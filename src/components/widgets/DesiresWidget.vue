<script>
import _ from 'underscore';
import DesireList from '~modules/DesireList/DesireList';

export default {
  props: ['tags'],
  data() {
    return {
      batch: 50,
      position: 0,
      list: [],
    };
  },
  mounted() {
    this.reload();
  },
  updated() {
    this.reload();
  },
  computed: {
    avaible() {
      const result = this.tags.length - this.position;
      return result > 0 ? result : 0;
    },
    more() {
      return this.tags ? this.avaible : false;
    },
    offset() {
      let result = this.batch;
      if (this.list.length && this.list.length < this.batch) {
        result = this.batch - this.list.length;
      }
      return result;
    },
    next() {
      const result = this.tags.slice(this.position, this.position + this.offset);
      return _.shuffle(result);
    },
  },
  methods: {
    load() {
      if (this.more) {
        this.list = _.union(this.list, this.next);
        this.position = this.list.length;
      }
    },
    reload() {
      if (!this.position || this.offset != this.batch) {
        this.load();
      }
    },
  },
  components: {
    DesireList,
  },
};
</script>

<template>
  <div class="container desires-widget">
    <div class="row">
      <div class="desires-widget__caption">Желания и фантазии</div>
      <div class="desires-widget__wrapper">
        <DesireList :tags="list"/>
        <div class="desires-widget__next" v-show="more">
          <span class="btn btn-default btn-sm" @click="load">
            Ещё
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.desires-widget {
  &__caption {
    padding: 10px 15px;
    text-align: center;
    font-size: 16px;
    color: #666666;
    min-height: 30px;
    border-bottom: 2px solid #e5e5e5;
  }
  &__wrapper {
    margin: 10px 15px;
  }
  &__next {
    text-align: center;
  }
}
</style>
