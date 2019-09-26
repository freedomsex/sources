<script>
import _ from 'underscore';
import colors from 'material-colors';
import CONFIG from '~config/';

export default {
  props: ['uid', 'item', 'src', 'size'],
  data: () => ({
    image: false,
    colors: [
      'red', 'pink', 'purple', 'deepPurple', 'indigo', 'blue', 'lightBlue', 'cyan', 'teal', 'green', 'lightGreen', 'lime', 'yellow', 'amber', 'orange', 'deepOrange', 'brown', 'blueGrey',
    ],
  }),
  mounted() {
    // do something after mounting vue instance
    // const {uid, item, src} = this;
    // console.log('ColorItem', [uid, item, src]);
  },
  computed: {
    letter() {
      if (this.item) {
        return this.item.name ? this.item.name.charAt(0) : null;
      }
      return null;
    },
    iterations() {
      if (this.letter && this.item) {
        const cityLength = this.item.city ? this.item.city.length : 0;
        const nameLength = this.item.name ? this.item.name.length : 0;
        const age = this.item.age ? this.item.age : 0;
        return cityLength + nameLength + age;
      }
      return 0;
    },
    colorIndex() {
      let position = 0;
      const colorCount = this.colors.length;
      let i = this.iterations;
      while (i > 0) {
        position += 1;
        i -= 1;
        if (position > colorCount - 1) {
          position = 0;
        }
      }
      return this.colors[position];
    },
    color() {
      const data = _.pick(colors, this.colors);
      return `${data[this.colorIndex][400]}`;
    },
    source() {
      let src = null;
      if (this.item && this.item.userpic) {
        src = this.item.userpic.source;
      } else {
        src = this.src || null;
      }
      return src ? `${CONFIG.API_PHOTO}${src}` : '';
    },
    background() {
      return {
        backgroundColor: this.letter ? this.color : '#e5e5e5',
        backgroundImage: `url(${this.source})`,
      };
    },
  },
};
</script>

<template>
  <div class="contact-image-icon" :class="size" :style="background">
    <div class="contact-image-icon__letter" v-if="!source">
      {{letter}}
    </div>
  </div>
</template>

<style lang="less">
.contact-image-icon {
  @size: 40px;
  width: @size;
  height: @size;

  background-size: cover;
  background-position: center;

  background-color: @gray-light;
  border-radius: @size;
  overflow: hidden;
    font-size: 26px;

  &__letter {
    color: @white;
    line-height: 1.5;
  }

  display: flex;
  justify-content: center;
  align-items: stretch;


  text-transform: uppercase;

  &.small-icon {
    @size: 28px;
    width: @size;
    height: @size;

    font-size: 19px;
  }
}
</style>
