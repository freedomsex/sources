<script>
import _ from 'underscore';
import axios from 'axios';
import CONFIG from '~config/';

export default {
  props: ['progress'],
  data() {
    return {
      busy: false,
    };
  },
  computed: {
    input() {
      return this.$refs.file;
    },
    url() {
      const {uid} = this.$store.state.token;
      // const token = this.$store.state.token.access;
      return `${CONFIG.API_PHOTO}/api/v1/users/${uid}/photos`;
    },
  },
  methods: {
    add() {
      this.input.click();
    },
    file() {
      // computed кэширует ввод,
      // files[] READ_ONLY, берется последнее
      return _.last(this.input.files);
    },
    upload(formData) {
      this.busy = true;
      axios.post(this.url, formData, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token.access}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then(({data}) => {
        this.preview(data.photo);
      }).catch(() => {
        this.$emit('failed');
        this.busy = false;
      });
    },
    submit() {
      const formData = new FormData();
      formData.append('file', this.file());
      this.upload(formData);
    },

    preview(data) {
      // const photo = AdaptPhotoData(data);
      // console.log('AdaptPhotoData', photo);
      this.$emit('loaded', data);
      this.busy = false;
    },
  },
};
</script>

<template>
<div>
  <input class="input-file-hidden" type="file" ref="file" @change="submit()"/>
  <button class="btn btn-primary" @click="add()">
    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
    Добавить
  </button>
  <div class="btn btn-link" v-if="progress">
    {{busy ? 'Загружаю...' : 'Выберите фото'}}
  </div>
</div>
</template>

<style lang="less">
input[type='file'].input-file-hidden {
  position: absolute;
  top: -5000px;
}
div.file-listing {
  width: 200px;
}
span.remove-file {
  color: red;
  cursor: pointer;
  float: right;
}
</style>
