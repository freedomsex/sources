<script>
import _ from 'underscore';

export default {
  props: ['callback', 'action'],
  computed: {
    muted() {
      return this.$store.state.mute;
    },
    time() {
      return this.callback ? 5000 : 3000;
    },
    title() {
      return this.action ? this.action : 'Ok';
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    approve() {
      this.callback();
    },
    autoplay() {
      if (!this.muted) {
        this.$refs.autoplay.play();
      }
    },
  },
  mounted() {
    _.delay(this.close, this.time);
    this.autoplay();
  },
};
</script>

<template>
  <transition name="snackbar">
    <div class="snackbar" @click="close">
      <div class="snackbar__body">
        <div class="snackbar__message">
          <slot></slot>
        </div>
        <div class="snackbar__button" v-if="callback">
          <button class="btn btn-primary btn-sm" @click="approve">{{title}}</button>
        </div>
      </div>
        <audio v-if="!muted" ref="autoplay" preload>
          <source src="/static/sound/incoming.mp3" type="audio/mpeg">
          <source src="/static/sound/incoming.ogg" type="audio/ogg; codecs=vorbis">
        </audio>
    </div>
  </transition>
</template>

<style lang="less">
.snackbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.95;
  z-index: 10000;
  &__body {
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    background: @dark-light;
    min-width: 200px;
    max-width: 550px;
    width: 100%;
    padding: 3px 0;
    border-top: 3px solid @white;
  }
  &__message {
    color: @white;
    text-align: left;
    padding: @indent-sm @indent-sm;
    flex: 2 1 auto;
  }
  &__button {
    flex: 1 0 auto;
    text-align: right;
    margin-right: @indent-sm;
  }
}

.snackbar-enter-active,
.snackbar-leave-active {
  transition: all 0.5s;
}
.snackbar-enter, .snackbar-leave-to /* .fade-leave-active для <2.1.8 */ {
  transform: translateY(50px);
}
</style>
