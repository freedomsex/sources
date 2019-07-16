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
    <div class="message-dialog">
      <div id="dialog-history" class="message-dialog__history">
        <MessageList :humanId="humanId" :readonly="true"/>
      </div>
    </div>
  </ActivityActions>
</template>

<style lang="less">
.message-dialog {
  display: flex;
  flex: 1 1 auto;
  border: 0px solid gray;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  height: 100%;
  &__history {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    flex: 1 1 auto;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: auto;
  }
}

</style>
