<script>
export default {
  data: () => ({
    name: 'scroll-body-prevent',
    initialized: false,
    top: null,
  }),
  // beforeMount() {
  //   this.initialized = this.exists();
  //   this.top = this.getTop();
  // },
  // mounted() {
  //   if (!this.initialized) {
  //     this.start();
  //   }
  // },
  // destroyed() {
  //   if (!this.exists()) {
  //     this.stop();
  //   }
  // },
  // watch: {
  //   scrolling(value) {
  //     if (value) {
  //       this.stop();
  //       console.log('watch scrolling stop');
  //     } else {
  //       this.start();
  //       console.log('watch scrolling start');
  //     }
  //   },
  // },
  // computed: {
  //   scrolling() {
  //     return this.$store.state.scrolling;
  //   },
  // },
  // methods: {
  //   exists() {
  //     return document.getElementsByClassName(this.name).length;
  //   },
  //   getTop() {
  //     if (typeof window.pageYOffset !== 'undefined') {
  //       return window.pageYOffset;
  //     }
  //     const B = document.body;
  //     let D = document.documentElement;
  //     D = (D.clientHeight) ? D : B;
  //     return D.scrollTop;
  //   },
  //   start() {
  //     document.body.style.position = 'fixed';
  //     document.body.style.top = `-${this.top}px`;
  //   },
  //   stop() {
  //     document.body.removeAttribute('style');
  //     window.scrollTo(0, this.top);
  //   },
  // },
};
</script>

<template>
  <div :class="name"></div>
</template>
