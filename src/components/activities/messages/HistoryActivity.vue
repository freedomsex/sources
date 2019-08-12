<script>
import ActivityActions from '~activities/ActivityActions';
import MessageList from './MessageList';

export default {
  props: ['humanId'],
  components: {
    ActivityActions,
    MessageList,
  },
};
</script>

<template>
  <ActivityActions caption="Диалог" @close="$emit('close')">
    <MessageList :humanId="humanId" :readonly="true"/>
  </ActivityActions>
</template>
