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
  mounted() {
    console.log('user', this.item);
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
      const {uid} = this.$store.state.token;
      axios
        .post(`${CONFIG.API_PHOTO}/api/v1/userpic/${uid}`, formData, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token.access}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(({data}) => {
          this.onload(data);
        })
        .catch(() => {
          this.$emit('failed');
          this.busy = false;
        });
    },
    onload({source}) {
      this.storeSource(source);
      this.$emit('loaded', source);
      this.busy = false;
    },
    async storeSource(source) {
      const {uid: userId} = this.$store.state.token;
      const id = this.item && this.item.userpic.id;
      // console.log('user', this.item);
      const res = this.$api.res('contact_userpics', 'initials');
      let data = null;
      try {
        if (id) {
          ({data} = await res.put({source}, {id}));
        } else {
          ({data} = await res.post({userId, source}));
        }
      } catch (e) {
        this.$store.commit('settings', {userpic: ''});
        console.log('FAILED store Source');
      }
      this.$store.commit('settings', {userpic: data});
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
      {{ busy ? 'Загружаю...' : 'Загрузить фото' }}
    </span>
    <ColorContactIcon :uid="item.uid" :item="item" size="small-icon" />
    <input class="input-file-hidden" type="file" ref="file" @change="submit()" />
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
