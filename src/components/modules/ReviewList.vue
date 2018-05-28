<script>
import axios from 'axios';
import MoreButton from '~components/MoreButton';

export default {
  props: ['link'],
  data: () => ({
    end: false,
    timeout: true,
    reviews: [],
    loaded: 0,
    batch: 7,
  }),
  computed: {
    list() {
      return this.reviews.slice(0, this.loaded);
    },
  },
  mounted() {
    if (this.link) {
      this.load();
    }
  },
  methods: {
    load() {
      axios.get(this.link).then(({data}) => {
        this.loaded = this.batch;
        this.reviews = data;
        this.exceed();
      });
    },
    next() {
      this.loaded += this.batch;
      this.exceed();
    },
    exceed() {
      if (this.loaded >= this.reviews.length) {
        this.end = true;
      }
    },
  },
  components: {
    MoreButton,
  },
};
</script>

<template>
  <div>
    <div class="content-reviews" v-if="reviews.length">
      <div class="content-reviews__caption">Отзывы</div>
      <div class="content-reviews__item"
       v-for="(item, index) in list"
       :class="item.sex"
       :key="index">
        <b>{{item.name}}:</b>
        {{item.text}}
        <div class="reply" v-show="item.reply">{{item.reply}}</div>
      </div>
    </div>

    <div>
      <MoreButton @next="next" v-if="!end" />
      <button class="btn btn-default"
       @click="$router.push('/settings/reviews')"> Оставить отзыв </button>
    </div>
  </div>
</template>

<style lang="less">
  .content-reviews {
    margin: 20px 0 20px;

    &__caption {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 15px;
      padding: 10px 0px;
      border-bottom: 1px solid @gray;
    }

    &__item {
      border-radius: 0px;
      border-top: 0px solid #cccccc;
      margin: 15px 0 0 0px;
      text-align: left;
      font-size: 16px;

      &.man b {
        border-top: 0px solid #669933;
        color: #669933;
      }
      &.woman b {
        border-top: 0px solid #c082c0;
        color: #c082c0;
      }
      .reply {
        background: @light;
        border-left: 3px solid @gray-dark;
        margin: 10px 10px 0px;
        padding: 10px 15px;
        font-size: 14px;
      }
    }
  }
</style>
