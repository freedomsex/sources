<script>
export default {
  props: [],
  data: () => ({

  }),
};
</script>

<template>
  <div class="feedback-buttons">
    <button class="btn btn-primary " @click="$router.push('/settings/reviews')">
      <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
      Оставить отзыв
    </button>
    <button class="btn btn-warning " @click="$router.push('/settings/question')">
      <span class="glyphicon glyphicon-question-sign" aria-hidden="true"></span>
      Задать вопрос
    </button>
  </div>
</template>

<style lang="less">

.feedback-buttons {
  .split-top();
  text-align: center;
  .glyphicon {
    margin-right: 2px;
  }
}
</style>
