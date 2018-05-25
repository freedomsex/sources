<script>
// import $ from 'jquery';
import axios from 'axios';
import hasher from '~legacy/utils/simple-hash';
import ClosedActivity from '~closed-activity/ClosedActivity';
import ModalDialog from '~dialogs/ModalDialog';
import AdaptPhotoData from '~assets/AdaptPhotoData';

import FileUploadButton from './FileUploadButton';

export default {
  extends: ClosedActivity,
  props: ['humanId'],
  data() {
    return {
      photos: [],
      photoAlert: false,
    };
  },
  mounted() {
    this.loadPhoto();
  },
  methods: {
    close() {
      this.back();
    },
    loadPhoto() {
      const server = this.$store.state.photoServer;
      const {uid} = this.$store.state.user;
      const config = {
        headers: {Authorization: `Bearer ${this.$store.state.apiToken}`},
        params: {hash: hasher.random()},
      };
      axios
        .get(`http://${server}/api/v1/users/${uid}/photos`, config)
        .then((response) => {
          const result = response.data.photos;
          if (result && result.length) {
            this.photos = response.data.photos;
          }
          console.log(this.photos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    upload() {
      // $('#fileupload').click();
    },
    show(index) {
      console.log('show', this.photos[index]);
      this.preview(this.photos[index]);
    },
    preview(data) {
      // this.$router.push({ name: 'preview',
      // params: {humanId: this.humanId, photo: data, options: true} });
      const photo = AdaptPhotoData(data);
      console.log('preview', photo);
      this.$emit('select', photo);
      this.close();
      // this.$store.commit('sendPhoto', data);
      // console.log('sendPhoto');
    },
    failed() {
      this.photoAlert = true;
      // this.close();
    },
  },
  components: {
    ClosedActivity,
    ModalDialog,
    FileUploadButton,
  },
};
</script>

<template>
  <ClosedActivity @close="close">
    <span slot="caption">Отправить фото</span>
    <div class="activity-section">
      <div class="galery-photo" v-show="photos.length" style="display: none;">
        <img class="galery-photo__item"
         :src="item._links.galery.href"
         v-for="(item, index) in photos"
         @click="show(index)">
      </div>
    </div>

    <div class="activity-section">
      <div class="upload_photo__add">
        <FileUploadButton @loaded="preview"/>

        <input id="fileupload" type="file" name="file" data-form-data='{"script": "true"}'>
      </div>
    </div>

    <ModalDialog @close="photoAlert = false" v-if="photoAlert">
      <div class="modal-dialog__wrapper">
        <div class="modal-dialog__body">
          Загрузите новое фото. Для предупреждения использования чужих фото,
          загрузить повторно может не получиться, даже если фото ваше.
        </div>
        <div class="modal-dialog__footer">
          <button class="btn btn-primary btn-flat" @click="photoAlert = false">
            Хорошо
          </button>
        </div>
      </div>
    </ModalDialog>

  </ClosedActivity>
</template>

<style lang="less">
</style>
