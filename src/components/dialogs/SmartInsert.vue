<script>
import ModalDialog from '~dialogs/ModalDialog';

export default {
  props: [],
  mounted() {
    console.log('autoPaste', this.$store.state.autoPaste);
  },
  methods: {
    select(variant) {
      this.$emit(variant);
      this.$emit('close');
    },
    toggle() {
      this.$store.commit('pasting', true);
      console.log('autoPaste', this.$store.state.autoPaste);
    },
  },
  components: {
    ModalDialog,
  },
};
</script>

<i18n>
{
  "en": {
    "ХОРОШО": "OKAY"
  }
}
</i18n>

<template>
  <ModalDialog @close="$emit('close')">

      <div class="dialog-caption">
        <div class="dialog-caption__title">Быстрая вставка</div>
        <div class="dialog-caption__option">
          <span v-if="$store.state.autoPaste" @click="$store.commit('pasting', false)">
            Включено <i class="material-icons" @click="">&#xE86C;</i>
          </span>
          <span v-else @click="toggle()">
            Отключено <i class="material-icons" @click="">&#xE611;</i>
          </span>
        </div>
      </div>

      <div class="list-view">
        <div class="list-item" @click="select('notepad')">
          <div class="list-item__icon">
            <i class="material-icons">&#xE85D;</i>
          </div>
          <div class="list-item__body">
            Запись из Блокнота
          </div>
        </div>
        <div class="list-item" @click="select('cliche')">
          <div class="list-item__icon">
            <i class="material-icons">&#xE431;</i>
          </div>
          <div class="list-item__body">Готовое сообщение</div>
        </div>
        <div class="list-item" @click="select('sticker')">
          <div class="list-item__icon">
            <i class="material-icons">&#xE251;</i>
          </div>
          <div class="list-item__body">Отправить стикер</div>
        </div>
      </div>


  </ModalDialog>
</template>

<style lang="less">
.list-item {

}
</style>
