<script>
import _ from 'underscore';
import DesireList from '@freedomsex/account-component/DesireList/DesireList';

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
    if (this.$el.offsetWidth < 700) {
      this.batch = 20;
    }
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
      <div class="widget__caption">Желания и фантазии</div>
      <div class="widget__wrapper">
        <DesireList :tags="list"/>
        <div class="desires-widget__next">
          <span class="btn btn-default btn-sm" v-show="more" @click="load">
            <span aria-hidden="true" class="glyphicon glyphicon-flash"></span>
            Ещё
          </span>
          <a class="btn btn-danger btn-sm" rel="nofollow"
           href="//fapbook.me/" target="_blank">
            Смотреть фото 18+
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">

.desires-widget {
  .widget();
  &__next {
    text-align: center;
  }
}
</style>
