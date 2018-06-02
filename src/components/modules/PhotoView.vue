<script>
import InfoDialog from '~dialogs/InfoDialog';

export default {
  props: ['photo', 'thumb', 'maxWidth', 'bypass'],
  mounted() {
    console.log('background', this.background);
  },
  methods: {
    approve() {
      this.$store.commit('accepts/photo');
    },
    close() {
      this.$emit('close');
    },
  },
  computed: {
    accept() {
      return !!(this.$store.state.accepts.photo || this.bypass);
    },
    background() {
      return this.thumb ? {backgroundImage: `url('${this.thumb}')`} : null;
    },
  },
  components: {
    InfoDialog,
  },
};
</script>

<template>
  <div class="photo-view" :style="background">
    <InfoDialog yesText="Подтверждаю" type="success" v-if="!accept"
     @close="close" @confirm="approve">
      <slot name="title">Контроль содержания отсутствует</slot>
      У администраторов нет доступа к загружаемым фото.
      Внимание! Изображения могут иметь возрастные ограничения.
      Пожалуйста, подтвердите что вы имеете право продолжить просмотр.
      <span slot="yesIcon" class="glyphicon glyphicon-ok"></span>
    </InfoDialog>

    <div v-else>
      <img :src="photo" :style="{ maxWidth: maxWidth +'px' }">
    </div>
  </div>
</template>

<style lang="less">
.photo-view {
  text-align: center;
  //margin-top: @indent-md;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: @light;
  background-size: cover;
  background-position: center;
  //border: 2px solid @light;
  //    min-width: 100%;
  //    min-height: 100%;
  img {
    width: 100%;
  }
}

.photo-view__accept {
  border: 1px solid @light;
  padding: @indent-lg @indent-lg;
  max-width: 400px;
  background-color: @white;
  text-align: left;
  margin: @indent-xl auto;
}

.photo-view__accept-caption {
  font-size: 16px;
  font-weight: bold;
}

.photo-view__accept-text {
  padding: @indent-md 0 @indent-md;
  font-size: 14px;
}
</style>
