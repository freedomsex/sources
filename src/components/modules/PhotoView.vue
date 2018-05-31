<script>
import ModalDialog from '~dialogs/ModalDialog';

export default {
  extends: ModalDialog,
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
    ModalDialog,
  },
};
</script>

<template>
  <div class="photo-view" :style="background">
    <ModalDialog @close="close" v-if="!accept">
      <div class="modal-dialog__wrapper">
        <div class="modal-dialog__caption">
          Контроль содержания отсутствует
        </div>
        <div class="modal-dialog__body">
          У администраторов нет доступа к загружаемым фото.
          Внимание! Изображения могут иметь возрастные ограничения.
          Пожалуйста, подтвердите что вы имеете право продолжить просмотр.
        </div>
        <div class="modal-dialog__footer">
          <button class="btn btn-success" @click="approve">
            <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
            Подтверждаю
          </button>
        </div>
      </div>
    </ModalDialog>
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
