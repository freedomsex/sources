<script>
import axios from 'axios';
import CONFIG from '~config/';
import hasher from '~legacy/utils/simple-hash';
import InfoDialog from '~dialogs/InfoDialog';
import AdaptPhotoData from '~assets/AdaptPhotoData';
import PhotoGalery from '~widgets/PhotoGalery';

import ActivityActions from '~activities/ActivityActions';
import FileUploadButton from './FileUploadButton';

export default {
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
      this.$emit('close');
    },
    loadPhoto() {
      const {uid} = this.$store.state.token;
      const config = {
        headers: {Authorization: `Bearer ${this.$store.state.token.access}`},
        params: {hash: hasher.random()},
      };
      axios
        .get(`${CONFIG.API_PHOTO}/api/v1/users/${uid}/photos`, config)
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
    ActivityActions,
    InfoDialog,
    FileUploadButton,
    PhotoGalery,
  },
};
</script>

<template>
  <ActivityActions caption="Отправить фото" type="wrapped" @close="close">
    <div class="activity-section">
      <PhotoGalery :list="photos" @show="show">
        Фотографии которые вы загрузите будут здесь
      </PhotoGalery>
    </div>

    <div class="activity-section">
      <FileUploadButton
       :progress="true"
       @loaded="preview"
       @failed="failed"/>
      <input id="fileupload" type="file" name="file" data-form-data='{"script": "true"}'>
    </div>

    <div class="alert alert-warning" v-if="$store.state.user.sex === 1">
      <b>Сохраняйте анонимность</b>. Не отправляйте интимные фото, если вы мало знакомы.
      Отправляйте только их или только лицо. Не отправляйте фото лица или селфи полность обнаженного тела.
      Мошенники смогут найти вас, ваших друзей, родственников и коллег по работе в соцсетях, по номеру телефона или
      по фотографии вашего лица. Вас будут шантажировать вашими же фотографиями или записью видео вашей мастурбации.
    </div>


    <div class="activity-section" v-if="photos.length < 5">
      <div class="activity-section__tile">
        1. Вы можете отправлять любые фотографии. Премодерация  отсутствует. Интимные фото отправлять можно, если ваш собеседник ждёт этого от вас.
      </div>
      <div class="activity-section__tile">
        2. Избегайте использования чужих фото. Это грозит блокировкой анкеты.
      </div>
      <div class="activity-section__tile">
        3. Фотографии, которые долго не использовались, удалятся автоматически.
      </div>
      <div class="activity-section__tile">
        <a class="activity-section__link" href="http://docs.freedomsex.info/blog/#/Как-пользоваться/Где-фотографии" target="_blank">Узнать больше о фотографиях...</a>
      </div>
    </div>


    <InfoDialog @close="photoAlert = false" v-if="photoAlert">
      Загрузите новое фото. Для предупреждения использования чужих фото,
      загрузить повторно может не получиться, даже если фото ваше.
    </InfoDialog>

  </ActivityActions>
</template>

<style lang="less">

#fileupload {
  position: absolute;
  left: -99999px;
}

.upload_photo__rules {
  color: @dark-light;
  p {
    padding: 0;
    margin: 4px 0;
  }
}
</style>
