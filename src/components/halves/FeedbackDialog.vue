<script>
import HalfDialog from '~halves/HalfDialog';

export default {
  props: [],
  components: {
    HalfDialog,
  },
  data: () => ({
    message: '',
  }),
};
</script>

<template>
  <HalfDialog :caption="true" @close="$emit('close')">
    <template slot="caption">
      Обратная связь
    </template>

    <div class="feedback-dialog">
      <textarea v-model="message" autofocus maxlength="500"></textarea>
      <button class="btn btn-primary" @click="$service.run('feedback/add', message)">
        Добавить ответ
      </button>
    </div>
  </HalfDialog>
</template>

<style lang="less">
.feedback-dialog {
  padding: @indent-sm;

  textarea {
    display: block;
    min-height: 100px;
    margin-bottom: @indent-sm;
  }
}
</style>
