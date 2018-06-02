<script>
import axios from 'axios';
import InfoDialog from '~dialogs/InfoDialog';
import PhotoView from './PhotoView';

export default {
  props: ['photo', 'options'],
  data() {
    return {
      remove: false,
    };
  },
  created() {
    this.server = this.$store.state.photoServer;
  },
  computed: {
    uid() {
      return this.$store.state.user.uid;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    removePhoto() {
      const config = {
        headers: {Authorization: `Bearer ${this.$store.state.apiToken}`},
        // params: { uid: this.uid, hash }
      };
      const url = `http://${this.server}/api/v1/users/${this.uid}/photos/${this.photo.alias}.jpg`;
      axios
        .delete(url, config)
        .then(() => {
          this.$emit('removed');
          this.close();
          // console.log(this.photos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {
    InfoDialog,
    PhotoView,
  },
};
</script>

<template>
  <div class="photo-send__mask" transition="modal" @click="close">
    <div class="photo-send__container" @click.stop>

      <div class="close-self-button">
        <i class="material-icons" @click="close"></i>
      </div>
      <PhotoView :photo="photo.photo" :thumb="photo.thumb" :maxWidth="600" @close="close"/>
      <div class="photo-send__options" v-show="options">
        <button class="btn btn-default" @click="remove = true">
          <span aria-hidden="true" class="glyphicon glyphicon-trash"></span>
          Удалить
        </button>
        <button class="btn btn-primary" @click="$emit('send')">
          <span aria-hidden="true" class="glyphicon glyphicon-send"></span>
          Отправить
        </button>
      </div>
      <!-- <toast v-if="remove" @close="remove = false">Временно недоступно</toast> -->

      <InfoDialog v-if="remove" yesText="Удалить"
       @confirm="removePhoto()" @close="remove = false">
        <slot name="title">Удалить фото?</slot>
        Восстановить фото будет невозможно.
        Вы действительно хотите удалить фотографию?
        <span slot="yesIcon" class="glyphicon glyphicon-remove"></span>
      </InfoDialog>

      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
.close-self-button {
  position: absolute;
  right: 0;
  color: #ffffff;
  padding: 10px;
  cursor: pointer;
  i {
    line-height: 1;
    font-size: 30px;
    text-shadow: 0 0 7px rgba(0, 0, 0, 0.3);
  }
}

.photo-send {
  &__mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 50, 0.2);
    transition: opacity 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__container {
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 600px;
    background: @white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    overflow: auto;
    position: relative;
    margin-top: 10px;
    z-index: 1000;
    @media (max-width: 600px), (max-height: 600px) {
      width: 100%;
      height: 100%;
      margin-top: 0px;
    }
  }
  &__options {
    position: absolute;
    bottom: 0px;
    right: 0px;
    background: white;
    padding: 10px 15px;
    border-top-left-radius: 4px;
  }

  &__wrapper {
    padding: @indent-lg;
  }
  &__caption {
    font-size: @font-lg;
    font-weight: bold;
  }
  &__body {
    font-size: 14px;
    padding: @indent-md 0 @indent-md;
  }
  &__section {
    padding: 0 0 @indent-sm;
  }
  &__footer {
    text-align: right;
  }
  &__centred {
    text-align: center;
  }
}
</style>
