<script>
import axios from 'axios';
import ContentActivity from './ContentActivity';

export default {
  extends: ContentActivity,
  data() {
    return {
      enableReview: true,
    };
  },
  mounted() {
    this.title = 'Справка';
    this.load(`/content/help/${this.link}`);
    this.loadReviews();
  },
  methods: {
    show(index) {
      this.preview = this.galery[index];
    },
    loadReviews() {
      axios.get(`/docs/blog/rev/${this.link}.json`).then(({data}) => {
        this.reviews = data;
      });
    },
  },
};
</script>

<template>
  <div class="">

  </div>
</template>

<style lang="less">
</style>
