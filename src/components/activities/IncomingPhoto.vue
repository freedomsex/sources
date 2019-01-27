<script>
import axios from 'axios';
import hasher from '~legacy/utils/simple-hash';
import PhotoSend from '~modules/PhotoSend';
import PhotoGalery from '~widgets/PhotoGalery';
import ActivityActions from '~activities/ActivityActions';

export default {
  props: ['humanId'],
  data() {
    return {
      photos: [],
      user: 0,
      server: null,
      preview: null,
    };
  },
  created() {
    this.server = this.$store.state.photoServer;
  },
  mounted() {
    this.loadPhoto();
  },
  computed: {
    uid() {
      return this.$store.state.user.uid;
    },
  },
  methods: {
    loadPhoto() {
      const config = {
        headers: {Authorization: `Bearer ${this.$store.state.apiToken}`},
        params: {tid: this.humanId, hash: hasher.random()},
      };
      axios
        .get(`//${this.server}/api/v1/users/${this.uid}/sends`, config)
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
    PhotoSend,
    PhotoGalery,
  },
};
</script>

<template>
  <ActivityActions type="wrapped" @close="close">
    <span slot="caption">Галерея</span>
    <div class="activity-section">
      <PhotoGalery
       :list="photos"
       :private="true"
       @show="show">
        Присланные фотографии будут здесь
      </PhotoGalery>
    </div>
    <PhotoSend v-if="preview" :photo="preview" @close="preview = null"/>
  </ActivityActions>
</template>

<style lang="less">

</style>
