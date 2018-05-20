<script>
import hasher from '~legacy/utils/simple-hash';

export default {
  props: [],
  data() {
    return {
      code: '',
      inc: 0,
    };
  },
  computed: {
    src() {
      return `/capcha_pic.php?inc=${this.inc}&hash=${hasher.random()}`;
    },
  },
  mounted() {},
  methods: {
    close() {
      this.$emit('close');
    },
    update() {
      this.inc += 1;
    },
    input() {
      this.$emit('input', this.code);
    },
  },
};
</script>

<template>
  <div class="form-inline">
    <div class="input-group" style="max-width: 300px;">
      <span class="captcha-dialog__addon input-group-addon captcha-img__addon" @click="update">
        <span aria-hidden="true" class="glyphicon glyphicon-arrow-right"></span>
      </span>
      <span class="captcha-dialog__addon input-group-addon captcha-img__addon">
        <img class="form-message__captcha-img" :src="src" width="48" height="20" @click="update">
      </span>
      <input class="form-control" type="tel"
       inputmode="numeric" autocomplete="off"
       v-model="code"
       @change="input">
    </div>
  </div>
</template>

<style lang="less">
</style>
