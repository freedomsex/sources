<script>
import axios from 'axios';

export default {
  computed: {
    input() {
      return this.$refs.file;
    },
    file() {
      return this.input.files[0];
    },
    url() {
      const server = this.$store.state.photoServer;
      const {uid} = this.$store.state.user;
      const token = this.$store.state.apiToken;
      return `http://${server}/api/v1/users/${uid}/photos?jwt=${token}`;
    },
  },
  methods: {
    add() {
      this.input.click();
    },
    upload(formData) {
      axios.post(this.url, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      }).then(({data}) => {
        this.preview(data.photo);
      }).catch(() => {
        this.$emit('failed');
      });
    },
    submit() {
      const formData = new FormData();
      formData.append('file', this.file);
      this.upload(formData);
    },

    preview(data) {
      // const photo = AdaptPhotoData(data);
      // console.log('AdaptPhotoData', photo);
      this.$emit('loaded', data);
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
