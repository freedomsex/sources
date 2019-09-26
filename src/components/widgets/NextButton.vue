<script>
import ButtonLoader from '~widgets/ButtonLoader';

export default {
  props: ['show', 'hold', 'loader', 'size', 'verbose', 'ready'],
  components: {
    ButtonLoader,
  },
  computed: {
    visible() {
      if (typeof this.show === 'undefined') {
        return true;
      }
      return this.show;
    },
    isReady() {
      if (typeof this.ready === 'undefined') {
        return true;
      }
      return this.ready;
    },
  },
};
</script>

<template>
  <span class="next-button" v-if="visible">
    <div class="btn btn-default btn-sm" v-if="isReady"
      @click="$emit('next')" :disabled="hold">
      {{$t('Следующие')}}
    </div>
    <span v-else-if="loader">
      <div class="btn btn-default btn-sm" v-if="verbose" disabled>
        {{$t('Загружаю')}}...
      </div>
      <ButtonLoader :size="size" v-else/>
    </span>
  </span>
</template>

<style lang="less">
.next-button{
  .btn {
    text-transform: uppercase;
  }
}
</style>

<i18n>
{
  "en": {
    "Следующие": "Next",
    "Загружаю": "Loading"
  },
  "kz": {
    "Следующие": "Келесі",
    "Загружаю": "Жүктеу"
  },
  "ua": {
    "Следующие": "Наступні",
    "Загружаю": "Завантажую"
  }
}
</i18n>
