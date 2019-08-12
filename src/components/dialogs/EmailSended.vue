<script>
import InfoDialog from '~dialogs/InfoDialog';

export default {
  components: {
    InfoDialog,
  },
};
</script>

<template>
  <InfoDialog @close="$emit('close')" v-else>
    <span slot="title">Письмо отправлено</span>
    Доставка письма занимает от секунды до нескольких минут.
    Если письма долго нет - проверьте папку спам, особенно
    если ваша почта на «Gmail».
    <div class="body-spacer"></div>
    <a href="http://docs.freedomsex.info/blog/#/Как-пользоваться/Настройки?id=Восстановление-пароля" target="_blank">
      Что делать если писимо не пришло...
    </a>
  </InfoDialog>
</template>

<style lang="less">
</style>
