<script>
import _ from 'underscore';
import axios from 'axios';
import CONFIG from '~config/';

import ColorContactIcon from '~components/contacts/ColorContactIcon';

export default {
  props: ['progress'],
  data() {
    return {
      busy: false,
    };
  },
  components: {
    ColorContactIcon,
  },
  computed: {
    input() {
      return this.$refs.file;
    },
    item() {
      return this.$store.state.user;
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
      axios.post(`${CONFIG.API_PHOTO}/api/v1/userpic/${this.item.uid}`, formData, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token.access}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then(({data}) => {
        this.onload(data);
      }).catch(() => {
        this.$emit('failed');
        this.busy = false;
      });
    },
    onload({source}) {
      this.storeSource(source);
      this.$emit('loaded', source);
      this.busy = false;
    },
    storeSource(source) {
      axios.post(`${CONFIG.API_CONTACT}/api/v1/userpic/${this.item.uid}`, {source}, {
        headers: {Authorization: `Bearer ${this.$store.state.token.access}`},
      }).then(() => {
        this.$store.commit('settings', {userpic: {source}});
      }).catch(() => {
        this.$store.commit('settings', {userpic: ''});
        console.log('FAILED store Source');
      });
    },
    submit() {
      const formData = new FormData();
      formData.append('file', this.file());
      this.upload(formData);
    },
  },
};
</script>

<template>
  <div class="header-bar__button" @click="add()">
    <span class="header-bar__title">
      {{busy ? 'Загружаю...' : 'Загрузить фото'}}
    </span>
    <ColorContactIcon :uid="item.uid" :item="item" size="small-icon"/>
    <input class="input-file-hidden" type="file" ref="file" @change="submit()"/>
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
