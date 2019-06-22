<script>
import axios from 'axios';
import CONFIG from '~config/';
import hasher from '~legacy/utils/simple-hash';

export default {
  props: [],
  data() {
    return {
      id: null,
      token: null,
      image: null,
      time: null,
      expires: null,
      process: false,
      updated: null,
      timer: null,
      code: '',
      inc: 0,
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    now() {
      return String(new Date().getTime()).slice(0, -3);
    },
    freze() {
      return (this.now() - this.updated) < 3;
    },
    expired() {
      return this.now() > this.expires;
    },
    close() {
      this.$emit('close');
    },

    wait(time) {
      this.time = time;
      this.timer = setTimeout(this.getToken, time * 1000);
      this.updated = this.now();
    },

    start() {
      this.process = true;
      axios.get(`//${CONFIG.API_VIRIFY}/time?hash=${hasher.random()}`).then(({data}) => {
        this.id = data.id;
        console.log('time', data.time);
        this.wait(data.time);
      });
    },
    getToken() {
      axios.post(`//${CONFIG.API_VIRIFY}/token`, {id: this.id}).then(({data}) => {
        if (data.token) {
          this.token = data.token;
          this.expires = data.token.split('.', 3)[1];
          this.$emit('token', this.token);
          this.draw();
        } else {
          this.wait(data.retry);
        }
      });
    },


    draw() {
      axios.get(`//${CONFIG.API_VIRIFY}/image/${this.token}`).then(({data}) => {
        this.process = false;
        this.image = `data:image/jpeg;base64,${data.image}`;
        this.updated = this.now();
        this.inc += 1;
      });
    },
    update() {
      this.image = null;
      this.start();
    },
    refresh() {
      if (!this.process && this.expired()) {
        this.update();
      }
    },
    renew() {
      if (!this.process && !this.freze()) {
        this.update();
      }
    },
    input() {
      this.$emit('input', this.code);
    },
  },
};
</script>

<template>
  <div class="simple-captcha">
    <div class="activity-section__tile">
      <div class="image-field" @click="renew()">
        <div class="image-field__addon">
          <span aria-hidden="true" class="glyphicon glyphicon-arrow-down"></span>
        </div>
        <div class="image-field__image">
          <img :src="image" v-if="image"
            width="100" height="50">
          <span class="image-field__loader" v-else>•••</span>
        </div>
      </div>
    </div>
    <div class="activity-section__tile">
      <div class="form-group">
        <input class="form-control" type="tel"
         placeholder="Введите код"
         inputmode="numeric" autocomplete="off"
         v-model="code"
         @change="input">
      </div>
    </div>
  </div>
</template>

<style lang="less">
.simple-captcha {
  .image-field {
    border: 1px solid @gray;
    border-radius: 4px;
    display: flex;
    align-items: stretch;
    min-height: 55px;
    &__addon {
      display: flex;
      align-items: center;
      padding: @indent-sm;
      background: @gray-light;
      span {
        color: @dark-light;
        font-size: 18px;
      }
    }
    &__image {
      flex: 1 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-around;
      img {
        margin: 0;
      }
    }
    &__loader {
      color: @gray;
      font-size: 38px;
      line-height: 1;
    }
  }

}
</style>
