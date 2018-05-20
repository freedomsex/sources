<script>
import axios from 'axios';
import hasher from '~legacy/utils/simple-hash';
import ClosedActivity from '~closed-activity/ClosedActivity';
import PhotoSend from '~modules/PhotoSend';

export default {
  extends: ClosedActivity,
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
        .get(`http://${this.server}/api/v1/users/${this.uid}/sends`, config)
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
      this.back();
      // this.$emit('close');
    },
  },
  components: {
    ClosedActivity,
    PhotoSend,
  },
};
</script>

<template>
  <ClosedActivity @close="close">
    <span slot="caption">Галерея</span>
    <div class="activity-section">
      <div class="incoming-photo__list" v-if="photos.length">
        <img class="incoming-photo__item-photo"
         :src="item._links.thumb.href"
         v-for="(item, index) in photos"
         @click="show(index)">
      </div>
      <div class="incoming-photo__placeholder" v-else>
        Присланные  фотографии будут здесь
      </div>
    </div>
    <PhotoSend v-if="preview" :photo="preview" @close="preview = null"/>
  </ClosedActivity>
</template>

<style lang="less">
#incoming-photo {
  margin-bottom: @indent-sm;
}

.incoming-photo__placeholder {
  color: @gray-dark;
  background: @light;
  padding: @indent-md @indent-md;
}

.incoming-photo__list {
  margin: 0 -5px;
}

.incoming-photo__item-photo {
  width: 100px;
  height: 100px;
  @media (max-width: 400px) {
    @indent: (20 * 2 + 2 - 5 * 2) / 3;
    width: ~"calc(33.33vmin - @{indent}px)";
    height: ~"calc(33.33vmin - @{indent}px)";
  }
  @media (max-width: 540px) and (min-width: 400px) {
    @indent: (20 * 2 + 2 - 5 * 2) / 4;
    width: ~"calc(25vmin - @{indent}px)";
    height: ~"calc(25vmin - @{indent}px)";
  }
  border: 5px solid @white;
  position: relative;
}

#fileupload {
  position: absolute;
  left: -99999px;
}

.galery-photo {
  margin: 0 -5px;
  //background: @gray;
  &__item {
    width: 100px;
    height: 100px;
    @media (max-width: 400px) {
      @indent: (20 * 2 + 2 - 5 * 2) / 3;
      width: ~"calc(33.33vmin - @{indent}px)";
      height: ~"calc(33.33vmin - @{indent}px)";
    }
    @media (max-width: 540px) and (min-width: 400px) {
      @indent: (20 * 2 + 2 - 5 * 2) / 4;
      width: ~"calc(25vmin - @{indent}px)";
      height: ~"calc(25vmin - @{indent}px)";
    }
    border: 5px solid @white;
    position: relative;
  }
}

.upload_photo__add {
  margin-bottom: @indent-lg;
}

.upload_photo__rules {
  color: #5c5c5c;
  font-size: 12px;
  max-width: 500px;
  margin-top: @indent-lg;
  p {
    padding: 0;
    margin: 4px 0;
  }
}
</style>
