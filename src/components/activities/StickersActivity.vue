<script>
import axios from 'axios';
import CONFIG from '~config/';
import hasher from '~legacy/utils/simple-hash';
import PhotoGalery from '~widgets/PhotoGalery';
import ActivityActions from '~activities/ActivityActions';

export default {
  props: ['humanId'],
  data() {
    return {
      photos: [],
      user: 0,
      preview: null,
    };
  },
  mounted() {
    this.loadPhoto();
  },
  computed: {
    uid() {
      return this.$store.state.token.uid;
    },
  },
  methods: {
    loadPhoto() {
      const config = {
        headers: {Authorization: `Bearer ${this.$store.state.token.access}`},
        params: {tid: this.humanId, hash: hasher.random()},
      };
      axios
        .get(`${CONFIG.API_PHOTO}/api/v1/users/${this.uid}/sends`, config)
        .then((response) => {
          this.photos = response.data.photos;
          // console.log(this.photos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    show(index) {
      const photo = this.photos[index];
      const {_links: links} = photo;
      if (links.origin.href) {
        const data = {
          thumb: links.thumb.href,
          photo: links.origin.href,
          alias: photo.alias,
          height: photo.height,
          width: photo.width,
        };
        this.preview = data;
      }
    },
    close() {
      this.$emit('close');
      // this.$emit('close');
    },
  },
  components: {
    ActivityActions,
    PhotoGalery,
  },
};
</script>

<template>
  <ActivityActions caption="Стикеры" type="wrapped" @close="close">
    <div class="activity-section">
      <PhotoGalery
       :list="photos"
       :private="true"
       @show="show">
        Совсем скоро будут здесь
      </PhotoGalery>
    </div>
  </ActivityActions>
</template>

<style lang="less">

</style>
