<script>
import ConfirmDialog from '~dialogs/ConfirmDialog';

export default {
  props: ['show'],
  components: {
    ConfirmDialog,
  },
  data: () => ({
    skip: false,
  }),
};
</script>

<i18n>
{
  "ru": {
    "refresh": "Обновить",
    "caption": "Что случилось?",
    "message": "Скорее всего мы обновили сайт пока вас не было. Или делаем это прямо сейчас. А мог сломаться сервер или что-то ещё. Пожалуйста, обновите страницу."
  },
  "en": {
    "refresh": "Reload"
  },
  "kz": {
    "refresh": "Жаңарту"
  },
  "ua": {
    "refresh": "Оновити"
  }
}
</i18n>

<template>
  <ConfirmDialog v-if="show" :yesText="$t('refresh')" style="z-index: 1000;"
    @confirm="$root.redirectHome()"
    @close="$emit('close')">
    <div slot="title">{{$t('caption')}}</div>
       {{$t('message')}}
  </ConfirmDialog>
</template>

<style lang="less">

</style>
