<script>
import ProfileOldWidget from './widgets/profile-old-widget.vue';
import ProfileLastWidget from './widgets/profile-last-widget.vue';

export default {
  props: ['userId', 'time', 'last', 'sex'],
  data: () => ({

  }),
  components: {
    ProfileOldWidget,
    ProfileLastWidget,
  },
};
</script>

<template>
  <div class="profile-info__main" style="margin-bottom: 15px;">
    <profile-last-widget :last="last" :sex="sex"></profile-last-widget>
    <profile-old-widget :time="time"></profile-old-widget>
    <span class="profile-info__link">
      <a class="gray_link" :href="`/${userId}`" target="_blank">#{{userId}}</a>
    </span>
  </div>
</template>

<style lang="less">
</style>
