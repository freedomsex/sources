<script>
import axios from 'axios';
import ActivityActions from '../../ActivityActions';

export default {
  extends: ActivityActions,
  props: ['link'],
  data() {
    return {
      text: 'Загружаю...',
    };
  },
  mounted() {
    axios.get(`/static/htm/promo/${this.link}.htm`).then(({data}) => {
      this.text = data;
    });
  },
};
</script>

<template>
  <div class="content-modal__mask" transition="modal" @click="close">
    <div class="content-modal__container" @click.stop>
      <div class="content-modal__wrapper" v-html="text"></div>
    </div>
  </div>
</template>

<style lang="less">
.content-modal {
   &__mask {
       position: fixed;
       z-index: 1;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       background-color: rgba(0, 0, 0, .2);
       transition: opacity .3s ease;
       display: flex;
       align-items: center;
       justify-content: center;
   }

   &__wrapper {
       padding: @indent-md;
       text-align: left;
       &.capped {
           padding-top: @indent-sm;
       }
   }
   &__container {
       min-width: 200px;
       max-width: 800px;
       background: @white;
       box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
       transition: all .3s ease;
       overflow: auto;
       border-radius: 4px;
       position: relative;
       margin: 10px;
       z-index: 1;
   }

   &__body {
       font-size: 14px;
       margin: @indent-xs 0 @indent-md;
   }
}
</style>
